import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Row, Table } from 'reactstrap';
import { CreateScoreSheetRequest, CreateScoreSheetResponse, GetDivisionRequest, GetDivisionResponse, ScoreSheet, ScoreSheetSection, ScoreSheetTemplate, Team, User } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service";
import { IApiScoreSheetTemplate, IScoreSheet, ISectionContainer, ScoreSheetForm } from "./ScoreSheetForm";

interface IApiTeam {
  id: string
  name: string
  institution: string
}

interface IApiDivision {
  id: string
  name: string
  league: string
  competitionRounds: number
  finalRounds: number
  interviewTemplate: string
  performanceTemplate: string
}

interface IScoreSheetCreateUrlParams {
  divisionId: string
  type: string
}

interface IScoreSheetCreateState {
  template?: IApiScoreSheetTemplate
  scoreSheet?: IScoreSheet
  containers: ISectionContainer[]
  teams: IApiTeam[]
  division?: IApiDivision
}

export default class ScoreSheetCreate extends React.Component<RouteComponentProps<IScoreSheetCreateUrlParams>, IScoreSheetCreateState> {

  constructor(props: RouteComponentProps<IScoreSheetCreateUrlParams>) {
    super(props);
    this.fetchTemplate = this.fetchTemplate.bind(this);
    this.state = {
      containers: [],
      teams: [],
    };
    this.save = this.save.bind(this);
    this.saveGrpc = this.saveGrpc.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  public componentWillMount() {
    // this.fetchTemplate()
    this.fetchData();
  }

  public fetchData() {
    const self = this;
    const req = new GetDivisionRequest();
    req.setDivisionId(this.props.match.params.divisionId);
    req.setIncludeTeams(true);
    req.setIncludeTemplates(true);
    const client = new RobocupClient("");
    client.getDivision(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const scoreSheetTemplate = resp.getTemplatesList().find((template) => {
        if (this.props.match.params.type.toLowerCase() === "interview") {
          return template.getType() === ScoreSheetTemplate.Type.INTERVIEW;
        }
        return template.getType() === ScoreSheetTemplate.Type.PERFORMANCE;
      });
      const div = resp.getDivision();
      if (scoreSheetTemplate === undefined) {
        return;
      }
      if (div === undefined) {
        return;
      }
      const scoreSheet: IScoreSheet = {
        comments: "",
        round: 0,
        sections: scoreSheetTemplate.getSectionsList().map((section) => {
          return {
            sectionId: section.getId(),
            value: 0
          }
        }),
        team: "",
        timings: scoreSheetTemplate.getTimingsList().map((timing) => {
          return {
            name: timing,
            value: ""
          }
        }),
        type: self.props.match.params.type,
      }
      const containers: ISectionContainer[] = scoreSheet.sections.map((section) => {
        return {
          section,
          updateHandler: (value: number) => {
            self.setState({
              containers: self.state.containers.map((stored) => {
                if (stored.section.sectionId === section.sectionId) {
                  stored.section.value = value;
                }
                return stored
              })
            })
          }
        }
      });
      const teams: IApiTeam[] = resp.getTeamsList().map((team) => {
        const inst = team.getInstitution();
        return {
          id: team.getId(),
          institution: inst ? inst.getName() : "",
          name: team.getName(),
        }
      });
      const division: IApiDivision = {
        competitionRounds: div.getCompetitionRounds(),
        finalRounds: div.getFinalRounds(),
        id: div.getId(),
        interviewTemplate: div.getInterviewTemplateId(),
        league: div.getLeague().toString(),
        name: div.getName(),
        performanceTemplate: div.getPerformanceTemplateId(),
      }
      const temp: IApiScoreSheetTemplate = {
        id: scoreSheetTemplate.getId(),
        name: scoreSheetTemplate.getName(),
        sections: scoreSheetTemplate.getSectionsList().map((section) => {
          return {
            description: section.getDescription(),
            id: section.getId(),
            maxValue: section.getMaxValue(),
            multiplier: section.getMultiplier(),
            title: section.getTitle(),
          }
        }),
        timings: scoreSheetTemplate.getTimingsList(),
        type: scoreSheetTemplate.getType() === ScoreSheetTemplate.Type.INTERVIEW ? "Interview" : "Performance",
      }
      this.setState({
        containers,
        division,
        scoreSheet,
        teams,
        template: temp,
      })
    })
  }

  public fetchTemplate() {
    const self = this;
    return fetch(`/api/division/${this.props.match.params.divisionId}/${this.props.match.params.type}_template`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json()
    }).then((response: IApiScoreSheetTemplate) => {
      if (response.timings === null) {
        response.timings = [];
      }
      const scoreSheet: IScoreSheet = {
        comments: "",
        round: 0,
        sections: response.sections.map((section) => {
          return {
            sectionId: section.id,
            value: 0
          }
        }),
        team: "",
        timings: response.timings.map((timing) => {
          return {
            name: timing,
            value: ""
          }
        }),
        type: self.props.match.params.type,
      }
      const containers: ISectionContainer[] = scoreSheet.sections.map((section) => {
        return {
          section,
          updateHandler: (value: number) => {
            self.setState({
              containers: self.state.containers.map((stored) => {
                if (stored.section.sectionId === section.sectionId) {
                  stored.section.value = value;
                }
                return stored
              })
            })
          }
        }
      })
      this.setState({
        containers,
        scoreSheet,
        template: response,
      })
    })
  }

  public saveGrpc() {
    if (this.state.template === undefined) {
      return;
    }
    if (this.state.scoreSheet === undefined) {
      return;
    }
    if (this.state.division === undefined) {
      return;
    }
    const self = this;
    const req = new CreateScoreSheetRequest();
    const protoScoreSheet = new ScoreSheet();
    protoScoreSheet.setComments(this.state.scoreSheet.comments);
    protoScoreSheet.setRound(this.state.scoreSheet.round);
    const protoTeam = new Team();
    protoTeam.setId(this.state.scoreSheet.team);
    protoScoreSheet.setTeam(protoTeam);
    if (this.state.scoreSheet.type === "Interview") {
      protoScoreSheet.setType(ScoreSheetTemplate.Type.INTERVIEW);
    } else {
      protoScoreSheet.setType(ScoreSheetTemplate.Type.PERFORMANCE)
    }
    protoScoreSheet.setDivisionId(this.state.division.id);
    protoScoreSheet.setScoreSheetTemplateId(this.state.template.id);
    this.state.scoreSheet.timings.forEach((timing) => {
      const protoTiming = new ScoreSheet.Timing();
      protoTiming.setName(timing.name);
      protoTiming.setValue(timing.value);
      protoScoreSheet.addTimings(protoTiming);
    });
    this.state.scoreSheet.sections.forEach((section) => {
      const protoSection = new ScoreSheetSection();
      protoSection.setSectionId(section.sectionId);
      protoSection.setValue(section.value);
      protoScoreSheet.addSections(protoSection);
    });
    req.setScoreSheet(protoScoreSheet);
    const client = new RobocupClient("");
    client.createScoreSheet(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      this.props.history.push("/dance");
    })
  }

  public save() {
    if (this.state.template === undefined) {
      return;
    }
    return fetch(`/api/division/${this.props.match.params.divisionId}/score_sheet`, {
      body: JSON.stringify(this.state.scoreSheet),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
    }).then((response) => {
      if (response.status === 200) {
        this.props.history.push("/dance");
      }
    })
  }

  public updateHandler(sheet: IScoreSheet) {
    this.setState({
      scoreSheet: sheet,
    })
  }

  public render() {
    const self = this;
    let submitDisabled = false;
    if (!self.state.scoreSheet) {
      submitDisabled = true;
    } else if (self.state.scoreSheet.team === "") {
      submitDisabled = true;
    } else if ((self.state.scoreSheet.type.toLowerCase() === "performance") && (self.state.scoreSheet.round === 0)) {
      submitDisabled = true;
    }
    let form: (JSX.Element | null) = null;
    if ((self.state.template !== undefined) && (self.state.scoreSheet !== undefined)) {
      form = <ScoreSheetForm
        key={2}
        containers={self.state.containers}
        divisionId={self.props.match.params.divisionId}
        scoreSheet={self.state.scoreSheet}
        scoreSheetUpdatedHandler={self.updateHandler}
        template={self.state.template}
        teams={self.state.teams}
        division={self.state.division ? self.state.division : undefined}
      />
    }
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>New {self.props.match.params.type}</h3>
        </Col>
      </Row>
    ), form, (
      <Row key={5}>
        <Col md="4" />
        <Col md="4" />
        <Col md="4" style={{ textAlign: "right" }}>
          <Button color="primary" size="sm" onClick={self.saveGrpc} disabled={submitDisabled}>Save</Button>
        </Col>
      </Row>
    )]
  }

}

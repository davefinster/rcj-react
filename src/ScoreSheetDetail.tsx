import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Row, Table } from 'reactstrap';
import { GetDivisionRequest, GetDivisionResponse, GetScoreSheetRequest, GetScoreSheetResponse, ScoreSheet, ScoreSheetSection, ScoreSheetTemplate, UpdateScoreSheetRequest, UpdateScoreSheetResponse } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service";
import { IApiScoreSheetTemplate, IScoreSheet, IScoreSheetCompletedSection, IScoreSheetTiming, ISectionContainer, ScoreSheetForm } from "./ScoreSheetForm";

interface IApiTeam {
  id: string
  name: string
  institution: string
}

interface IScoreSheetDetailUrlParams {
  divisionId: string
  type: string
  id: string
}

interface IScoreSheetDetailState {
  template?: IApiScoreSheetTemplate
  scoreSheet?: IScoreSheet
  containers: ISectionContainer[]
  teams: IApiTeam[]
  // apiScoreSheet?: IApiScoreSheet
}

interface IApiScoreSheetSection {
  id: string
  title: string
  description: string
  maxValue: number
  multiplier: number
  value: number
  sectionId: string
}

interface IApiScoreSheet {
  id: string
  type: string
  comments: string
  team: string
  teamInstitution: string
  teamId: string
  round: number
  timings: IScoreSheetTiming[]
  sections: IApiScoreSheetSection[]
  templateId: string
  author: string
}

export default class ScoreSheetDetail extends React.Component<RouteComponentProps<IScoreSheetDetailUrlParams>, IScoreSheetDetailState> {

  constructor(props: RouteComponentProps<IScoreSheetDetailUrlParams>) {
    super(props);
    this.fetchScoreSheet = this.fetchScoreSheet.bind(this);
    this.state = {
      containers: [],
      teams: [],
    };
    this.save = this.save.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  public componentWillMount() {
    // this.fetchScoreSheet()
    this.fetchSheet();
  }

  public fetchSheet() {
    const self = this;
    const req = new GetScoreSheetRequest();
    req.setScoreSheetId(this.props.match.params.id);
    const client = new RobocupClient("");

    client.getScoreSheet(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const respScoreSheet = resp.getScoreSheet();
      if (respScoreSheet === undefined) {
        return
      }
      const author = respScoreSheet.getAuthor()
      if (author === undefined) {
        return
      }
      const team = respScoreSheet.getTeam();
      if (team === undefined) {
        return
      }
      const scoreSheet: IScoreSheet = {
        author: author.getName(),
        comments: respScoreSheet.getComments(),
        round: respScoreSheet.getRound(),
        sections: respScoreSheet.getSectionsList().map((section) => {
          return {
            id: section.getId(),
            sectionId: section.getSectionId(),
            value: section.getValue(),
          }
        }),
        team: team.getId(),
        timings: respScoreSheet.getTimingsList().map((timing) => {
          return {
            name: timing.getName(),
            value: timing.getValue(),
          }
        }),
        type: respScoreSheet.getType() === ScoreSheetTemplate.Type.INTERVIEW ? "Interview" : "Performance",
      }
      const containers: ISectionContainer[] = respScoreSheet.getSectionsList().map((section) => {
        const sect: IScoreSheetCompletedSection = {
          id: section.getId(),
          sectionId: section.getSectionId(),
          value: section.getValue(),
        }
        return {
          section: sect,
          updateHandler: (value: number) => {
            self.setState({
              containers: self.state.containers.map((stored) => {
                if (stored.section.sectionId === sect.id) {
                  stored.section.value = value;
                }
                return stored
              })
            })
          }
        }
      })
      const template: IApiScoreSheetTemplate = {
        id: respScoreSheet.getScoreSheetTemplateId(),
        name: "",
        sections: respScoreSheet.getSectionsList().map((section) => {
          return {
            description: section.getDescription(),
            id: section.getSectionId(),
            maxValue: section.getMaxValue(),
            multiplier: section.getMultiplier(),
            title: section.getTitle(),
          }
        }),
        timings: respScoreSheet.getTimingsList().map((timing) => {
          return timing.getName();
        }),
        type: respScoreSheet.getType() === ScoreSheetTemplate.Type.INTERVIEW ? "Interview" : "Performance",
      }
      const divReq = new GetDivisionRequest();
      divReq.setDivisionId(team.getDivision());
      divReq.setIncludeTeams(true);
      divReq.setIncludeTemplates(true);
      client.getDivision(divReq, (divErr, divResp) => {
        if ((divResp === null) || (divResp === undefined)) {
          return;
        }
        const teams: IApiTeam[] = divResp.getTeamsList().map((divTeam) => {
          const inst = divTeam.getInstitution();
          return {
            id: divTeam.getId(),
            institution: inst ? inst.getName() : "",
            name: divTeam.getName(),
          }
        });
        self.setState({
          containers,
          scoreSheet,
          teams,
          template,
        })
      })
    })
  }

  public fetchScoreSheet() {
    const self = this;
    return fetch(`/api/score_sheet/${this.props.match.params.id}`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json()
    }).then((response: IApiScoreSheet) => {
      if (response.timings === null) {
        response.timings = [];
      }
      const scoreSheet: IScoreSheet = {
        author: response.author,
        comments: response.comments,
        round: response.round,
        sections: response.sections.map((section) => {
          return {
            id: section.id,
            sectionId: section.sectionId,
            value: section.value
          }
        }),
        team: response.teamId,
        timings: response.timings,
        type: response.type,
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
      const template: IApiScoreSheetTemplate = {
        id: response.templateId,
        name: "",
        sections: response.sections.map((section) => {
          return {
            description: section.description,
            id: section.sectionId,
            maxValue: section.maxValue,
            multiplier: section.multiplier,
            title: section.title,
          }
        }),
        timings: response.timings.map((timing) => {
          return timing.name
        }),
        type: response.type,
      }
      self.setState({
        // apiScoreSheet: response,
        containers,
        scoreSheet,
        template,
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
    const self = this;
    const req = new UpdateScoreSheetRequest();
    const protoScoreSheet = new ScoreSheet();
    protoScoreSheet.setId(this.props.match.params.id)
    protoScoreSheet.setComments(this.state.scoreSheet.comments);
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
    client.updateScoreSheet(req, (err, resp) => {
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
    if (this.state.scoreSheet === undefined) {
      return;
    }
    return fetch(`/api/score_sheet/${this.props.match.params.id}`, {
      body: JSON.stringify(this.state.scoreSheet),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
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
      />
    }
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>{self.props.match.params.type}</h3>
        </Col>
      </Row>
    ), form, (
      <Row key={5}>
        <Col md="4" />
        <Col md="4" />
        <Col md="4" style={{ textAlign: "right" }}>
          <Button color="primary" size="sm" onClick={self.save}>Save</Button>
        </Col>
      </Row>
    )]
  }

}

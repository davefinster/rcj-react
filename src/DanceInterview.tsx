import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Row, Table } from 'reactstrap';

interface IDanceInterviewUrlParams {
  divisionId: string
}

interface IStoredSection {
  sectionId: string
  storedValue: number
  updateHandler: (value: number) => void
}

interface IApiScoreSheetTemplateSections {
  id: string
  title: string
  description: string
  maxValue: number
  multiplier: number
}

interface IApiScoreSheetTemplate {
  id: string
  name: string
  type: string
  timings: string[]
  sections: IApiScoreSheetTemplateSections[]
}

interface IScoreSheetTiming {
  name: string
  value: string
}

interface IDanceInterviewState {
  template?: IApiScoreSheetTemplate
  storedSections: IStoredSection[]
  teams: IApiTeam[]
  selectedTeam: string
  comments: string
  timings: IScoreSheetTiming[]
}

interface IApiTeam {
  id: string
  name: string
  institution: string
}

interface IScoreSheetCompletedSection {
  sectionId: string
  value: number
}

interface IScoreSheeetCreateBody {
  type: string
  team: string
  comments: string
  timings: IScoreSheetTiming[]
  sections: IScoreSheetCompletedSection[]
  round: number
}

export default class DanceInterview extends React.Component<RouteComponentProps<IDanceInterviewUrlParams>, IDanceInterviewState> {

  constructor(props: RouteComponentProps<IDanceInterviewUrlParams>) {
    super(props);
    this.fetchTemplate = this.fetchTemplate.bind(this);
    this.fetchTeams = this.fetchTeams.bind(this);
    this.state = {
      comments: "",
      selectedTeam: "",
      storedSections: [],
      teams: [],
      timings: []
    };
    this.marksForMax = this.marksForMax.bind(this);
    this.save = this.save.bind(this);
    this.updateInterview = this.updateInterview.bind(this);
    this.updateTiming = this.updateTiming.bind(this);
  }

  public componentWillMount() {
    this.fetchTemplate()
    this.fetchTeams()
  }

  public fetchTeams() {
    return fetch(`/api/division/${this.props.match.params.divisionId}/team`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json()
    }).then((response: IApiTeam[]) => {
      this.setState({
        teams: response,
      });
    })
  }

  public fetchTemplate() {
    const self = this;
    return fetch(`/api/division/${this.props.match.params.divisionId}/interview_template`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json()
    }).then((response: IApiScoreSheetTemplate) => {
      // For each criteria in every section, create a container
      const containers: IStoredSection[] = [];
      response.sections.forEach((section) => {
        const container: IStoredSection = {
          sectionId: section.id,
          storedValue: 0,
          updateHandler: (value: number) => null
        }
        container.updateHandler = (value: number) => {
          self.setState({
            storedSections: self.state.storedSections.map((stored) => {
              if (stored.sectionId === container.sectionId) {
                stored.storedValue = value;
              }
              return stored;
            })
          })
        }
        containers.push(container);
      })
      if (response.timings === null) {
        response.timings = [];
      }
      const timings: IScoreSheetTiming[] = response.timings.map((timing) => {
        return {
          name: timing,
          value: ""
        }
      });
      this.setState({
        storedSections: containers,
        template: response,
        timings
      });
    })
  }

  public marksForMax(max: number): any {
    const marks = {};
    for (let i = 0; i <= max; i++) {
      marks[i] = i.toString();
    }
    return marks;
  }

  public save() {
    if (this.state.template === undefined) {
      return;
    }
    const createBody: IScoreSheeetCreateBody = {
      comments: this.state.comments,
      round: 0,
      sections: this.state.storedSections.map((storedSection) => {
        return {
          sectionId: storedSection.sectionId,
          value: storedSection.storedValue
        }
      }),
      team: this.state.selectedTeam,
      timings: this.state.timings,
      type: this.state.template.type,
    }
    return fetch(`/api/division/${this.props.match.params.divisionId}/score_sheet`, {
      body: JSON.stringify(createBody),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
    })
  }

  public updateInterview(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget.id === "team-select") {
      this.setState({
        selectedTeam: event.currentTarget.value
      })
    } else if (event.currentTarget.id === "comments") {
      this.setState({
        comments: event.currentTarget.value
      })
    }
    return null
  }

  public updateTiming(event: React.FormEvent<HTMLInputElement>) {
    const parts = event.currentTarget.id.split("-");
    const index = parseInt(parts[parts.length - 1], 10);
    const existing = this.state.timings[index];
    this.setState({
      timings: this.state.timings.map((timing) => {
        if (timing.name === existing.name) {
          return {
            name: timing.name,
            value: event.currentTarget.value
          }
        }
        return timing;
      })
    })
    return null;
  }

  public render() {
    const self = this;
    let timings: JSX.Element[][] = [];
    let sections: JSX.Element[] = [];
    if (self.state.template !== undefined) {
      timings = self.state.template.timings.map((timing, index) => {
        const timingMatch = self.state.timings.find((t) => {
          return t.name === timing;
        })
        if (timingMatch === undefined) {
          return [];
        }
        return [
          <Label key={`timing-label-${index}`} for="exampleEmail" sm={2}>{timing}</Label>,
          <Col sm="4" key={`timing-col-${index}`}>
            <Input type="text" id={`timing-field-${index}`} value={timingMatch.value} onChange={self.updateTiming} />
          </Col>
        ]
      })
      sections = self.state.template.sections.map((section, index) => {
        const container = self.state.storedSections.find((s) => {
          return s.sectionId === section.id;
        })
        if (container === undefined) {
          return <span />;
        }
        return (
          <Table key={`section-table-${index}`}>
            <thead>
              <tr>
                <th><h5>{section.title}</h5></th>
                <th style={{ textAlign: "right" }}><h5>{section.maxValue} Points</h5></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>
                  {section.description.split('\n').map((item, key) => {
                    return <span key={key}>{item}<br /></span>
                  })}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Slider
                    defaultValue={0}
                    value={container.storedValue}
                    min={0}
                    max={section.maxValue}
                    step={0.5}
                    dots={true}
                    marks={self.marksForMax(section.maxValue)}
                    onChange={container.updateHandler}
                    onAfterChange={container.updateHandler}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        )
      })
    }
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>New Interview</h3>
        </Col>
      </Row>
    ), (
      <Form key={1}>
        <FormGroup row={true}>
          <Label for="exampleEmail" sm={2}>Team</Label>
          <Col sm="10">
            <Input type="select" id="team-select" onChange={self.updateInterview} value={self.state.selectedTeam}>
              <option value="">Please select a team</option>
              {
                self.state.teams.map((team) => {
                  return (
                    <option value={team.id} key={team.id}>{team.name} ({team.institution})</option>
                  )
                })
              }
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row={true}>
          <Label for="exampleEmail" sm={2}>Comments</Label>
          <Col sm="10">
            <Input type="textarea" id="comments" value={self.state.comments} onChange={self.updateInterview} />
          </Col>
        </FormGroup>
        <FormGroup row={true}>
          {timings}
        </FormGroup>
      </Form >
    ),
    ...sections, (
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

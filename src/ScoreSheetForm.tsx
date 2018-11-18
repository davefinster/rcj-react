import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Row, Table } from 'reactstrap';

interface IApiTeam {
  id: string
  name: string
  institution: string
}

interface IApiScoreSheetTemplateSections {
  id: string
  title: string
  description: string
  maxValue: number
  multiplier: number
}

export interface IApiScoreSheetTemplate {
  id: string
  name: string
  type: string
  timings: string[]
  sections: IApiScoreSheetTemplateSections[]
}

export interface IScoreSheetCompletedSection {
  id?: string
  sectionId: string
  value: number
}

export interface IScoreSheetTiming {
  name: string
  value: string
}

export interface IScoreSheet {
  type: string
  team: string
  comments: string
  timings: IScoreSheetTiming[]
  sections: IScoreSheetCompletedSection[]
  round: number
  author?: string
}

interface IScoreSheetFormProps {
  scoreSheet: IScoreSheet
  template: IApiScoreSheetTemplate
  scoreSheetUpdatedHandler: (sheet: IScoreSheet) => void
  containers: ISectionContainer[]
  divisionId: string
  teams: IApiTeam[]
  division?: IApiDivision
}

export interface ISectionContainer {
  section: IScoreSheetCompletedSection
  updateHandler: (value: number) => void
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

interface IScoreSheetFormState {
  teams: IApiTeam[]
  division?: IApiDivision
}

export class ScoreSheetForm extends React.Component<IScoreSheetFormProps, IScoreSheetFormState> {

  constructor(props: IScoreSheetFormProps) {
    super(props);
    this.state = {
      teams: [],
    };
    this.updateScoreSheet = this.updateScoreSheet.bind(this);
    this.updateTiming = this.updateTiming.bind(this);
    this.fetchTeams = this.fetchTeams.bind(this);
    this.fetchDivision = this.fetchDivision.bind(this);
  }

  public marksForMax(max: number, multiplier: number): any {
    const marks = {};
    for (let i = 0; i <= max; i++) {
      if (multiplier === -1) {
        marks[i] = `-${i.toString()}`;
      } else {
        marks[i] = i.toString();
      }
    }
    return marks;
  }

  public componentWillMount() {
    // this.fetchTeams();
    // this.fetchDivision();
  }

  public fetchDivision() {
    return fetch(`/api/division/${this.props.divisionId}`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json()
    }).then((response: IApiDivision) => {
      this.setState({
        division: response,
      });
    })
  }

  public fetchTeams() {
    return fetch(`/api/division/${this.props.divisionId}/team`, {
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

  public updateScoreSheet(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget.id === "team-select") {
      this.props.scoreSheetUpdatedHandler(Object.assign({}, this.props.scoreSheet, {
        team: event.currentTarget.value
      }))
    } else if (event.currentTarget.id === "comments") {
      this.props.scoreSheetUpdatedHandler(Object.assign({}, this.props.scoreSheet, {
        comments: event.currentTarget.value
      }))
    } else if (event.currentTarget.id === "round-select") {
      this.props.scoreSheetUpdatedHandler(Object.assign({}, this.props.scoreSheet, {
        round: parseInt(event.currentTarget.value, 10)
      }))
    }
    return null
  }

  public updateTiming(event: React.FormEvent<HTMLInputElement>) {
    const parts = event.currentTarget.id.split("-");
    const index = parseInt(parts[parts.length - 1], 10);
    this.props.scoreSheetUpdatedHandler(Object.assign({}, this.props.scoreSheet, {
      timings: this.props.scoreSheet.timings.map((timing, idx) => {
        if (index === idx) {
          return Object.assign({}, timing, {
            value: event.currentTarget.value
          })
        }
        return timing;
      })
    }))
  }

  public render() {
    const self = this;
    const timings = self.props.scoreSheet.timings.map((timing, index) => {
      return [
        <Label key={`timing-label-${index}`} sm={2}>{timing.name}</Label>,
        <Col sm="4" key={`timing-col-${index}`}>
          <Input type="text" id={`timing-field-${index}`} value={timing.value} onChange={self.updateTiming} />
        </Col>
      ]
    })
    const sections = self.props.template.sections.map((section, index) => {
      const container = self.props.containers[index];
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
                  value={container.section.value}
                  min={0}
                  max={section.maxValue}
                  step={0.5}
                  dots={true}
                  marks={self.marksForMax(section.maxValue, section.multiplier)}
                  onChange={container.updateHandler}
                  onAfterChange={container.updateHandler}
                  handleStyle={{
                    height: 24,
                    marginLeft: -12,
                    marginTop: -9,
                    width: 24,
                  }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      )
    })
    const roundOptions: Array<{ name: string, count: number }> = [];
    // if (self.state.division) {
    if (self.props.division) {
      for (let i = 0; i < self.props.division.competitionRounds + self.props.division.finalRounds; i++) {
        let name = `Round ${i + 1}`;
        if (i >= self.props.division.competitionRounds) {
          name = `Final ${(i + 1) - self.props.division.competitionRounds}`
        }
        roundOptions.push({
          count: i + 1,
          name,
        })
      }
    }
    let roundSelect: (JSX.Element | null) = null;
    if (self.props.scoreSheet.type.toLowerCase() === "performance") {
      roundSelect = (
        <FormGroup row={true}>
          <Label for="team-select" sm={2}>Round</Label>
          <Col sm="10">
            <Input type="select" id="round-select" name="round-select" onChange={self.updateScoreSheet} value={self.props.scoreSheet.round}>
              <option value="">Please select a round</option>
              {
                roundOptions.map((opt) => {
                  return (
                    <option value={opt.count} key={opt.count}>{opt.name}</option>
                  )
                })
              }
            </Input>
          </Col>
        </FormGroup>
      );
    }
    let authorField = <FormGroup row={true} />
    if (self.props.scoreSheet.author !== undefined) {
      authorField = (
        <FormGroup row={true}>
          <Label for="comments" sm={2}>Author</Label>
          <Col sm="10">
            <Input type="text" value={self.props.scoreSheet.author} disabled={true} />
          </Col>
        </FormGroup>
      )
    }
    return [(
      <Form key={1}>
        {authorField}
        <FormGroup row={true}>
          <Label for="team-select" sm={2}>Team</Label>
          <Col sm="10">
            <Input type="select" id="team-select" name="team-select" onChange={self.updateScoreSheet} value={self.props.scoreSheet.team}>
              <option value="">Please select a team</option>
              {
                self.props.teams.map((team) => {
                  return (
                    <option value={team.id} key={team.id}>{team.name} ({team.institution})</option>
                  )
                })
              }
            </Input>
          </Col>
        </FormGroup>
        {roundSelect}
        <FormGroup row={true}>
          <Label for="comments" sm={2}>Comments</Label>
          <Col sm="10">
            <Input type="textarea" id="comments" name="comments" value={self.props.scoreSheet.comments} onChange={self.updateScoreSheet} />
          </Col>
        </FormGroup>
        <FormGroup row={true}>
          {...timings}
        </FormGroup>
      </Form >
    ),
    ...sections]
  }

}

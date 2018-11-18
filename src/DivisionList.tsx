import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { CreateDivisionRequest, CreateDivisionResponse, Division, GetDivisionsRequest, GetDivisionsResponse, GetScoreSheetTemplatesRequest, GetScoreSheetTemplatesResponse, ScoreSheetTemplate } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service";

interface IDivisionListState {
  newDivision: IDivision
  newModalOpen: boolean
  divisions: IApiDivision[]
  templates: IApiScoreSheetTemplate[]
}

interface IDivision {
  league: string
  name: string
  competitionRounds: number
  finalRounds: number
  interviewTemplate: string
  performanceTemplate: string
}

interface IDivisionBody {
  league: string
  name: string
  competitionRounds?: number
  finalRounds?: number
  interviewTemplate?: string
  performanceTemplate?: string
}

export interface IApiDivision {
  id: string
  league: string
  name: string
}

export interface IApiScoreSheetTemplate {
  id: string
  name: string
  type: string
}

export default class DivisionList extends React.Component<RouteComponentProps<{}>, IDivisionListState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      divisions: [],
      newDivision: {
        competitionRounds: 0,
        finalRounds: 0,
        interviewTemplate: "",
        league: "On Stage",
        name: "",
        performanceTemplate: "",
      },
      newModalOpen: false,
      templates: [],
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateNewDivision = this.updateNewDivision.bind(this);
    this.saveDivision = this.saveDivision.bind(this);
    this.fetchScoreSheetTemplates = this.fetchScoreSheetTemplates.bind(this);
    this.fetchDivisionsGrpc = this.fetchDivisionsGrpc.bind(this);
    this.fetchScoreSheetTemplatesGrpc = this.fetchScoreSheetTemplatesGrpc.bind(this);
    this.saveDivisionGrpc = this.saveDivisionGrpc.bind(this);
  }

  public componentWillMount() {
    this.fetchDivisionsGrpc();
    this.fetchScoreSheetTemplatesGrpc();
  }

  public openModal() {
    this.setState({
      newDivision: {
        competitionRounds: 0,
        finalRounds: 0,
        interviewTemplate: "",
        league: "On Stage",
        name: "",
        performanceTemplate: "",
      },
      newModalOpen: true,
    });
  }

  public closeModal() {
    this.setState({
      newModalOpen: false,
    });
  }

  public fetchDivisionsGrpc() {
    const req = new GetDivisionsRequest();
    const client = new RobocupClient("");
    client.getDivisions(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const divisions: IApiDivision[] = resp.getDivisionsList().map((div) => {
        let league = "On Stage";
        if (div.getLeague() === Division.League.RESCUE) {
          league = "Rescue";
        } else if (div.getLeague() === Division.League.SOCCER) {
          league = "Soccer";
        }
        return {
          competitionRounds: div.getCompetitionRounds(),
          finalRounds: div.getFinalRounds(),
          id: div.getId(),
          interviewTemplate: div.getInterviewTemplateId(),
          league,
          name: div.getName(),
          performanceTemplate: div.getPerformanceTemplateId(),
        }
      })
      this.setState({
        divisions,
      })
    })
  }

  public fetchDivisions() {
    return fetch("/api/division", {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((response: IApiDivision[]) => {
      this.setState({
        divisions: response,
      });
    })
  }

  public updateNewDivision(event: React.FormEvent<HTMLInputElement>) {
    const updatedDivision = Object.assign({}, this.state.newDivision)
    if (event.currentTarget.id === "division-name") {
      updatedDivision.name = event.currentTarget.value;
    } else if (event.currentTarget.id === "division-league") {
      updatedDivision.league = event.currentTarget.value;
    } else if (event.currentTarget.id === "division-performance") {
      updatedDivision.competitionRounds = parseInt(event.currentTarget.value, 10);
    } else if (event.currentTarget.id === "division-final") {
      updatedDivision.finalRounds = parseInt(event.currentTarget.value, 10);
    } else if (event.currentTarget.id === "division-interview") {
      updatedDivision.interviewTemplate = event.currentTarget.value;
    } else if (event.currentTarget.id === "division-perf") {
      updatedDivision.performanceTemplate = event.currentTarget.value;
    }
    this.setState({
      newDivision: updatedDivision
    })
  }

  public saveDivisionGrpc() {
    const req = new CreateDivisionRequest();
    const protoDiv = new Division();
    protoDiv.setName(this.state.newDivision.name);
    if (this.state.newDivision.league === "On Stage") {
      protoDiv.setLeague(Division.League.ONSTAGE);
    } else if (this.state.newDivision.league === "Rescue") {
      protoDiv.setLeague(Division.League.RESCUE);
    } else if (this.state.newDivision.league === "Soccer") {
      protoDiv.setLeague(Division.League.SOCCER);
    }
    protoDiv.setCompetitionRounds(this.state.newDivision.competitionRounds);
    protoDiv.setFinalRounds(this.state.newDivision.finalRounds);
    protoDiv.setInterviewTemplateId(this.state.newDivision.interviewTemplate);
    protoDiv.setPerformanceTemplateId(this.state.newDivision.performanceTemplate);
    req.setDivision(protoDiv);
    const client = new RobocupClient("");
    client.createDivision(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      this.closeModal();
      this.fetchDivisionsGrpc();
    })
  }

  public saveDivision() {
    const division: IDivisionBody = {
      league: this.state.newDivision.league,
      name: this.state.newDivision.name,
    }
    if (division.league === "On Stage") {
      division.competitionRounds = this.state.newDivision.competitionRounds;
      division.finalRounds = this.state.newDivision.finalRounds;
      division.interviewTemplate = this.state.newDivision.interviewTemplate;
      division.performanceTemplate = this.state.newDivision.performanceTemplate;
    }
    const self = this;
    return fetch("/api/division", {
      body: JSON.stringify(division),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
    }).then((response) => {
      return response.json()
    }).then((response: IDivision) => {
      self.closeModal();
      self.fetchDivisions();
      return response;
    });
  }

  public fetchScoreSheetTemplatesGrpc() {
    const req = new GetScoreSheetTemplatesRequest();
    const client = new RobocupClient("");
    client.getScoreSheetTemplates(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const templates: IApiScoreSheetTemplate[] = resp.getScoreSheetTemplatesList().map((template) => {
        return {
          id: template.getId(),
          name: template.getName(),
          type: template.getType() === ScoreSheetTemplate.Type.INTERVIEW ? "Interview" : "Performance",
        }
      });
      this.setState({
        templates,
      })
    })
  }

  public fetchScoreSheetTemplates() {
    return fetch("/api/score_sheet_template", {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((response: IApiScoreSheetTemplate[]) => {
      this.setState({
        templates: response,
      })
    })
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>Divisions</h3>
        </Col>
        <Col md="4" />
        <Col md="4" style={{ textAlign: "right" }}>
          <Button color="primary" size="sm" onClick={self.openModal}>Add</Button>
        </Col>
      </Row>
    ), (
      <Row key={1}>
        <Col md="12">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>League</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                self.state.divisions.map((division, index) => {
                  return (
                    <tr key={index}>
                      <td>{division.name}</td>
                      <td>{division.league}</td>
                      <td>
                        {
                          division.league === "On Stage" ? <a href={`/api/division/${division.id}/excel`}>Excel Zip</a> : <span />
                        }
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    ), (
      <Modal isOpen={self.state.newModalOpen} toggle={self.closeModal}>
        <ModalHeader toggle={self.closeModal}>
          New Division
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row={true}>
              <Label sm={2} for="division-name">Name</Label>
              <Col sm={10}>
                <Input type="text" name="division-name" id="division-name" value={self.state.newDivision.name} onChange={this.updateNewDivision} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label sm={2} for="division-league">League</Label>
              <Col sm={10}>
                <Input type="select" name="division-league" id="division-league" value={self.state.newDivision.league} onChange={this.updateNewDivision}>
                  <option value="On Stage">On Stage</option>
                  <option value="Soccer">Soccer</option>
                  <option value="Rescue">Rescue</option>
                </Input>
              </Col>
            </FormGroup>
            <Row>
              <Col md="12">
                <h5>On Stage Rounds</h5>
              </Col>
            </Row>
            <FormGroup row={true}>
              <Label sm={2} for="division-performance">Perf</Label>
              <Col sm={10}>
                <Input type="number" name="division-performance" id="division-performance" value={self.state.newDivision.competitionRounds} onChange={this.updateNewDivision} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label sm={2} for="division-performance">Final</Label>
              <Col sm={10}>
                <Input type="number" name="division-final" id="division-final" value={self.state.newDivision.finalRounds} onChange={this.updateNewDivision} />
              </Col>
            </FormGroup>
            <Row>
              <Col md="12">
                <h5>On Stage Score Sheets</h5>
              </Col>
            </Row>
            <FormGroup row={true}>
              <Label sm={2} for="division-league">Interview</Label>
              <Col sm={10}>
                <Input type="select" name="division-interview" id="division-interview" value={self.state.newDivision.interviewTemplate} onChange={this.updateNewDivision}>
                  <option value="">None</option>
                  {
                    self.state.templates.filter((item) => {
                      return item.type === "Interview";
                    }).map((item, index) => {
                      return (
                        <option key={index} value={item.id}>{item.name}</option>
                      );
                    })
                  }
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label sm={2} for="division-league">Perf</Label>
              <Col sm={10}>
                <Input type="select" name="division-perf" id="division-perf" value={self.state.newDivision.performanceTemplate} onChange={this.updateNewDivision}>
                  <option value="">None</option>
                  {
                    self.state.templates.filter((item) => {
                      return item.type === "Performance";
                    }).map((item, index) => {
                      return (
                        <option key={index} value={item.id}>{item.name}</option>
                      );
                    })
                  }
                </Input>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.saveDivisionGrpc}>Save</Button>
          <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )]
  }
}

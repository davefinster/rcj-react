import * as React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { IApiDivision } from "./DivisionList";
import { GetInstitutionsRequest, Institution } from './generated/robocup_pb';
import { RobocupClient } from './generated/robocup_pb_service';

export interface ITeamMember {
  gender: string
  id?: string
  name: string
}

export interface ITeam {
  id?: string
  division: string
  institutionId?: string
  institutionName?: string
  members: ITeamMember[]
  name: string
}

export interface ITeamFormProps {
  currentTeam: ITeam
  divisions: IApiDivision[]
  updatedTeamCallback: (team: ITeam) => void
}

interface IApiInstitution {
  id: string
  name: string
}

interface ITeamFormState {
  institutionEdited: boolean,
  institutionLoading: boolean
  institutionQuery: string
  institutionResults: IApiInstitution[]
}

export class TeamForm extends React.Component<ITeamFormProps, ITeamFormState> {

  constructor(props: ITeamFormProps) {
    super(props);
    this.state = {
      institutionEdited: false,
      institutionLoading: false,
      institutionQuery: "",
      institutionResults: [],
    };
    this.updateNewTeam = this.updateNewTeam.bind(this);
    this.updateNewTeamMember = this.updateNewTeamMember.bind(this);
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.updateInstitution = this.updateInstitution.bind(this);
    this.searchInstitutions = this.searchInstitutions.bind(this);
    this.passthroughFilter = this.passthroughFilter.bind(this);
    this.searchInstitutionsGrpc = this.searchInstitutionsGrpc.bind(this);
  }


  public updateNewTeam(event: React.FormEvent<HTMLInputElement>) {
    const newTeam = Object.assign({}, this.props.currentTeam);
    if (event.currentTarget.id === "team-name") {
      newTeam.name = event.currentTarget.value;
    } else if (event.currentTarget.id === "team-division") {
      newTeam.division = event.currentTarget.value;
    } else if (event.currentTarget.id === "team-institution") {
      newTeam.institutionName = event.currentTarget.value;
    }
    return this.props.updatedTeamCallback(newTeam);
  }

  public updateNewTeamMember(event: React.FormEvent<HTMLInputElement>) {
    const parts = event.currentTarget.id.split("-");
    const index = parseInt(parts[parts.length - 1], 10);
    const newArr = [...this.props.currentTeam.members];
    if (event.currentTarget.name === "member-name") {
      newArr[index] = Object.assign({}, newArr[index], {
        name: event.currentTarget.value
      });
    } else if (event.currentTarget.name === "member-gender") {
      newArr[index] = Object.assign({}, newArr[index], {
        gender: event.currentTarget.value
      })
    }
    const newTeam = Object.assign({}, this.props.currentTeam, {
      members: newArr
    });
    return this.props.updatedTeamCallback(newTeam);
  }

  public addMember() {
    this.props.updatedTeamCallback(Object.assign({}, this.props.currentTeam, {
      members: [...this.props.currentTeam.members, { name: "", gender: "Not Specified" }]
    }));
  }

  public removeMember(event: React.MouseEvent<HTMLButtonElement>) {
    const newTeam = Object.assign({}, this.props.currentTeam);
    const parts = event.currentTarget.id.split("-");
    const elementIndex = parseInt(parts[parts.length - 1], 10);
    newTeam.members = newTeam.members.filter((val, index) => {
      return index !== elementIndex;
    });
    return this.props.updatedTeamCallback(newTeam);
  }

  public searchInstitutionsGrpc(query: string) {
    this.setState({
      institutionEdited: true,
      institutionLoading: true,
      institutionQuery: query
    })
    const self = this;
    const req = new GetInstitutionsRequest();
    req.setSearchString(query);
    const client = new RobocupClient("");
    client.getInstitutions(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const entries = resp.getInstitutionsList().map((inst) => {
        return inst.toObject();
      });
      self.setState({
        institutionLoading: false,
        institutionResults: [{ "id": "NEW", "name": `Create New: ${self.state.institutionQuery}` }, ...entries],
      });
    })
  }

  public searchInstitutions(query: string) {
    this.setState({
      institutionEdited: true,
      institutionLoading: true,
      institutionQuery: query
    })
    const self = this;
    return fetch(`/api/institution?query=${query}`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((response: IApiInstitution[]) => {
      self.setState({
        institutionLoading: false,
        institutionResults: [{ "id": "NEW", "name": `Create New: ${self.state.institutionQuery}` }, ...response],
      });
    })
  }

  public updateInstitution(selectedArray: any): any {
    const selected: any = selectedArray[0];
    const newTeam = Object.assign({}, this.props.currentTeam);
    if (selected === undefined) {
      newTeam.institutionId = undefined;
      newTeam.institutionName = undefined;
    } else if (selected.id === "NEW") {
      newTeam.institutionId = undefined;
      const parts = selected.name.split(":");
      const name = parts[parts.length - 1].trim();
      newTeam.institutionName = name;
    } else {
      newTeam.institutionId = selected.id;
      newTeam.institutionName = undefined;
    }
    this.setState({
      institutionEdited: false
    });
    return this.props.updatedTeamCallback(newTeam);
  }

  public passthroughFilter(option: any, text: string): boolean {
    return true
  }

  public render() {
    const self = this;
    let defaultValue = "Enter the name of an institution to search or create a new one.";
    if ((self.props.currentTeam.id !== undefined) && (self.props.currentTeam.institutionName !== undefined)) {
      defaultValue = self.props.currentTeam.institutionName;
    }
    return [(
      <Form key={0}>
        <FormGroup row={true}>
          <Label for="name" sm={2} style={{ textAlign: "right" }}>Name</Label>
          <Col sm={4}>
            <Input type="text" name="name" id="team-name" onChange={this.updateNewTeam} value={this.props.currentTeam.name} />
          </Col>
          <Label for="sheet-type" sm={2} style={{ textAlign: "right" }}>Division</Label>
          <Col sm={4}>
            <Input type="select" name="division" id="team-division" onChange={this.updateNewTeam} value={this.props.currentTeam.division}>
              {
                self.props.divisions.map((division, index) => {
                  return (
                    <option key={index} value={division.id}>{division.name}</option>
                  );
                })
              }
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row={true}>
          <Label for="name" sm={2} style={{ textAlign: "right" }}>Institution</Label>
          <Col sm={10}>
            <AsyncTypeahead
              isLoading={self.state.institutionLoading}
              onChange={self.updateInstitution}
              placeholder={defaultValue}
              onSearch={self.searchInstitutionsGrpc}
              options={self.state.institutionResults}
              labelKey="name"
              filterBy={self.passthroughFilter}
            />
          </Col>
        </FormGroup>
      </Form>
    ), (
      <Row key={1}>
        <Col md="4">
          <h5>Team Members</h5>
        </Col>
        <Col md="4" />
        <Col md="4">
          <Button color="primary" size="sm" onClick={self.addMember}>Add</Button>
        </Col>
      </Row>
    ), (
      <Table key={2}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            self.props.currentTeam.members.map((member, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Input type="text" name="member-name" id={`member-name-${index}`} value={member.name} onChange={this.updateNewTeamMember} />
                  </td>
                  <td>
                    <Input type="select" name="member-gender" id={`member-gender-${index}`} value={member.gender} onChange={this.updateNewTeamMember}>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Not Specified">Not Specified</option>
                    </Input>
                  </td>
                  <td>
                    <Button color="secondary" size="sm" id={`member-remove-${index}`} onClick={self.removeMember}>Remove</Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    )];
  }

}


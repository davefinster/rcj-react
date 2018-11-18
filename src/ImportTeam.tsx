import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Input, Row, Table } from 'reactstrap';
import { CreateTeamRequest, CreateTeamResponse, Division, GetDivisionRequest, GetDivisionResponse, GetDivisionsRequest, GetInstitutionsRequest, GetInstitutionsResponse, GetSheetTeamsRequest, GetSheetTeamsResponse, GetTeamsRequest, GetTeamsResponse, Institution, Member, SyncCheckinsRequest, SyncCheckinsResponse, Team } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service";

interface IApiImportTeamMember {
  name: string
  gender: string
}

interface ITeamMember {
  gender: string
  id?: string
  name: string
}

interface IApiInstitution {
  id: string
  name: string
}

interface IApiImportTeam {
  importId: string
  name: string
  institution: string
  challenge: string
  members: IApiImportTeamMember[]
  existingId: string
  divisionId: string
}

interface IImportTeamState {
  institutions: IApiInstitution[]
  teams: IApiImportTeam[]
  selectedTeams: IApiImportTeam[]
  status: string
}

interface ICreateTeamBody {
  division: string
  members: ITeamMember[]
  name: string
  importId: string
  institutionId?: string
  institutionName?: string
}



export default class ImportTeam extends React.Component<RouteComponentProps<{}>, IImportTeamState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      institutions: [],
      selectedTeams: [],
      status: "",
      teams: [],
    }
    this.fetchTeams = this.fetchTeams.bind(this);
    this.createTeams = this.createTeams.bind(this);
    this.changeSelectedStatus = this.changeSelectedStatus.bind(this);
    this.clearSelections = this.clearSelections.bind(this);
    this.fetchInstitutions = this.fetchInstitutions.bind(this);
    this.pushCheckins = this.pushCheckins.bind(this);
    this.fetchSheetTeamsGrpc = this.fetchSheetTeamsGrpc.bind(this);
    this.fetchInstitutionsGrpc = this.fetchInstitutionsGrpc.bind(this);
    this.pushCheckinsGrpc = this.pushCheckinsGrpc.bind(this);
    this.createTeamsGrpc = this.createTeamsGrpc.bind(this);
  }

  public componentWillMount() {
    this.fetchSheetTeamsGrpc();
    this.fetchInstitutionsGrpc(() => undefined);
  }

  public fetchSheetTeamsGrpc() {
    const client = new RobocupClient("");
    const divReq = new GetDivisionsRequest();
    return client.getDivisions(divReq, (err, divResp) => {
      if ((divResp === null) || (divResp === undefined)) {
        return;
      }
      const divisions = divResp.getDivisionsList();
      const teamReq = new GetSheetTeamsRequest();
      client.getSheetTeams(teamReq, (teamErr, teamResp) => {
        if ((teamResp === null) || (teamResp === undefined)) {
          return;
        }
        const importTeams: IApiImportTeam[] = teamResp.getTeamsList().map((team) => {
          let divId = "";
          divisions.forEach((div) => {
            if (div.getName() === team.getDivision()) {
              divId = div.getId();
            }
          })
          const inst = team.getInstitution();
          return {
            challenge: team.getDivision(),
            divisionId: divId,
            existingId: "",
            importId: team.getImportId(),
            institution: inst ? inst.getName() : "",
            members: team.getMembersList().map((member) => {
              return {
                gender: "Not Specified",
                name: member.getName(),
              }
            }),
            name: team.getName(),
          }
        })
        this.setState({
          selectedTeams: this.state.selectedTeams.length > 0 ? this.state.selectedTeams : importTeams,
          teams: importTeams,
        })
      })
    })
  }

  public fetchInstitutionsGrpc(cb: any) {
    const self = this;
    const req = new GetInstitutionsRequest();
    const client = new RobocupClient("");
    client.getInstitutions(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const entries: IApiInstitution[] = resp.getInstitutionsList().map((inst) => {
        return {
          id: inst.getId(),
          name: inst.getName(),
        }
      })
      this.setState({
        institutions: entries,
      }, () => {
        if (cb !== undefined) {
          cb();
        }
      });
    })
  }

  public pushCheckinsGrpc() {
    const self = this;
    const req = new SyncCheckinsRequest()
    const client = new RobocupClient("");
    client.syncCheckins(req, (err, resp) => null);
  }

  public pushCheckins() {
    return fetch(`/api/checkin_push`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    })
  }

  public fetchInstitutions() {
    return fetch(`/api/institution`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((response: IApiInstitution[]) => {
      this.setState({
        institutions: response,
      });
    })
  }

  public fetchTeams() {
    return fetch("/api/sheet_teams", {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json()
    }).then((response: IApiImportTeam[]) => {
      this.setState({
        selectedTeams: this.state.selectedTeams.length > 0 ? this.state.selectedTeams : response,
        teams: response,
      });
    })
  }

  public createTeamsGrpc() {
    if (this.state.selectedTeams.length === 0) {
      return;
    }
    const self = this;
    const currentTeam = this.state.selectedTeams[0];
    const req = new CreateTeamRequest();
    const protoTeam = new Team();
    protoTeam.setDivision(currentTeam.divisionId);
    protoTeam.setName(currentTeam.name);
    protoTeam.setImportId(currentTeam.importId);
    currentTeam.members.forEach((member) => {
      const protoMember = new Member();
      protoMember.setName(member.name);
      protoMember.setGender(Member.Gender.UNSPECIFIED);
      if (member.gender === "Male") {
        protoMember.setGender(Member.Gender.MALE);
      } else if (member.gender === "Female") {
        protoMember.setGender(Member.Gender.FEMALE);
      }
      protoTeam.addMembers(protoMember);
    });
    const protoInst = new Institution();
    const instMatch = this.state.institutions.find((inst) => {
      return inst.name === currentTeam.institution;
    });
    if (instMatch === undefined) {
      protoInst.setName(currentTeam.institution);
    } else {
      protoInst.setId(instMatch.id);
    }
    protoTeam.setInstitution(protoInst);
    req.setTeam(protoTeam);
    const client = new RobocupClient("");
    client.createTeam(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      self.fetchInstitutionsGrpc(() => {
        self.setState({
          selectedTeams: self.state.selectedTeams.filter((selectedTeam) => {
            return selectedTeam.importId !== currentTeam.importId;
          })
        }, () => {
          self.createTeamsGrpc();
        })
      })
    })

  }

  public createTeams() {
    if (this.state.selectedTeams.length === 0) {
      return;
    }
    const currentTeam = this.state.selectedTeams[0];
    const createTeamBody: ICreateTeamBody = {
      division: currentTeam.divisionId,
      importId: currentTeam.importId,
      members: currentTeam.members,
      name: currentTeam.name,
    }
    // Search for institution
    const instMatch = this.state.institutions.find((inst) => {
      return inst.name === currentTeam.institution;
    });
    if (instMatch === undefined) {
      createTeamBody.institutionName = currentTeam.institution;
    } else {
      createTeamBody.institutionId = instMatch.id;
    }
    return fetch("/api/team", {
      body: JSON.stringify(createTeamBody),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
    }).then((response) => {
      if (response.status === 200) {
        return this.fetchInstitutions().then(() => {
          this.setState({
            selectedTeams: this.state.selectedTeams.filter((selectedTeam) => {
              return selectedTeam.importId !== currentTeam.importId;
            })
          }, () => {
            this.createTeams();
          })
        })
      }
      return;
    })

  }

  public clearSelections() {
    this.setState({
      selectedTeams: []
    })
  }

  public changeSelectedStatus(event: React.FormEvent<HTMLInputElement>) {
    const teamMatch = this.state.teams.find((team) => {
      return team.importId === event.currentTarget.id;
    });
    if (teamMatch === undefined) {
      return null;
    }
    if (this.state.selectedTeams.indexOf(teamMatch) === -1) {
      this.setState({
        selectedTeams: [...this.state.selectedTeams, teamMatch]
      })
    } else {
      this.setState({
        selectedTeams: this.state.selectedTeams.filter((team) => {
          return team.importId !== teamMatch.importId;
        })
      })
    }
    return null;
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>Teams from Sheets</h3>
        </Col>
        <Col md="4" />
        <Col md="4" style={{ textAlign: "right" }}>
          {self.state.status}
          <Button color="primary" size="sm" onClick={this.fetchSheetTeamsGrpc}>Re-Sync</Button>
          <Button color="primary" size="sm" onClick={this.clearSelections}>Clear Selection</Button>
          <Button color="primary" size="sm" onClick={this.createTeamsGrpc}>Create Teams</Button>
          <Button color="primary" size="sm" onClick={this.pushCheckinsGrpc}>Push Checkins</Button>
        </Col>
      </Row>
    ), (
      <Row key={1}>
        <Col md="12">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Institution</th>
                <th>Division</th>
                <th>Create</th>
              </tr>
            </thead>
            <tbody>
              {
                self.state.teams.map((team, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {team.name}
                      </td>
                      <td>{team.institution}</td>
                      <td>{team.challenge} {team.divisionId === "missing" ? "(No Match)" : "(Matched)"}</td>
                      <td style={{ textAlign: "center" }}>
                        {
                          team.existingId ?
                            "" :
                            <Input type="checkbox" onChange={self.changeSelectedStatus} id={team.importId} checked={self.state.selectedTeams.indexOf(team) !== -1} />
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
    )]
  }
}

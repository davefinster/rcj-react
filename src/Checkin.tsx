import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { Checkin, CreateCheckinRequest, CreateCheckinResponse, Division, GetCheckinsRequest, GetCheckinsResponse, GetDivisionsRequest, GetDivisionsResponse, GetTeamsRequest, GetTeamsResponse, Team } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service";

interface IApiTeam {
  id: string
  name: string
  institution: string
  division: string
  divisionId: string
  league: string
  memberCount: number
}

interface IApiDivision {
  id: string
  name: string
  league: string
}

interface IDivision {
  teams: IApiTeam[]
  name: string
  id: string
}

interface ILeague {
  name: string
  divisions: IDivision[]
}

interface ICheckinState {
  teams: IApiTeam[]
  divisions: IApiDivision[]
  leagues: ILeague[]
  modalOpen: boolean
  selectedTeam?: IApiTeam
  checkinComments: string
  checkins: IApiTeamCheckin[]
}

interface ICheckinBody {
  comments: string
}

interface IApiTeamCheckin {
  team: string
  comments: string
}

export default class CheckIn extends React.Component<RouteComponentProps<{}>, ICheckinState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      checkinComments: "",
      checkins: [],
      divisions: [],
      leagues: [],
      modalOpen: false,
      teams: [],
    };
    this.openCheckinModal = this.openCheckinModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.checkinTeam = this.checkinTeam.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.fetchCheckins = this.fetchCheckins.bind(this);
    this.fetchTeamsGrpc = this.fetchTeamsGrpc.bind(this);
    this.fetchDivisionsGrpc = this.fetchDivisionsGrpc.bind(this);
    this.fetchCheckinsGrpc = this.fetchCheckinsGrpc.bind(this);
    this.checkinTeamGrpc = this.checkinTeamGrpc.bind(this);
  }

  public componentWillMount() {
    // this.fetchTeams();
    this.fetchTeamsGrpc();
    this.fetchDivisionsGrpc();
    this.fetchCheckinsGrpc();
  }

  public fetchCheckinsGrpc() {
    const req = new GetCheckinsRequest();
    const client = new RobocupClient("");
    client.getCheckins(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const checkins: IApiTeamCheckin[] = resp.getCheckInsList().map((checkin) => {
        const team = checkin.getTeam();
        return {
          comments: checkin.getComments(),
          team: team ? team.getId() : "",
        }
      });
      this.setState({
        checkins,
      })
    })
  }

  public fetchCheckins() {
    return fetch("/api/checkins", {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json()
    }).then((response: IApiTeamCheckin[]) => {
      this.setState({
        checkins: response
      });
    })
  }

  public mergeTeamDivisions() {
    if (this.state.divisions.length === 0) {
      return;
    }
    if (this.state.teams.length === 0) {
      return;
    }
    const leagueList: ILeague[] = [];
    this.state.teams.forEach((team) => {
      const divMatch = this.state.divisions.find((div) => {
        return div.id === team.divisionId;
      })
      if (divMatch === undefined) {
        return;
      }
      let leagueMatch = leagueList.find((league) => {
        return divMatch.league === league.name
      });
      if (leagueMatch === undefined) {
        leagueMatch = { name: divMatch.league, divisions: [] }
        leagueList.push(leagueMatch);
      }
      let divisionMatch = leagueMatch.divisions.find((division) => {
        return division.id === divMatch.id;
      });
      if (divisionMatch === undefined) {
        divisionMatch = { id: divMatch.id, name: divMatch.name, teams: [] }
        leagueMatch.divisions.push(divisionMatch);
      }
      divisionMatch.teams.push(team);
    });
    this.setState({
      leagues: leagueList,
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
          league = "Soccer"
        }
        return {
          id: div.getId(),
          league,
          name: div.getName(),
        }
      });
      this.setState({
        divisions,
      }, () => {
        this.mergeTeamDivisions();
      })
    });
  }

  public fetchTeamsGrpc() {
    const req = new GetTeamsRequest();
    req.setPopulateMembers(true);
    const client = new RobocupClient("");
    client.getTeams(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const apiTeams: IApiTeam[] = resp.getTeamsList().map((team) => {
        const inst = team.getInstitution();
        return {
          division: "",
          divisionId: team.getDivision(),
          id: team.getId(),
          institution: inst ? inst.getName() : "",
          league: "",
          memberCount: team.getMembersList().length,
          name: team.getName(),
        }
      });
      this.setState({
        teams: apiTeams,
      }, () => {
        this.mergeTeamDivisions();
      });
    })
  }

  public fetchTeams() {
    return fetch("/api/team", {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((response: IApiTeam[]) => {
      const leagueList: ILeague[] = [];
      response.forEach((team) => {
        let leagueMatch = leagueList.find((league) => {
          return team.league === league.name
        });
        if (leagueMatch === undefined) {
          leagueMatch = { name: team.league, divisions: [] }
          leagueList.push(leagueMatch);
        }
        let divisionMatch = leagueMatch.divisions.find((division) => {
          return division.id === team.divisionId;
        });
        if (divisionMatch === undefined) {
          divisionMatch = { id: team.divisionId, name: team.division, teams: [] }
          leagueMatch.divisions.push(divisionMatch);
        }
        divisionMatch.teams.push(team);
      });
      this.setState({
        leagues: leagueList,
        teams: response
      });
    })
  }

  public openCheckinModal(event: React.MouseEvent<HTMLButtonElement>) {
    const teamId = event.currentTarget.id;
    const teamMatch = this.state.teams.find((team) => {
      return team.id === teamId;
    })
    if (teamMatch === undefined) {
      return null;
    }
    this.setState({
      checkinComments: "",
      modalOpen: true,
      selectedTeam: teamMatch,
    })
    return null;
  }

  public closeModal() {
    this.setState({
      modalOpen: false,
      selectedTeam: undefined,
    });
  }

  public checkinTeamGrpc() {
    if (!this.state.selectedTeam) {
      return null;
    }
    const req = new CreateCheckinRequest();
    const protoCheckin = new Checkin();
    protoCheckin.setComments(this.state.checkinComments);
    const protoTeam = new Team();
    protoTeam.setId(this.state.selectedTeam.id);
    protoCheckin.setTeam(protoTeam);
    req.setCheckIn(protoCheckin);
    const client = new RobocupClient("");
    return client.createCheckin(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      this.fetchCheckinsGrpc();
      this.closeModal();
    })
  }

  public checkinTeam() {
    if (!this.state.selectedTeam) {
      return null;
    }
    const body: ICheckinBody = {
      comments: this.state.checkinComments
    }
    return fetch(`/api/team/${this.state.selectedTeam.id}/checkin`, {
      body: JSON.stringify(body),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
    }).then((response) => {
      if (response.status === 200) {
        this.fetchCheckins().then(() => {
          this.closeModal();
        })
      }
    })
  }

  public updateComments(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      checkinComments: event.currentTarget.value,
    })
    return null;
  }

  public render() {
    const self = this;
    const leagueSections = this.state.leagues.map((league, index) => {
      const divSections = league.divisions.map((division, dIndex) => {
        return [(
          <Row key={`${division.id}-0`}>
            <Col md="8">
              <h5>{division.name}</h5>
            </Col>
          </Row>
        ), (
          <Row key={`${division.id}-1`}>
            <Col md={12}>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Institution</th>
                    <th>Comments</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    division.teams.map((team) => {
                      const existingCheckin = self.state.checkins.find((checkin) => {
                        return checkin.team === team.id;
                      });

                      return (
                        <tr key={team.id}>
                          <td style={{ width: "30%" }}>{team.name}</td>
                          <td style={{ width: "20%" }}>{team.institution}</td>
                          <td style={{ width: "30%" }}>
                            {existingCheckin ? existingCheckin.comments : ""}
                          </td>
                          <td>
                            {
                              !existingCheckin ?
                                <Button color="primary" size="sm" id={`${team.id}`} onClick={this.openCheckinModal}>Check-In</Button> :
                                <Button color="secondary" size="sm" id={`${team.id}`} onClick={this.openCheckinModal}>Already Checked In</Button>
                            }

                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        )]
      })
      return [(
        <Row key={`${league.name}-0`}>
          <Col md="8">
            <h3>{league.name}</h3>
          </Col>
        </Row>
      ), ...divSections]
    });
    return [(
      <Row key={0}>
        <Col md="12">
          <h1>Team Check-In</h1>
        </Col>
      </Row>),
    ...leagueSections,
    (
      <Modal isOpen={self.state.modalOpen} toggle={self.closeModal} key={2}>
        <ModalHeader toggle={self.closeModal}>
          Check-In Confirmation
        </ModalHeader>
        <ModalBody>
          <p>Please confirm that you want to check-in the team <strong>{self.state.selectedTeam ? self.state.selectedTeam.name : ""}</strong> from <strong>{self.state.selectedTeam ? self.state.selectedTeam.institution : ""}</strong></p>
          <p>They have registered <strong>{self.state.selectedTeam ? self.state.selectedTeam.memberCount : ""} students</strong> to compete in the <strong>{self.state.selectedTeam ? self.state.selectedTeam.division : ""}</strong> division</p>
          <p>If you have selected the wrong team, hit Cancel.</p>
          <p>If this information is incorrect, please note down the correct information below and inform Mission Control</p>
          <Form>
            <FormGroup row={true}>
              <Col sm={12}>
                <Input type="textarea" id="checkin-comments" value={self.state.checkinComments} onChange={this.updateComments} />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.checkinTeamGrpc}>Confirm</Button>
          <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )]
  }

}

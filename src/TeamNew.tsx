import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { IApiDivision } from "./DivisionList";
import { CreateTeamRequest, Division, GetDivisionsRequest, Institution, Member, Team } from './generated/robocup_pb';
import { RobocupClient } from './generated/robocup_pb_service';
import { ITeam, ITeamMember, TeamForm } from "./TeamForm";


interface ITeamNewState {
  divisions: IApiDivision[]
  newTeam: ITeam
}

interface ICreateTeamBody {
  division: string
  members: ITeamMember[]
  name: string
  institutionId?: string
  institutionName?: string
}

export default class TeamNew extends React.Component<RouteComponentProps<{}>, ITeamNewState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      divisions: [],
      newTeam: {
        division: "",
        members: [],
        name: "",
      },
    }
    this.updatedTeam = this.updatedTeam.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.saveGrpc = this.saveGrpc.bind(this);
  }

  public fetchData() {
    const self = this;
    const req = new GetDivisionsRequest();
    const client = new RobocupClient("");
    client.getDivisions(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      this.setState({
        divisions: resp.getDivisionsList().map((div) => {
          let league = "On Stage";
          if (div.getLeague() === Division.League.RESCUE) {
            league = "Rescue";
          } else if (div.getLeague() === Division.League.SOCCER) {
            league = "Soccer"
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
        }),
        newTeam: Object.assign({}, this.state.newTeam, {
          division: resp.getDivisionsList()[0].getId(),
        })
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
      if (this.state.newTeam.division === "") {
        this.setState({
          divisions: response,
          newTeam: Object.assign({}, this.state.newTeam, {
            division: response[0].id,
          })
        });
      } else {
        this.setState({
          divisions: response,
        });
      }
    })
  }

  public saveGrpc() {
    const self = this;
    const req = new CreateTeamRequest();
    const protoTeam = new Team();
    protoTeam.setDivision(this.state.newTeam.division);
    protoTeam.setName(this.state.newTeam.name);
    this.state.newTeam.members.forEach((member) => {
      const protoMember = new Member();
      protoMember.setName(member.name);
      protoMember.setGender(Member.Gender.UNSPECIFIED);
      if (member.gender === "Male") {
        protoMember.setGender(Member.Gender.MALE);
      } else if (member.gender === "Female") {
        protoMember.setGender(Member.Gender.FEMALE);
      }
      protoTeam.addMembers(protoMember);
    })
    const protoInst = new Institution();
    if (this.state.newTeam.institutionId !== undefined) {
      protoInst.setId(this.state.newTeam.institutionId);
    } else if (this.state.newTeam.institutionName !== undefined) {
      protoInst.setName(this.state.newTeam.institutionName);
    }
    protoTeam.setInstitution(protoInst);
    req.setTeam(protoTeam);
    const client = new RobocupClient("");
    client.createTeam(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
    })
  }

  public saveTeam() {
    const createTeamBody: ICreateTeamBody = {
      division: this.state.newTeam.division,
      members: this.state.newTeam.members,
      name: this.state.newTeam.name,
    }
    if (this.state.newTeam.institutionId !== undefined) {
      createTeamBody.institutionId = this.state.newTeam.institutionId;
    } else {
      createTeamBody.institutionName = this.state.newTeam.institutionName;
    }
    return fetch("/api/team", {
      body: JSON.stringify(createTeamBody),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
    })
  }

  public componentWillMount() {
    // this.fetchDivisions();
    this.fetchData();
  }

  public updatedTeam(team: ITeam) {
    this.setState({
      newTeam: team
    });
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>New Team</h3>
        </Col>
      </Row>
    ), (
      <TeamForm
        key={1}
        divisions={self.state.divisions}
        updatedTeamCallback={self.updatedTeam}
        currentTeam={self.state.newTeam}
      />
    ), (
      <Row key={2}>
        <Col md={12} style={{ textAlign: 'right' }}>
          < Button color="primary" size="sm" onClick={self.saveGrpc}> Save</Button>
        </Col>
      </Row >
    )]
  }
}

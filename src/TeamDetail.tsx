import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Row, Table } from 'reactstrap';
import { IApiDivision } from "./DivisionList"
import { Division, GetDivisionsRequest, GetTeamRequest, Institution, Member, ScoreSheetTemplate, Team, UpdateTeamRequest } from './generated/robocup_pb';
import { RobocupClient } from "./generated/robocup_pb_service"
import { IScoreSheet } from './ScoreSheetForm';
import { ITeam, ITeamMember, TeamForm } from "./TeamForm";



interface IApiTeamMember {
  id: string
  name: string
  gender: string
}

interface IApiTeam {
  id: string
  name: string
  division_id: string
  division: string
  institution_id: string
  institution: string
  members: IApiTeamMember[]
}

interface IApiTeamDetailState {
  team?: IApiTeam
  divisions: IApiDivision[]
  scoreSheets: IScoreSheetList[]
}

interface ITeamDetailUrlParams {
  id: string
}

interface IUpdateTeamBody {
  name: string
  division: string
  institutionId?: string
  institutionName?: string
  members: ITeamMember[]
}

interface IScoreSheetList {
  id: string
  division: string
  template: string
  round: number
  type: string
  total: string
  author: string
}

export default class TeamDetail extends React.Component<RouteComponentProps<ITeamDetailUrlParams>, IApiTeamDetailState> {

  constructor(props: RouteComponentProps<ITeamDetailUrlParams>) {
    super(props);
    this.state = {
      divisions: [],
      scoreSheets: []
    };
    this.fetchTeam = this.fetchTeam.bind(this);
    this.updatedTeam = this.updatedTeam.bind(this);
    this.transformTeam = this.transformTeam.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
    this.fetchScoreSheets = this.fetchScoreSheets.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateGrpc = this.updateGrpc.bind(this);
  }

  public componentWillMount() {
    // this.fetchDivisions();
    // this.fetchTeam();
    // this.fetchScoreSheets();
    this.fetchData();
  }

  public fetchData() {
    const self = this;
    const req = new GetTeamRequest();
    req.setTeamId(this.props.match.params.id);
    const divReq = new GetDivisionsRequest();
    const client = new RobocupClient("");
    client.getDivisions(divReq, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const divs: IApiDivision[] = resp.getDivisionsList().map((protoDiv) => {
        const div: IApiDivision = {
          id: protoDiv.getId(),
          league: "On Stage",
          name: protoDiv.getName(),
        }
        if (protoDiv.getLeague() === Division.League.RESCUE) {
          div.league = "Rescue";
        } else if (protoDiv.getLeague() === Division.League.SOCCER) {
          div.league = "Soccer"
        }
        return div;
      })
      this.setState({
        divisions: divs,
      });
    })
    client.getTeam(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const protoTeam = resp.getTeam();
      if (protoTeam === undefined) {
        return;
      }
      const protoDivision = resp.getDivision();
      if (protoDivision === undefined) {
        return;
      }
      const protoInstitution = protoTeam.getInstitution();
      if (protoInstitution === undefined) {
        return;
      }
      const team: IApiTeam = {
        division: protoDivision.getName(),
        division_id: protoDivision.getId(),
        id: protoTeam.getId(),
        institution: protoInstitution.getName(),
        institution_id: protoInstitution.getId(),
        members: protoTeam.getMembersList().map((member) => {
          const mem: IApiTeamMember = {
            gender: "Not Specified",
            id: member.getId(),
            name: member.getName(),
          }
          if (member.getGender() === Member.Gender.MALE) {
            mem.gender = "Male"
          } else if (member.getGender() === Member.Gender.FEMALE) {
            mem.gender = "Female"
          }
          return mem;
        }),
        name: protoTeam.getName()
      }
      const scoreSheetList: IScoreSheetList[] = resp.getScoreSheetsList().map((scoreSheet) => {
        const author = scoreSheet.getAuthor();
        const item: IScoreSheetList = {
          author: author ? author.getName() : "",
          division: protoDivision.getId(),
          id: scoreSheet.getId(),
          round: scoreSheet.getRound(),
          template: "",
          total: scoreSheet.getTotal().toString(),
          type: "Interview"
        }
        if (scoreSheet.getType() === ScoreSheetTemplate.Type.PERFORMANCE) {
          item.type = "Performance";
        }
        return item;
      })
      this.setState({
        scoreSheets: scoreSheetList,
        team,
      })
    })
  }

  public fetchScoreSheets() {
    return fetch(`/api/team/${this.props.match.params.id}/score_sheets`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json()
    }).then((response: IScoreSheetList[]) => {
      this.setState({
        scoreSheets: response,
      });
    })
  }

  public fetchTeam() {
    return fetch(`/api/team/${this.props.match.params.id}`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json()
    }).then((response: IApiTeam) => {
      this.setState({
        team: response,
      });
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

  public updateGrpc() {
    if (this.state.team === undefined) {
      return
    };
    const self = this;
    const req = new UpdateTeamRequest();
    const protoTeam = new Team();
    protoTeam.setId(this.props.match.params.id);
    protoTeam.setDivision(this.state.team.division);
    protoTeam.setName(this.state.team.name);
    this.state.team.members.forEach((member) => {
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
    if (this.state.team.institution_id !== undefined) {
      protoInst.setId(this.state.team.institution_id);
    } else if (this.state.team.institution !== undefined) {
      protoInst.setName(this.state.team.institution);
    }
    protoTeam.setInstitution(protoInst);
    req.setTeam(protoTeam);
    const client = new RobocupClient("");
    client.updateTeam(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
    })
  }

  public updateTeam() {
    if (this.state.team === undefined) {
      return
    };
    const body: IUpdateTeamBody = {
      division: this.state.team.division,
      members: this.state.team.members,
      name: this.state.team.name,
    }
    if (this.state.team.institution_id !== undefined) {
      body.institutionId = this.state.team.institution_id;
    } else {
      body.institutionName = this.state.team.institution;
    }
    return fetch(`/api/team/${this.props.match.params.id}`, {
      body: JSON.stringify(body),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
    });
  }

  public transformTeam(): ITeam {
    if (this.state.team === undefined) {
      return {
        division: "",
        members: [],
        name: "",
      }
    }
    const transform = {
      division: this.state.team.division_id,
      id: this.state.team.id,
      institutionId: this.state.team.institution_id,
      institutionName: this.state.team.institution,
      members: this.state.team.members,
      name: this.state.team.name,
    }
    return transform;
  }

  public updatedTeam(team: ITeam) {
    const updatedTeam = Object.assign({}, this.state.team, {
      division: team.division,
      members: team.members,
      name: team.name,
    });
    if (team.institutionId !== undefined) {
      updatedTeam.institution_id = team.institutionId;
    }
    if (team.institutionName !== undefined) {
      updatedTeam.institution = team.institutionName;
    }
    this.setState({
      team: updatedTeam,
    });
  }

  public render() {
    const self = this;
    const transformed = self.transformTeam();
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>Team</h3>
        </Col>
        <Col md="4" />
        <Col md="4">
          <a href={`/api/team/${this.props.match.params.id}/excel`}>Excel Export</a>
        </Col>
      </Row>
    ), (
      <TeamForm
        key={1}
        divisions={self.state.divisions}
        updatedTeamCallback={self.updatedTeam}
        currentTeam={transformed}
      />
    ), (
      <Row key={2}>
        <Col md={12} style={{ textAlign: 'right' }}>
          <Button color="primary" size="sm" onClick={self.updateGrpc}>Update</Button>
        </Col>
      </Row >
    ), (
      <Row key={3}>
        <Col md="4">
          <h3>Score Sheets</h3>
        </Col>
      </Row>
    ), (
      <Table key={4}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Type</th>
            <th>Round</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            self.state.scoreSheets.map((scoreSheet) => {
              return (
                <tr key={scoreSheet.id}>
                  <td><Link to={`/dance/${self.state.team ? self.state.team.division_id : ""}/${scoreSheet.type.toLowerCase()}/${scoreSheet.id}`}>{scoreSheet.id}</Link></td>
                  <td>{scoreSheet.author}</td>
                  <td>{scoreSheet.type}</td>
                  <td>{scoreSheet.round > 0 ? `Round ${scoreSheet.round}` : ""}</td>
                  <td>{scoreSheet.total}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )]
  }
}

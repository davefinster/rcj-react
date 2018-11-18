import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Row, Table } from 'reactstrap';
import { GetDivisionRequest, GetDivisionResponse, GetTeamsRequest, GetTeamsResponse } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service";

interface IApiTeamList {
  division: string
  id: string
  institution: string
  name: string
}

interface ITeamListState {
  teams: IApiTeamList[]
}

export default class TeamList extends React.Component<RouteComponentProps<{}>, ITeamListState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      teams: []
    }
    this.goToNew = this.goToNew.bind(this);
    this.fetchTeamsGrpc = this.fetchTeamsGrpc.bind(this);
  }

  public goToNew() {
    this.props.history.push("/admin/teams/new");
  }

  public componentWillMount() {
    this.fetchTeamsGrpc();
  }

  public fetchTeamsGrpc() {
    const req = new GetTeamsRequest();
    const client = new RobocupClient("");
    client.getTeams(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const divReq = new GetDivisionRequest();
      client.getDivisions(divReq, (divErr, divResp) => {
        if ((divResp === null) || (divResp === undefined)) {
          return;
        }
        const teams: IApiTeamList[] = resp.getTeamsList().map((team) => {
          const inst = team.getInstitution();
          const divName = divResp.getDivisionsList().find((div) => {
            return div.getId() === team.getDivision();
          })
          return {
            division: divName ? divName.getName() : "",
            id: team.getId(),
            institution: inst ? inst.getName() : "",
            name: team.getName(),
          }
        });
        this.setState({
          teams
        });
      })
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
      return response.json()
    }).then((response: IApiTeamList[]) => {
      this.setState({
        teams: response,
      });
    })
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>Teams</h3>
        </Col>
        <Col md="4" />
        <Col md="4" style={{ textAlign: "right" }}>
          <Button color="primary" size="sm" onClick={this.goToNew}>Add</Button>
        </Col>
      </Row>
    ), (
      <Row key={1}>
        <Col md="12">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Division</th>
              </tr>
            </thead>
            <tbody>
              {
                self.state.teams.map((team, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to={`/admin/teams/${team.id}`}>
                          {team.name} ({team.institution})
                        </Link>
                      </td>
                      <td>{team.division}</td>
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

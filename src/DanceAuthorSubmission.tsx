import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Row, Table } from 'reactstrap';
import { GetDivisionsRequest, GetDivisionsResponse, GetScoreSheetsRequest, GetScoreSheetsResponse, ScoreSheetTemplate } from './generated/robocup_pb';
import { RobocupClient } from './generated/robocup_pb_service';

interface IScoreSheetList {
  id: string
  divisionId: string
  division: string
  template: string
  round: number
  type: string
  total: string
  teamId: string
  teamName: string
  institutionName: string
  competitionRounds: number
  finalRounds: number
}

interface IDanceAuthorSubmissionState {
  scoreSheets: IScoreSheetList[]
}

export default class DanceAuthorSubmission extends React.Component<RouteComponentProps<{}>, IDanceAuthorSubmissionState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      scoreSheets: []
    }
    this.fetchScoreSheets = this.fetchScoreSheets.bind(this);
    this.fetchScoreSheetsGrpc = this.fetchScoreSheetsGrpc.bind(this);
  }

  public componentWillMount() {
    this.fetchScoreSheetsGrpc();
  }

  public fetchScoreSheetsGrpc() {
    const client = new RobocupClient("");
    const divReq = new GetDivisionsRequest();
    client.getDivisions(divReq, (divErr, divResp) => {
      if ((divResp === null) || (divResp === undefined)) {
        return;
      }
      const req = new GetScoreSheetsRequest();
      client.getScoreSheets(req, (err, resp) => {
        if ((resp === null) || (resp === undefined)) {
          return;
        }
        const scoreSheets: IScoreSheetList[] = resp.getScoreSheetsList().map((scoreSheet) => {
          const divMatch = divResp.getDivisionsList().find((div) => {
            return div.getId() === scoreSheet.getDivisionId();
          })
          const team = scoreSheet.getTeam();
          let institutionName = "";
          if (team) {
            const instit = team.getInstitution();
            if (instit) {
              institutionName = instit.getName();
            }
          }
          let sheetType = "Interview";
          if (scoreSheet.getType() === ScoreSheetTemplate.Type.PERFORMANCE) {
            sheetType = "Performance";
          }
          return {
            competitionRounds: 0,
            division: divMatch ? divMatch.getName() : "",
            divisionId: scoreSheet.getDivisionId(),
            finalRounds: divMatch ? divMatch.getFinalRounds() : 0,
            id: scoreSheet.getId(),
            institutionName,
            round: scoreSheet.getRound(),
            teamId: team ? team.getId() : "",
            teamName: team ? team.getName() : "",
            template: "",
            total: scoreSheet.getTotal().toString(),
            type: scoreSheet.getType() === ScoreSheetTemplate.Type.INTERVIEW ? "Interview" : "Performance",
          }
        });
        this.setState({
          scoreSheets,
        })
      })
    })
  }

  public fetchScoreSheets() {
    return fetch("/api/user/me/score_sheets", {
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

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>Your Submissions</h3>
        </Col>
        <Col md="4" />
        <Col md="4" />
      </Row>
    ), (
      <Row key={1}>
        <Col md="12">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Team</th>
                <th>Division</th>
                <th>Round</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {
                self.state.scoreSheets.map((scoreSheet, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to={`/dance/${scoreSheet.divisionId}/${scoreSheet.type.toLowerCase()}/${scoreSheet.id}`}>
                          {scoreSheet.id}
                        </Link>
                      </td>
                      <td>
                        <Link to={`admin/teams/${scoreSheet.teamId}`}>
                          {scoreSheet.teamName} ({scoreSheet.institutionName})
                          </Link>
                      </td>
                      <td>{scoreSheet.division}</td>
                      <td>
                        {
                          scoreSheet.round === 0 ? "Interview" : ""
                        }
                        {
                          (scoreSheet.round > 0 && scoreSheet.round <= scoreSheet.competitionRounds) ? `Round ${scoreSheet.round}` : ""
                        }
                        {
                          (scoreSheet.round > scoreSheet.competitionRounds) ? `Final ${scoreSheet.round - scoreSheet.competitionRounds}` : ""
                        }
                      </td>
                      <td>{scoreSheet.total}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    )]
  }
}

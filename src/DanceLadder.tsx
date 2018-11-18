import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, ListGroup, ListGroupItem, Row, Table } from 'reactstrap';
import { GetDanceLadderRequest, GetDanceLadderResponse } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service";

interface IApiDanceLadderEntry {
  id: string
  name: string
  institution: string
  divisionId: string
  division: string
  bestFinal: string
  bestRound: string
  competitionRounds: number
  finalRounds: number
  finalTotal: string
  interviewScore: string
  roundTotal: string
  scores: Array<{
    round: number
    average: string
    count: number
  }>
}

interface IDanceLadderTeam {
  id: string
  name: string
  institution: string
  bestFinal: string
  bestRound: string
  finalTotal: string
  interviewScore: string
  roundTotal: string
  scores: Array<{
    round: number
    average: string
    count: number
  }>
}

interface IDanceLadderDivision {
  id: string
  name: string
  teams: IDanceLadderTeam[]
  competitionRounds: number
  finalRounds: number
}

interface IDanceLadderState {
  divisions: IDanceLadderDivision[]
}

export default class DanceLadder extends React.Component<RouteComponentProps<{}>, IDanceLadderState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      divisions: [],
    }
    this.fetchLadder = this.fetchLadder.bind(this);
    this.goToInterview = this.goToInterview.bind(this);
    this.goToPerformance = this.goToPerformance.bind(this);
  }

  public componentWillMount() {
    this.fetchLadder();
  }

  public fetchLadder() {
    const req = new GetDanceLadderRequest();
    const client = new RobocupClient("");
    client.getDanceLadder(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const divisions: IDanceLadderDivision[] = [];
      resp.getDivisionsList().forEach((div) => {
        const innerDiv = div.getDivision();
        if (innerDiv === undefined) {
          return;
        }
        const teams: IDanceLadderTeam[] = [];
        div.getLadderList().forEach((ladderEntry) => {
          const innerTeam = ladderEntry.getTeam();
          if (innerTeam === undefined) {
            return;
          }
          const innerInstitution = innerTeam.getInstitution();
          if (innerInstitution === undefined) {
            return;
          }
          const team: IDanceLadderTeam = {
            bestFinal: ladderEntry.getBestFinal().toFixed(2),
            bestRound: ladderEntry.getBestRound().toFixed(2),
            finalTotal: ladderEntry.getFinalTotal().toFixed(2),
            id: innerTeam.getId(),
            institution: innerInstitution.getName(),
            interviewScore: ladderEntry.getInterviewScore().toFixed(2),
            name: innerTeam.getName(),
            roundTotal: ladderEntry.getRoundTotal().toFixed(2),
            scores: ladderEntry.getRoundsList().map((round) => {
              return {
                average: round.getAverage().toFixed(2),
                count: round.getCount(),
                round: round.getRound()
              }
            })
          }
          teams.push(team);
        })
        const displayDiv: IDanceLadderDivision = {
          competitionRounds: innerDiv.getCompetitionRounds(),
          finalRounds: innerDiv.getFinalRounds(),
          id: innerDiv.getId(),
          name: innerDiv.getName(),
          teams: teams.reverse(),
        }
        divisions.push(displayDiv);
      })
      this.setState({
        divisions
      });
    })
  }

  public goToInterview(event: React.MouseEvent<HTMLButtonElement>) {
    const parts = event.currentTarget.id.split("-");
    const elementIndex = parseInt(parts[parts.length - 1], 10);
    const divisionId = this.state.divisions[elementIndex].id;
    this.props.history.push(`/dance/${divisionId}/interview/new`);
  }

  public goToPerformance(event: React.MouseEvent<HTMLButtonElement>) {
    const parts = event.currentTarget.id.split("-");
    const elementIndex = parseInt(parts[parts.length - 1], 10);
    const divisionId = this.state.divisions[elementIndex].id;
    this.props.history.push(`/dance/${divisionId}/performance/new`);
  }

  public render() {
    const self = this;
    const divSections = self.state.divisions.map((division, index) => {
      const competitionRoundNames: string[] = [];
      for (let i = 0; i < division.competitionRounds; i++) {
        competitionRoundNames.push(`Round ${i + 1}`)
      }
      const finalRoundNames: string[] = [];
      for (let i = 0; i < division.finalRounds; i++) {
        finalRoundNames.push(`Final ${i + 1}`)
      }
      return [(
        <Row key={`${division.id}-0`}>
          <Col md="8">
            <h3>{division.name}</h3>
          </Col>
          <Col md="4" style={{ textAlign: "right" }}>
            <Button color="primary" size="sm" id={`division-interview-${index}`} onClick={this.goToInterview}>New Interview</Button>
            <Button color="primary" size="sm" id={`division-performance-${index}`} onClick={this.goToPerformance}>New Performance</Button>
          </Col>
        </Row>
      ), (
        <Row key={`${division.id}-1`}>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Team</th>
                  {
                    competitionRoundNames.map((name, idx) => {
                      return (
                        <th key={idx}>{name}</th>
                      )
                    })
                  }
                  <th>Interview Score</th>
                  <th>Best Round Score</th>
                  <th>Overall</th>
                  {
                    finalRoundNames.map((name, idx) => {
                      return (
                        <th key={idx}>{name}</th>
                      )
                    })
                  }
                  <th>Final Score</th>
                </tr>
              </thead>
              <tbody>
                {
                  division.teams.map((team) => {
                    let interviewCount = 0;
                    const interviewRound = team.scores.find((score) => {
                      return score.round === 0;
                    })
                    if (interviewRound) {
                      interviewCount = interviewRound.count;
                    }
                    return (
                      <tr key={team.id}>
                        <td>
                          <Link to={`/admin/teams/${team.id}`}>
                            {team.name} ({team.institution})
                          </Link>
                        </td>
                        {
                          competitionRoundNames.map((name, idx) => {
                            const roundIndex = idx + 1;
                            const roundScore = team.scores.find((score) => {
                              return score.round === roundIndex;
                            });
                            if (!roundScore) {
                              return (
                                <td key={`comp-round-${idx}`}>0.0 (0)</td>
                              )
                            }
                            return (<td key={`comp-round-${idx}`}>{`${roundScore.average}`}</td>);
                          })
                        }
                        <td>{team.interviewScore}</td>
                        <td>{team.bestRound}</td>
                        <td>{team.roundTotal}</td>
                        {
                          finalRoundNames.map((name, idx) => {
                            const roundIndex = division.competitionRounds + idx + 1;
                            const roundScore = team.scores.find((score) => {
                              return score.round === roundIndex;
                            });
                            if (!roundScore) {
                              return (
                                <td key={`final-round-${idx}`}>0.0 (0)</td>
                              )
                            }
                            return (<td key={`final-round-${idx}`}>{`${roundScore.average}`}</td>);
                          })
                        }
                        <td>{team.finalTotal}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      )];
    })
    return [(
      <Row key={0}>
        <Col md="12">
          <h1>Dance</h1>
        </Col>
      </Row>),
    ...divSections
    ];
  }
}

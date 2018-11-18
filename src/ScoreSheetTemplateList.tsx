import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Row, Table } from 'reactstrap';
import { GetScoreSheetTemplatesRequest, GetScoreSheetTemplatesResponse, ScoreSheetTemplate } from "./generated/robocup_pb"
import { RobocupClient } from "./generated/robocup_pb_service"

interface IApiScoreSheetTemplate {
  id: string
  name: string
  type: string
}

interface IScoreSheetTemplateListState {
  templates: IApiScoreSheetTemplate[]
}

export default class ScoreSheetTemplateList extends React.Component<RouteComponentProps<{}>, IScoreSheetTemplateListState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      templates: []
    }
    this.goToNew = this.goToNew.bind(this);
    this.fetchTemplates = this.fetchTemplates.bind(this);
    this.fetchTemplatesGrpc = this.fetchTemplatesGrpc.bind(this);
  }

  public goToNew() {
    this.props.history.push("/admin/templates/new");
  }

  public componentWillMount() {
    this.fetchTemplatesGrpc();
  }

  public fetchTemplatesGrpc() {
    const req = new GetScoreSheetTemplatesRequest();
    const client = new RobocupClient("");
    client.getScoreSheetTemplates(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const templates: IApiScoreSheetTemplate[] = resp.getScoreSheetTemplatesList().map((temp) => {
        return {
          id: temp.getId(),
          name: temp.getName(),
          type: temp.getType() === ScoreSheetTemplate.Type.INTERVIEW ? "Interview" : "Performance"
        }
      });
      this.setState({
        templates
      })
    });
  }

  public fetchTemplates() {
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
        templates: response
      });
    })
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>Score Sheet Templates</h3>
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
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {
                self.state.templates.map((template, index) => {
                  return (
                    <tr key={index}>
                      <td>{template.name}</td>
                      <td>{template.type}</td>
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

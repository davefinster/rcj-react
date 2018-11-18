import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Row, Table } from 'reactstrap';

export default class ScoreSheetList extends React.Component<RouteComponentProps<{}>, {}> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.goToNew = this.goToNew.bind(this);
  }

  public goToNew() {
    this.props.history.push("/admin/score_sheets/new");
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>Score Sheets</h3>
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
                <th>Active</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    )]
  }
}

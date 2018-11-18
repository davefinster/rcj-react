import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';

export default class ScoreSheetNew extends React.Component<RouteComponentProps<{}>, {}> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>New Score Sheets</h3>
        </Col>
      </Row>
    ), (
      <Form key={1}>
        <FormGroup row={true}>
          <Label for="name" sm={2} style={{ textAlign: "right" }}>Name</Label>
          <Col sm={4}>
            <Input type="text" name="name" id="score-sheet-name" />
          </Col>
          <Label for="sheet-type" sm={2} style={{ textAlign: "right" }}>Sheet Type</Label>
          <Col sm={4}>
            <Input type="select" name="sheet-type" id="score-sheet-type">
              <option value="Interview">Interview</option>
              <option value="Performance">Performance</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row={true}>
          <Label for="enabled" sm={2} style={{ textAlign: "right" }}>Enabled</Label>
          <Col sm={4}>
            <Input type="checkbox" name="sheet-enabled" id="score-sheet-enabled" />{' '}
          </Col>
        </FormGroup>
        <Row>
          <Col md="4">
            <h3>Timings</h3>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Input type="text" name="timing-name" id="score-sheet-timing" />
          </Col>
          <Col md="4">
            <Button color="primary" size="sm">Add</Button>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <h3>Sections</h3>
          </Col>
          <Col md="4" />
          <Col md="4" style={{ textAlign: "right" }}>
            <Button color="primary" size="sm">Add</Button>
          </Col>
        </Row>
      </Form>
    )]
  }
}

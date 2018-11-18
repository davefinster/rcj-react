import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { GetSheetAuthUrlRequest, GetSheetConfigRequest, GetSheetTeamsResponse, SubmitSheetConfigRequest, SubmitSheetConfigResponse } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service";

interface ISheetsConfigState {
  authUrl?: string
  code: string
  ingestionSheet: string
  pushSheet: string
}

export default class SheetsConfig extends React.Component<RouteComponentProps<{}>, ISheetsConfigState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.getAuthUrl = this.getAuthUrl.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.getSheetConfig = this.getSheetConfig.bind(this);
    this.sendIds = this.sendIds.bind(this);
    this.state = {
      code: "",
      ingestionSheet: "",
      pushSheet: ""
    };
  }

  public componentWillMount() {
    this.getSheetConfig();
  }

  public getAuthUrl() {
    const req = new GetSheetAuthUrlRequest();
    const client = new RobocupClient("");
    client.getSheetAuthUrl(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      this.setState({
        authUrl: resp.getUrl(),
      })
    })
  }

  public updateValue(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget.id === "code") {
      this.setState({
        code: event.currentTarget.value,
      })
    } else if (event.currentTarget.id === "ingestion") {
      this.setState({
        ingestionSheet: event.currentTarget.value,
      })
    } else if (event.currentTarget.id === "push") {
      this.setState({
        pushSheet: event.currentTarget.value,
      })
    }
  }

  public getSheetConfig() {
    const req = new GetSheetConfigRequest();
    const client = new RobocupClient("");
    client.getSheetConfig(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      this.setState({
        ingestionSheet: resp.getIngestionSpreadsheetId(),
        pushSheet: resp.getPushSpreadsheetId(),
      })
    })
  }

  public sendCode() {
    const req = new SubmitSheetConfigRequest();
    req.setCode(this.state.code);
    const client = new RobocupClient("");
    client.submitSheetConfig(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
    })
  }

  public sendIds() {
    const req = new SubmitSheetConfigRequest();
    req.setIngestionSpreadsheetId(this.state.ingestionSheet);
    req.setPushSpreadsheetId(this.state.pushSheet);
    const client = new RobocupClient("");
    client.submitSheetConfig(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
    })
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>Auth Configuration</h3>
        </Col>
      </Row>
    ), (
      <Form key={1}>
        <FormGroup row={true}>
          <Label sm={2} style={{ textAlign: "right" }}>Request Auth URL</Label>
          <Col sm={4}>
            <Button color="primary" size="sm" onClick={self.getAuthUrl}>Request</Button>
          </Col>
        </FormGroup>
      </Form>
    ), (
      <Form key={2}>
        <FormGroup row={true}>
          <Label sm={2} style={{ textAlign: "right" }}>Click Link</Label>
          <Col sm={4}>
            <a href={this.state.authUrl} target="_blank">Auth Link</a>
          </Col>
        </FormGroup>
      </Form>
    ), (
      <Form key={3}>
        <FormGroup row={true}>
          <Label sm={2} style={{ textAlign: "right" }}>Paste Code</Label>
          <Col sm={10}>
            <Input type="text" name="code" id="code" onChange={this.updateValue} value={this.state.code} />
          </Col>
        </FormGroup>
      </Form>
    ), (
      <Form key={4}>
        <FormGroup row={true}>
          <Label sm={2} style={{ textAlign: "right" }}>Submit</Label>
          <Col sm={4}>
            <Button color="primary" size="sm" onClick={self.sendCode}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    ), (
      <Row key={5}>
        <Col md="4">
          <h3>Sheet Configuration</h3>
        </Col>
      </Row>
    ), (
      <Form key={6}>
        <FormGroup row={true}>
          <Label sm={2} style={{ textAlign: "right" }}>Ingestion Sheet ID</Label>
          <Col sm={10}>
            <Input type="text" name="ingestion" id="ingestion" onChange={this.updateValue} value={this.state.ingestionSheet} />
          </Col>
        </FormGroup>
      </Form>
    ), (
      <Form key={7}>
        <FormGroup row={true}>
          <Label sm={2} style={{ textAlign: "right" }}>Push Sheet ID</Label>
          <Col sm={10}>
            <Input type="text" name="push" id="push" onChange={this.updateValue} value={this.state.pushSheet} />
          </Col>
        </FormGroup>
      </Form>
    ), (
      <Form key={8}>
        <FormGroup row={true}>
          <Label sm={2} style={{ textAlign: "right" }} />
          <Col sm={4}>
            <Button color="primary" size="sm" onClick={self.sendIds}>Set Spreadsheets</Button>
          </Col>
        </FormGroup>
      </Form>
    )]
  }

}

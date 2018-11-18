import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

export default class AdminList extends React.Component<RouteComponentProps<{}>, {}> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.goToRoot = this.goToRoot.bind(this);
    this.goToScoreSheets = this.goToScoreSheets.bind(this);
    this.goToDivisions = this.goToDivisions.bind(this);
    this.goToTeams = this.goToTeams.bind(this);
    this.goToUsers = this.goToUsers.bind(this);
    this.goToSync = this.goToSync.bind(this);
    this.goToSheetsConfig = this.goToSheetsConfig.bind(this);
  }

  public goToRoot() {
    this.props.history.push("/");
  }

  public goToScoreSheets() {
    this.props.history.push("/admin/templates");
  }

  public goToDivisions() {
    this.props.history.push("/admin/divisions");
  }

  public goToTeams() {
    this.props.history.push("/admin/teams");
  }

  public goToUsers() {
    this.props.history.push("/admin/users");
  }

  public goToSync() {
    this.props.history.push("/admin/sync");
  }

  public goToSheetsConfig() {
    this.props.history.push("/admin/sheets");
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="12">
          <h1>Administration</h1>
        </Col>
      </Row>), (
      <Row key={1}>
        <Col md="4">
          <ListGroup className="nav-list">
            <h4 className="list-group-item">Competition</h4>
            <ListGroupItem tag="a" onClick={this.goToScoreSheets} key={0}>
              <h5>Score Sheets</h5>
              <p>Manage the score sheet templates that are available</p>
            </ListGroupItem>
            <ListGroupItem tag="a" onClick={this.goToDivisions} key={1}>
              <h5>Divisions</h5>
              <p>Manage the divisions available to the various leagues</p>
            </ListGroupItem>
            <ListGroupItem tag="a" onClick={this.goToTeams} key={2}>
              <h5>Teams</h5>
              <p>Manage the participating teams</p>
            </ListGroupItem>
            <ListGroupItem tag="a" onClick={this.goToSync} key={3}>
              <h5>Team Sync</h5>
              <p>Pull teams across from sheets</p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md="4">
          <ListGroup className="nav-list">
            <h4 className="list-group-item">Access</h4>
            <ListGroupItem tag="a" onClick={this.goToUsers} key={0}>
              <h5>Users</h5>
              <p>Show a list of valid users and alter their details</p>
            </ListGroupItem>
            <ListGroupItem tag="a" onClick={this.goToSheetsConfig} key={1}>
              <h5>Sheets</h5>
              <p>Configure access to Google Sheets</p>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    )];
  }
}

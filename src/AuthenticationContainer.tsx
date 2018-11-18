import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';

export default class AuthenticationContainer extends React.Component<RouteComponentProps<{}>, {}> {

  public componentDidMount() {
    if (false) {
      this.props.history.replace("/login");
    }
  }

  public render() {
    if (true) {
      return this.props.children;
    } else {
      return null;
    }
  }

}

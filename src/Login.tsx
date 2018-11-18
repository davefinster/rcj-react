import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { AuthStatus } from "./AuthContext";
import { LoginRequest, LoginResponse } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service";

interface ILoginState {
  username: string
  password: string
  message: string
}

interface ILoginUser {
  id: string
  name: string
  username: string
}

export default class Login extends React.Component<RouteComponentProps<{}>, ILoginState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.updateLogin = this.updateLogin.bind(this);
    this.state = {
      message: "",
      password: "",
      username: ""
    }
    this.performLogin = this.performLogin.bind(this);
  }

  public updateLogin(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget.id === "username") {
      this.setState({
        username: event.currentTarget.value
      })
    } else if (event.currentTarget.id === "password") {
      this.setState({
        password: event.currentTarget.value
      })
    }
  }

  public performLogin() {
    this.setState({
      message: ""
    });
    const req = new LoginRequest();
    req.setUsername(this.state.username);
    req.setPassword(this.state.password);
    const client = new RobocupClient("");
    client.login(req, (err, resp) => {
      if ((resp == null) || (err !== null)) {
        this.setState({
          message: err.message,
        });
        AuthStatus.setLoggedIn(false);
        AuthStatus.setUser({
          id: "",
          name: "",
          username: ""
        })
        return;
      }
      const user = resp.getAuthenticatedUser();
      if (user === undefined) {
        return;
      }
      AuthStatus.setUser({
        id: user.getId(),
        name: user.getName(),
        username: user.getUsername(),
      });
      AuthStatus.setLoggedIn(true);
      this.props.history.replace("/dance");
    })
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="12">
          <h1>Login</h1>
        </Col>
      </Row>
    ), (
      <Row key={1}>
        <Col md="3" />
        <Col md="6">
          <Form>
            <FormGroup row={true}>
              <Label>Username</Label>
              <Col sm={10}>
                <Input type="text" id="username" value={self.state.username} onChange={self.updateLogin} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label>Password</Label>
              <Col sm={10}>
                <Input type="password" id="password" value={self.state.password} onChange={self.updateLogin} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Col sm={12} style={{ textAlign: "right" }}>
                {self.state.message}
                <Button color="primary" size="sm" onClick={self.performLogin}>Login</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
        <Col md="3" />
      </Row>
    )];
  }
}

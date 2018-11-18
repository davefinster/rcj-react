/* tslint:disable */
import * as React from 'react';
import { BrowserRouter as Router, Link, Redirect, Route } from "react-router-dom";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem
} from 'reactstrap';
import "./App.css";
import AppRoot from "./AppRoot";
import { AuthContext, AuthStatus } from "./AuthContext";
import AuthenticationContainer from "./AuthenticationContainer";
import { GetDivisionsRequest, GetDivisionsResponse } from "./generated/robocup_pb";
import { RobocupClient, Robocup } from "./generated/robocup_pb_service";
import { grpc } from "grpc-web-client";
import * as Loadables from './Loadables';
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

interface IRobocupAppState {
  isOpen: boolean
}

const routes = [
  {
    content: Loadables.LoadableCheckin,
    exact: false,
    name: "Check-In",
    path: "/checkin"
  }, {
    content: Loadables.LoadableDanceHome,
    exact: false,
    name: "Dance",
    path: "/dance"
  }, {
    content: Loadables.LoadableMySubmissions,
    exact: false,
    name: "My Submissions",
    path: "/my"
  }, {
    content: Loadables.LoadableAdminHome,
    exact: false,
    name: "Admin",
    path: "/admin"
  }
];

export class RobocupApp extends React.Component<{}, IRobocupAppState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);

  }

  public toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public logout() {
    return fetch(`/logout`, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      AuthStatus.setLoggedIn(false);
      this.forceUpdate();
    })
  }

  public componentDidMount() {
    AuthStatus.changedCallback = () => {
      this.forceUpdate();
    }
  }

  public render() {
    return (
      <AuthContext.Provider value={AuthStatus}>
        <Router>
          <div>
            <Navbar color="light" light={true} expand="md" className="fixed-top">
              <NavbarBrand>Robocup Junior</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar={true}>
                <Nav navbar={true}>
                  {
                    routes.map((route, index) => {
                      return (
                        <NavItem key={index}>
                          <Link className="nav-link" to={route.path}>{route.name}</Link>
                        </NavItem>
                      );
                    })
                  }
                  <AuthContext.Consumer>
                    {
                      authContext => authContext.loggedIn ? (
                        <NavItem>
                          <a className="nav-link" onClick={this.logout}>Logout of {authContext.user.name}</a>
                        </NavItem>
                      ) : null
                    }
                  </AuthContext.Consumer>
                </Nav>
              </Collapse>
            </Navbar>
            <Container>
              <Route path="/login" exact={true} component={Login} />
              <Route path="/" exact={true} component={AppRoot} />
              {
                routes.map((route, index) => {
                  return (
                    <PrivateRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.content}
                    />
                  );
                })
              }
            </Container>
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}


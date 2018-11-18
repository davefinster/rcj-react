import * as React from 'react';
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthStatus } from "./AuthContext";
// import Login from "./Login";

export default class PrivateRoute extends React.Component<RouteProps, {}> {

  constructor(props: RouteProps) {
    super(props);
    this.componentRender = this.componentRender.bind(this);
  }

  public componentRender(props: any) {
    if (!this.props.component) {
      return null;
    }
    const authenticated = AuthStatus.loggedIn;
    return (
      authenticated ? <this.props.component {...props} /> : <Redirect to="/login" />
    )
  }

  public render() {
    const { component: Component, ...rest } = this.props;
    const self = this;
    return (
      <Route {...rest} render={self.componentRender} />
    )
  }
}

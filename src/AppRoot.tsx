import * as React from 'react';
import { Redirect, RouteComponentProps } from "react-router-dom";

export default class AppRoot extends React.Component<RouteComponentProps<{}>, {}> {

  public render() {
    return <Redirect to="/dance" />
  }
}

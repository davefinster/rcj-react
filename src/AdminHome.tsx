import * as React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import AdminList from "./AdminList";
import DivisionList from "./DivisionList";
import ImportTeam from "./ImportTeam";
import ScoreSheetList from "./ScoreSheetList";
import ScoreSheetNew from "./ScoreSheetNew"
import ScoreSheetTemplateList from "./ScoreSheetTemplateList";
import ScoreSheetTemplateNew from "./ScoreSheetTemplateNew";
import SheetsConfig from "./SheetsConfig";
import TeamDetail from "./TeamDetail";
import TeamList from "./TeamList";
import TeamNew from "./TeamNew";
import UserList from "./UserList";

const routes = [
  {
    content: AdminList,
    exact: true,
    path: ""
  }, {
    content: ScoreSheetList,
    exact: true,
    path: "score_sheets"
  }, {
    content: ScoreSheetNew,
    exact: true,
    path: "score_sheets/new"
  }, {
    content: DivisionList,
    exact: true,
    path: "divisions"
  }, {
    content: TeamList,
    exact: true,
    path: "teams"
  }, {
    content: TeamNew,
    exact: true,
    path: "teams/new"
  }, {
    content: TeamDetail,
    exact: true,
    path: "teams/:id"
  }, {
    content: ScoreSheetTemplateList,
    exact: true,
    path: "templates"
  }, {
    content: ScoreSheetTemplateNew,
    exact: true,
    path: "templates/new"
  }, {
    content: UserList,
    exact: true,
    path: "users"
  }, {
    content: ImportTeam,
    exact: true,
    path: "sync"
  }, {
    content: SheetsConfig,
    exact: true,
    path: "sheets"
  }
];

export default class AdminHome extends React.Component<RouteComponentProps<{}>, {}> {

  public render() {
    const self = this;
    return (
      <Switch>
        {
          routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path.length > 0 ? self.props.match.url + "/" + route.path : self.props.match.url}
                exact={route.exact}
                component={route.content}
              />
            );
          })
        }
      </Switch>
    )
  }
}


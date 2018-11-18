import * as React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import DanceLadder from "./DanceLadder";
import ScoreSheetCreate from "./ScoreSheetCreate";
import ScoreSheetDetail from "./ScoreSheetDetail";

const routes = [{
  content: DanceLadder,
  exact: true,
  path: ""
}, {
  content: ScoreSheetCreate,
  exact: true,
  path: ":divisionId/:type/new"
}, {
  content: ScoreSheetDetail,
  exact: true,
  path: ":divisionId/:type/:id"
}];

export default class DanceHome extends React.Component<RouteComponentProps<{}>, {}> {

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

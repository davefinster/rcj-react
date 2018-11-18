import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { AuthStatus } from "./AuthContext";
import { GetCurrentUserRequest, GetCurrentUserResponse } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service";
import { RobocupApp } from "./RobocupApp";

interface IAppState {
  checkingLogin: boolean
}

interface ILoginUser {
  id: string
  name: string
  username: string
}

class App extends React.Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      checkingLogin: false
    }
    this.checkLogin = this.checkLogin.bind(this);
  }

  public componentWillMount() {
    this.checkLogin()
  }

  public checkLogin() {
    this.setState({
      checkingLogin: true
    })
    const req = new GetCurrentUserRequest();
    const client = new RobocupClient("");
    client.getCurrentUser(req, (err, resp) => {
      if ((resp == null) || (err !== null)) {
        AuthStatus.setLoggedIn(false);
        this.setState({
          checkingLogin: false,
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
      this.setState({
        checkingLogin: false,
      })
    })
  }

  public render() {
    const self = this;
    if (self.state.checkingLogin) {
      return null
    } else {
      return <RobocupApp />
    }
  }
}

export default App;

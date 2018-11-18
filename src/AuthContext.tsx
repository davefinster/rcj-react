import * as React from 'react';

interface IUser {
  name: string
  username: string
  id: string
}

interface IAuthStatus {
  loggedIn: boolean
  user: IUser
  setLoggedIn: (loggedIn: boolean) => void
  setUser: (user: IUser) => void
  changedCallback?: () => void
}

export const AuthStatus: IAuthStatus = {
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {
    AuthStatus.loggedIn = loggedIn
    if (AuthStatus.changedCallback) {
      AuthStatus.changedCallback()
    }
  },
  setUser: (user: IUser) => {
    AuthStatus.user = user;
    if (AuthStatus.changedCallback) {
      AuthStatus.changedCallback()
    }
  },
  user: {
    id: "",
    name: "",
    username: ""
  },
}

export const AuthContext = React.createContext(AuthStatus);


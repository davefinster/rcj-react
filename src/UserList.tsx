import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { CreateUserRequest, CreateUserResponse, GetUsersRequest, GetUsersResponse, UpdateUserRequest, UpdateUserResponse, User } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service"

interface IApiUser {
  id: string
  name: string
  username: string
  isAdmin: boolean
  password: string
}

interface IUserListState {
  newModalOpen: boolean
  users: IApiUser[]
  newUser?: IApiUser
}

interface IUserCreateBody {
  name: string
  username: string
  isAdmin: boolean
  password?: string
}

export default class UserList extends React.Component<RouteComponentProps<{}>, IUserListState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      newModalOpen: false,
      users: []
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.updateNewUser = this.updateNewUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.fetchUsersGrpc = this.fetchUsersGrpc.bind(this);
    this.saveUserGrpc = this.saveUserGrpc.bind(this);
  }

  public componentWillMount() {
    this.fetchUsersGrpc()
  }

  public openModal() {
    this.setState({
      newModalOpen: true,
      newUser: {
        id: "",
        isAdmin: false,
        name: "",
        password: "",
        username: "",
      }
    });
  }

  public editUser(event: React.MouseEvent<HTMLAnchorElement>) {
    const parts = event.currentTarget.id.split("-");
    const index = parseInt(parts[parts.length - 1], 10);
    this.setState({
      newModalOpen: true,
      newUser: this.state.users[index]
    })
  }

  public closeModal() {
    this.setState({
      newModalOpen: false,
    });
  }

  public fetchUsersGrpc() {
    const req = new GetUsersRequest();
    const client = new RobocupClient("");
    client.getUsers(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      const users: IApiUser[] = resp.getUsersList().map((user) => {
        return {
          id: user.getId(),
          isAdmin: user.getIsAdmin(),
          name: user.getName(),
          password: "",
          username: user.getUsername(),
        }
      });
      this.setState({
        users,
      })
    })
  }

  public fetchUsers() {
    return fetch("/api/user", {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
    }).then((response) => {
      return response.json();
    }).then((response: IApiUser[]) => {
      this.setState({
        users: response,
      });
    })
  }

  public updateNewUser(event: React.FormEvent<HTMLInputElement>) {
    if (!this.state.newUser) {
      return null;
    }
    const updatedUser = Object.assign({}, this.state.newUser)
    if (event.currentTarget.id === "name") {
      updatedUser.name = event.currentTarget.value;
    } else if (event.currentTarget.id === "username") {
      updatedUser.username = event.currentTarget.value;
    } else if (event.currentTarget.id === "password") {
      updatedUser.password = event.currentTarget.value;
    } else if (event.currentTarget.id === "is-admin") {
      updatedUser.isAdmin = event.currentTarget.checked;
    }
    this.setState({
      newUser: updatedUser
    })
    return null;
  }

  public saveUserGrpc() {
    if (!this.state.newUser) {
      return;
    }
    const self = this;
    const protoUser = new User();
    protoUser.setName(this.state.newUser.name);
    protoUser.setUsername(this.state.newUser.username);
    protoUser.setIsAdmin(this.state.newUser.isAdmin);
    if ((this.state.newUser.password) && (this.state.newUser.password.length > 0)) {
      protoUser.setPassword(this.state.newUser.password);
    }
    const client = new RobocupClient("");
    if ((this.state.newUser.id) && (this.state.newUser.id.length > 0)) {
      protoUser.setId(this.state.newUser.id);
      const req = new UpdateUserRequest();
      req.setUser(protoUser);
      client.updateUser(req, (err, resp) => {
        self.closeModal();
        self.fetchUsersGrpc();
      })
    } else {
      const req = new CreateUserRequest();
      req.setUser(protoUser);
      client.createUser(req, (err, resp) => {
        self.closeModal();
        self.fetchUsersGrpc();
      })
    }
  }

  public saveUser() {
    if (!this.state.newUser) {
      return null;
    }
    let url = "/api/user";
    let method = "POST";
    if ((this.state.newUser.id) && (this.state.newUser.id.length > 0)) {
      url = `/api/user/${this.state.newUser.id}`;
      method = "PUT";
    }
    const body: IUserCreateBody = {
      isAdmin: this.state.newUser.isAdmin,
      name: this.state.newUser.name,
      username: this.state.newUser.username
    }
    if ((this.state.newUser.password) && (this.state.newUser.password.length > 0)) {
      body.password = this.state.newUser.password;
    }
    const self = this;
    return fetch(url, {
      body: JSON.stringify(body),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method,
    }).then((response) => {
      return response.json()
    }).then((response: IApiUser) => {
      self.closeModal();
      self.fetchUsers();
      return response;
    });
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>Users</h3>
        </Col>
        <Col md="4" />
        <Col md="4" style={{ textAlign: "right" }}>
          <Button color="primary" size="sm" onClick={self.openModal}>Add</Button>
        </Col>
      </Row>
    ), (
      <Row key={1}>
        <Col md="12">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {
                self.state.users.map((user, index) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <a onClick={self.editUser} id={`user-${index}`}>{user.name}</a>
                      </td>
                      <td>{user.username}</td>
                      <td>{user.isAdmin ? "Yes" : "No"}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    ), (
      <Modal isOpen={self.state.newModalOpen} toggle={self.closeModal} key={2}>
        <ModalHeader toggle={self.closeModal}>
          New User
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row={true}>
              <Label sm={2} for="division-name">Name</Label>
              <Col sm={10}>
                <Input type="text" name="name" id="name" value={self.state.newUser ? self.state.newUser.name : ""} onChange={this.updateNewUser} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label sm={2} for="division-league">Username</Label>
              <Col sm={10}>
                <Input type="text" name="username" id="username" value={self.state.newUser ? self.state.newUser.username : ""} onChange={this.updateNewUser} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label sm={2} for="division-league">Password</Label>
              <Col sm={10}>
                <Input type="password" name="password" id="password" value={self.state.newUser ? self.state.newUser.password : ""} onChange={this.updateNewUser} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label sm={2} for="division-league">Is Admin</Label>
              <Col sm={10}>
                <FormGroup check={true}>
                  <Label check={true}>
                    <Input type="checkbox" id="is-admin" onChange={this.updateNewUser} checked={self.state.newUser ? self.state.newUser.isAdmin : false} />
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.saveUserGrpc}>Save</Button>
          <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )]
  }
}

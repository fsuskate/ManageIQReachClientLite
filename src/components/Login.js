import React from 'react';
import { UserAuthContext } from '../App'
import { Form, Button } from 'react-bootstrap';
import "./Login.css";
import { Redirect } from 'react-router';
import UserService from '../services/UserService'
import AuthService from '../services/AuthService'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectToHome: false
    };       
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setUsername(data) {
    this.setState({username: data});
  }

  setPassword(data) {
    this.setState({password: data});
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;        
  }

  handleSubmit(event) {
    event.preventDefault(); 

    // Convert to base 64 Basic auth string
    var auth = 'Basic ' + new Buffer(this.state.username + ':' + this.state.password).toString('base64');

    // Set the global basic auth string for use in the AuthService
    UserAuthContext.Consumer.basicAuthToken = auth

    // Authenticate
    let authService = new AuthService()
    authService.authenticate(UserAuthContext.Consumer.basicAuthToken, (data) => {
      UserAuthContext.Consumer.apiToken = data.auth_token

      UserService.getUsers(UserAuthContext.Consumer.apiToken, this.state.username, this.props.history, (data) => {
        // Set the user id for use in services
        UserAuthContext.Consumer.user = data.resources[0]
        localStorage.setItem("user", JSON.stringify(data.resources[0]))
        localStorage.setItem("apiToken", UserAuthContext.Consumer.apiToken)
        this.setState({redirectToHome: true})
      })
    })
  }
  
  render() {
    const redirectToHome = this.state.redirectToHome;
    if (redirectToHome === true) {
        return <Redirect to="/service" />
    }

    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Okta Id</Form.Label>
          <Form.Control 
            value={this.state.username} 
            onChange={e => this.setUsername(e.target.value)} />
          </Form.Group>
      
          <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
            value={this.state.password} 
            onChange={e => this.setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!this.validateForm()}>
          Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
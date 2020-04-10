import React from 'react';
import { Form, Button } from 'react-bootstrap';
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };       
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setEmail(data) {
    this.setState({
      email: data
    });
  }

  setPassword(data) {
    this.setState({
      password: data
    });
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;        
  }

  handleSubmit(event) {
    event.preventDefault(); 

    alert("Username: " + this.state.email + "\nPassword: " + this.state.password);
  }
  
  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" 
            placeholder="Enter email" 
            value={this.state.email} 
            onChange={e => this.setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>
      
          <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" 
            placeholder="Password" 
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
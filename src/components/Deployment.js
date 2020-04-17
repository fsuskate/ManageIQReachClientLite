import React from 'react'
import { Form, Button } from 'react-bootstrap'
import "./Deployment.css"
import { Redirect } from 'react-router'
import CatalogService from "../services/CatalogService"
import AuthService from "../services/AuthService"

class Deployment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      cpu: "",
      memory: "",
      disk: "",
      redirectToHome: false
    };       
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.cpu.length > 0 && this.state.memory.length > 0 && this.state.disk.length > 0;        
  }

  handleSubmit(event) {
    event.preventDefault(); 
    
    alert("Deploying")

    let authService = new AuthService()
    authService.authenticate((data) => {
      this.setState({ token: data.auth_token }, this.doProvision)
    })        
  }

  doProvision() {
    CatalogService.postProvisionTemplate(this.state.token, ()  => {
      this.setState({redirectToHome: true})
    })
  }

  componentDidMount() {
    console.log("componentDidMount")
  
    let templateId = this.props.location.search
    templateId = templateId.split("=").pop()
    this.setState({templateId: templateId})
  }
  
  render() {
    const redirectToHome = this.state.redirectToHome;
    if (redirectToHome === true) {
        return <Redirect to="/service" />
    }

    return (
      <div className="Deployment">
        <Form onSubmit={this.handleSubmit}>
          <h1>{this.state.templateId}</h1>
          <Form.Group controlId="formCpu">
          <Form.Label>Cpu</Form.Label>
          <Form.Control 
            value={this.state.username} 
            onChange={e => this.setState({cpu: e.target.value}) } />
          </Form.Group>
      
          <Form.Group controlId="formMemory">
          <Form.Label>Memory</Form.Label>
          <Form.Control 
            value={this.state.memory} 
            onChange={e => this.setState({memory: e.target.value}) } />
          </Form.Group>

          <Form.Group controlId="formDisk">
          <Form.Label>Disk</Form.Label>
          <Form.Control 
            value={this.state.disk} 
            onChange={e => this.setState({disk: e.target.value}) } />
          </Form.Group>
      
          <Button variant="primary" type="submit" disabled={!this.validateForm()}>
            Deploy
          </Button>          
        </Form>
      </div>
    );
  }
}

export default Deployment;
import React from 'react'
import { Form, Button } from 'react-bootstrap'
import "./Deployment.css"
import { Redirect } from 'react-router'
import CatalogService from "../services/CatalogService"
import AuthService from "../services/AuthService"
import Clock from "./Clock"
import Loading from './Loading'

class Deployment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: null,
      token: "",
      catalogId: "",
      templateId: "",
      serviceName: "",
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
    
    if (window.confirm('Are you sure you wish to deploy this item?')) {
      let authService = new AuthService()
      authService.authenticate((data) => {
        this.setState({ token: data.auth_token }, this.doProvision)
      })        
    }
  }

  doProvision() {
    CatalogService.postProvisionTemplate(this.state, ()  => {
      this.setState({redirectToHome: true})
    })
  }

  componentDidMount() {
    console.log("componentDidMount")
  
    let searchString = this.props.location.search
    let queryElements = searchString.split("=")
    let templateId = queryElements.pop()
    let catalogId = queryElements.pop()
    catalogId = catalogId.substring(0, catalogId.indexOf("&"));
    this.setState({
      templateId: templateId,
      catalogId: catalogId
      }, () => {
      let authService = new AuthService()
      authService.authenticate((data) => {
        this.setState({ token: data.auth_token }, () => {
          CatalogService.getCatalogTemplate(this.state.token, this.state.catalogId, this.state.templateId, (template) => {
            this.setState({template: template})
          })
        })
      })
    })   
  }
  
  render() {
    const redirectToHome = this.state.redirectToHome
    if (redirectToHome === true) {
        return <Redirect to="/service" />
    }

    const template = this.state.template
    if (!template) {
      return (
        <Loading />
      );
    }

    return (
      <div className="Deployment">
        <Form onSubmit={this.handleSubmit}>
          <h2>{template.name}</h2>
          <h6>{template.description}</h6>

          <Form.Group controlId="formTemplate">
          <Form.Label>Template</Form.Label>
          <Form.Control as="select">
            <option>Cent OS</option>
            <option>Ubuntu</option>
            <option>Windows Server 2016</option>
            <option>Windows 10</option>
            <option>Redhat</option>
          </Form.Control>
          </Form.Group>

          <Form.Group controlId="formServiceName">
          <Form.Label>Name</Form.Label>
          <Form.Control             
            value={this.state.serviceName} 
            onChange={e => this.setState({serviceName: e.target.value}) } />
          </Form.Group>

          <Form.Group controlId="formCpu">
          <Form.Label>Cpu</Form.Label>
          <Form.Control 
            type="number"
            min="1"
            max="8"
            step="1"
            value={this.state.cpu} 
            onChange={e => this.setState({cpu: e.target.value}) } />
          </Form.Group>
      
          <Form.Group controlId="formMemory">
          <Form.Label>Memory</Form.Label>
          <Form.Control 
            type="number"
            min="2"
            max="32"
            step="2"
            value={this.state.memory} 
            onChange={e => this.setState({memory: e.target.value}) } />
          </Form.Group>

          <Form.Group controlId="formDisk">
          <Form.Label>Disk</Form.Label>
          <Form.Control 
            type="number"
            min="60"
            max="500"
            step="10"
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
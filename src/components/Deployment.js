import React from 'react'
import { Form, Button } from 'react-bootstrap'
import "./Deployment.css"
import { Redirect } from 'react-router'
import CatalogService from "../services/CatalogService"
import { UserAuthContext } from '../App'
import Loading from './Loading'
import "./Collapsible.css"
import Collapsible from 'react-collapsible';

class Deployment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: null,
      catalogId: "",
      serviceTemplateId: "",
      imageTemplateId: "",
      serviceName: "",
      cpu: "",
      memory: "",
      disk: "",
      redirectToHome: false,
      imageTemplates: null,
      apiToken: ""
    };       
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.cpu.length > 0 && this.state.memory.length > 0 && this.state.disk.length > 0;        
  }

  handleSubmit(event) {
    event.preventDefault(); 
    
    if (window.confirm('Are you sure you wish to deploy this item?')) {
      this.doProvision()
    }
  }

  doProvision() {    
    let apiToken = UserAuthContext.Consumer.apiToken
    CatalogService.postProvisionTemplate(apiToken, this.state, this.props.history, ()  => {
      this.setState({redirectToHome: true})
    })
  }

  componentDidMount() {
    console.log("componentDidMount")
  
    let searchString = this.props.location.search
    let queryElements = searchString.split("=")
    let serviceTemplateId = queryElements.pop()
    let catalogId = queryElements.pop()
    catalogId = catalogId.substring(0, catalogId.indexOf("&"));
    this.setState({
      serviceTemplateId: serviceTemplateId,
      catalogId: catalogId
    }, () => {
      CatalogService.getCatalogTemplate(UserAuthContext.Consumer.apiToken, 
        this.state.catalogId, 
        this.state.serviceTemplateId, 
        this.props.history, 
        (template) => {
        this.setState({template: template}, () => {
          CatalogService.getImageTemplates(UserAuthContext.Consumer.apiToken, 
            this.props.history, 
            (imageTemplates) => {
            this.setState({imageTemplates: imageTemplates})
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

    const imageTemplates = this.state.imageTemplates
    if (!imageTemplates || imageTemplates.count <= 0) {
      return (
        <Loading />
      );
    }

    var jsonText = 
`POST URL: 
"/api/service_catalogs/${this.state.catalogId}/service_templates/"

POST BODY:
{
  "action" : "order",
  "resource" : {
    "template" : "${this.state.imageTemplateId}",
    "cpu_size" : "${this.state.cpu}",
    "memory_size" : "${this.state.memory}",
    "disk_size" : "${this.state.disk}",
    "service_name" : "${this.state.serviceName}"
  }          
}`

    return (
      <div className="Deployment">
        <Form onSubmit={this.handleSubmit}>
          <h2>{template.name}</h2>
          <h6>{template.description}</h6>

          <Form.Group controlId="formTemplate">
          <Form.Label>Template</Form.Label>
          <Form.Control as="select" onChange={
            e => this.setState({imageTemplateId: e.target.value})
          }> {
            imageTemplates.resources.map((imageTemplate) => {
              if (imageTemplate.name.indexOf("snapshot") === -1) {
                return <option value={imageTemplate.id}>
                  {imageTemplate.name}
                </option> 
              } 
            })
          }
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

          <Collapsible trigger="API Code">
            <pre style={{color: "green", backgroundColor: "black", font: "1.0rem Inconsolata, monospace"}}>
              {jsonText}
            </pre>
          </Collapsible>            
        </Form>        
      </div>
    );
  }
}

export default Deployment;
import React from "react"
import "./Service.css"
import Loading from "./Loading"
import ServicesService from "../services/ServicesService"
import { UserAuthContext } from "../App"
import { Button } from 'react-bootstrap'

class Service extends React.Component {
  constructor() {
    super();
    this.state = {
      resources : "",
      token : ""
    }
  }

  componentDidMount() {
    let user = UserAuthContext.Consumer.user
    let apiToken = UserAuthContext.Consumer.apiToken
    ServicesService.getServices(apiToken, user, this.props.history, (result) => {
      this.setState( {resources: result.resources})
    })
  }
      
  render() {    
    const {resources} = this.state;
    console.log(resources)
    
    if (!resources) {
      return (
        <Loading />
      );
    }

    const renderedResourcesList = resources.map((resource) => {
      return (
        <div className="card mx-auto" style={{"margin" : "8px"}} key={resource.id}>
        <div className="card-header"><b>{resource.name}</b></div>
        <div className="card-body">          
          <h6 className="card-subtitle mb-2 text-muted">Id: {resource.id}
            <Button className="btn btn-primary btn-sm float-right" onClick={() => {
                this.props.history.push(`/service_details?serviceId=${resource.id}`)}
              }>
              Details
            </Button>
          </h6>  
          <h6 className="card-subtitle mb-2 text-muted">Description: {resource.description}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Service Template: {resource.service_template_id}</h6> 
        </div>
    </div>);
    });

    return (
      <div className="Service">
        {renderedResourcesList}        
      </div>
    );
  }
}

export default Service;
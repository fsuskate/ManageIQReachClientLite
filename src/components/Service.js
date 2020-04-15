import React from "react";
import "./Service.css";
import Clock from "./Clock";
import AuthService from "../services/AuthService";
import ServicesService from "../services/ServicesService";
import { UserAuthContext } from '../App'

class Service extends React.Component {
  constructor() {
    super();
    this.state = {
      resources : "",
      token : ""
    }
  }

  componentDidMount() {
    console.log("componentDidMount")
    // Call static function authenticate passing in a callback that sets the token and gets the catalogs
    let authService = new AuthService()
    authService.authenticate((data) => {
      this.setState({token : data.auth_token}, () => { 
        console.log(this.state)
        if (this.state.token) {
          ServicesService.getServices(this.state.token, (result) => {
            this.setState( {resources: result.resources})
          })
        }
      })
    })
  }

  render() {    
    const {resources} = this.state;
    console.log(resources)
    console.log("userAuth: " + UserAuthContext.Provider)

    if (!resources) {
      return (
        <div className="Service">
          <div className="lander">
            <h1>Loading</h1>            
            <Clock />
          </div>
        </div>
      );
    }

    const renderedResourcesList = resources.map((resource, index) => {
      return (
        <div className="card mx-auto" style={{"margin" : "8px"}} key={resource.id}>
        <div className="card-header"><b>{resource.name}</b></div>
        <div className="card-body">          
          <h6 className="card-subtitle mb-2 text-muted">Id: {resource.id}
            <a role="button" className="btn btn-primary btn-sm float-right" href={`/service_details?serviceId=${resource.id}`}>
              Details
            </a>
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
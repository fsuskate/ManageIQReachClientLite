import React from "react"
import "./Service.css"
import Loading from "./Loading"
import AuthService from "../services/AuthService"
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
    console.log("componentDidMount")
    // Call static function authenticate passing in a callback that sets the token and gets the catalogs
    let authService = new AuthService()
    authService.authenticate(UserAuthContext.Consumer.basicAuthToken, (data) => {
      this.setState({token : data.auth_token}, () => { 
        console.log(this.state)
        if (this.state.token) {
          let user = UserAuthContext.Consumer.user
          ServicesService.getServices(this.state.token, user, (result) => {
            this.setState( {resources: result.resources})
          })
        }
      })
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
import React from "react";
import "./Home.css";
import Clock from "./Clock";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      resources : "",
      token : ""
    }
  }

  authenticate() {
    console.log("authenticate")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic ZnM3MzA1MDY6RnJhbmNvaXMyMyE=");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://miq-db-12.lvn.broadcom.net/api/auth", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result) {
          this.setState({token : result.auth_token}, () => { 
            console.log(this.state)
            if (this.state.token) {
              this.getServices()
            }
          })
        }        
      })
      .catch(error => console.log('error', error));
  }

  getServices() {
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", this.state.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://miq-db-12.lvn.broadcom.net/api/services?expand=resources", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        console.log(result.resources)
        console.log(result.resources[0])
        this.setState( {resources: result.resources})
      })
      .catch(error => console.log('error', error));
  }

  componentDidMount() {
    console.log("componentDidMount")
    this.authenticate()
  }

  render() {    
    const {resources} = this.state;
    console.log(resources)

    if (!resources) {
      return (
        <div className="Home">
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
          <h6 className="card-subtitle mb-2 text-muted">Id: {resource.id}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Description: {resource.description}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Service Template: {resource.service_template_id}</h6>            
          <h6 className="card-subtitle mb-2 text-muted" style={{"font-size": "70%"}}>
            Actions: 
              {resource.actions.map((action, index) => 
                { 
                  return <li key={action.method+action.name+action.href}><a href={action.href}>{action.name}</a></li> })
                }
          </h6>            
        </div>
    </div>);
    });

    return (
      <div className="Home">
        {renderedResourcesList}        
      </div>
    );
  }
}

export default Home;
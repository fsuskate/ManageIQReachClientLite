import React from "react";
import "./Catalog.css";
import Clock from "./Clock";
import Auth from "./Authenticate";

class Catalog extends React.Component {
  constructor() {
    super();
    this.state = {
      catalogs : "",
      templatesToCatalog : "",
      token : ""
    }
  }

  getCatalogs() {
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", this.state.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://miq-db-12.lvn.broadcom.net/api/service_catalogs?expand=resources", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState( {catalogs: result.resources}, () => {
          this.state.catalogs.forEach((catalog) => {
            this.getCatalogTemplates(catalog.id)
          })
        })
      })
      .catch(error => console.log('error', error));
  }

  getCatalogTemplates(catalogId) {
    console.log("getCatalogTemplates")
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", this.state.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var url = "https://miq-db-12.lvn.broadcom.net/api/service_catalogs/" + catalogId + "/service_templates?expand=resources"
    console.log(url)
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        var templatesToCatalog = {}
        this.state.catalogs.map((catalog, index) => {
          var template = result.resources.map((template, index) => { 
            return template.service_template_catalog_id === catalog.id ? template : null
          })
          console.log("catalog id: " + catalog.id + " template: " + template)
          templatesToCatalog[catalog.id] = template
        })        
      
        this.setState( {templatesToCatalog: templatesToCatalog})
      })
      .catch(error => console.log('error', error));
  }

  componentDidMount() {
    console.log("componentDidMount")
    // Call static function authenticate passing in a callback that sets the token and gets the catalogs
    Auth.authenticate((data) => {
      this.setState({token : data.auth_token}, () => { 
        console.log(this.state)
        if (this.state.token) {
          this.getCatalogs()          
        }
      })
    })
  }

  render() {    
    const {catalogs} = this.state;
    const {templatesToCatalog} = this.state
    console.log(catalogs)
    console.log(templatesToCatalog)

    if (!catalogs || !templatesToCatalog) {
      return (
        <div className="Catalog">
          <div className="lander">
            <h1>Loading</h1>            
            <Clock />
          </div>
        </div>
      );
    }

    const renderedResourcesList = catalogs.map((catalog, index) => {
      return (
        <div className="card mx-auto" style={{"margin" : "8px"}} key={catalog.id}>
        <div className="card-header"><b>{catalog.name}</b></div>
        <div className="card-body">          
          <h6 className="card-subtitle mb-2 text-muted">Id: {catalog.id}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Description: {catalog.description}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Tenant Id: {catalog.tenant_id}</h6>      
          <h6 className="card-subtitle mb-2 text-muted" style={{"font-size": "70%"}}>
            Templates: 
              {templatesToCatalog[catalog.id].map((template, index) => 
                { 
                  return template != null ? <li key={template.guid}><a href={template.href}>{template.name}</a></li> : null }) 
                }
          </h6>  
        </div>
    </div>);
    });

    return (
      <div className="Catalog">
        {renderedResourcesList}        
      </div>
    );
  }
}

export default Catalog;
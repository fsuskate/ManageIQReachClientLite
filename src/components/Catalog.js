import React from "react";
import "./Catalog.css";
import Clock from "./Clock";
import Auth from "../services/Authenticate";

class Catalog extends React.Component {
  constructor() {
    super();
    this.state = {
      catalogs : "",
      templatesToCatalog : {},
      token : "",
      loading : true
    }
  }

  getCatalogs() {
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", this.state.token);
    console.log(myHeaders)

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
    console.log("getCatalogTemplates for " + catalogId)
    var myHeaders = new Headers();
    console.log(myHeaders)
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
        var templatesToCatalog = this.state.templatesToCatalog
        templatesToCatalog[catalogId] = []
        this.setState( {templatesToCatalog: templatesToCatalog}, () => {
          result.resources.forEach((template) => {             
            templatesToCatalog[catalogId].push(template)
          })        
        })        
        this.setState( {templatesToCatalog: templatesToCatalog} )
        if (Object.keys(templatesToCatalog).length === this.state.catalogs.length) {
          this.setState({loading: false})
        }
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
    var catalogs = this.state.catalogs
    var templatesToCatalog = this.state.templatesToCatalog
    console.log(catalogs)
    console.log(templatesToCatalog)

    if (this.state.loading) {
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
            <h6 className="card-subtitle mb-2 text-muted" style={{"fontSize": "100%"}}>
              <ul className="list-group">
                {
                  templatesToCatalog[catalog.id].map((template, index) => { 
                    return <li className="list-group-item" key={template.guid}>{template.name}</li>
                  }) 
                }
              </ul>
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
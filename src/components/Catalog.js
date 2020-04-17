import React from "react";
import "./Catalog.css";
import Clock from "./Clock";
import AuthService from "../services/AuthService";
import CatalogService from "../services/CatalogService";
import { Button } from 'react-bootstrap'

class Catalog extends React.Component {
  constructor() {
    super();
    this.state = {
      catalogs: "",
      templatesToCatalog: {},
      token: "",
      loading: true      
    }
    this.doProvision = this.doProvision.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount")
    let authService = new AuthService()
    authService.authenticate((data) => {
      this.setState({ token: data.auth_token }, this.doGetCatalogs)
    })
  }

  doProvision(id) {
    alert("Deploy " + id)
    let authService = new AuthService()
    authService.authenticate((data) => {
      CatalogService.postProvisionTemplate(data.auth_token, ()  => {
        this.setState({redirectToHome: true})
      })
    })    
  }

  doGetCatalogs() {
    console.log(this.state)
    if (this.state.token) {
      CatalogService.getCatalogs(this.state.token, (result) => {
        console.log(result)
        this.setState({ catalogs: result.resources }, this.doGetCatalogTemplates)
      })
    }
  }

  doGetCatalogTemplates() {
    this.state.catalogs.forEach((catalog) => {
      CatalogService.getCatalogTemplates(this.state.token, catalog.id, (result) => {
        console.log(result)
        var templatesToCatalog = this.state.templatesToCatalog
        templatesToCatalog[catalog.id] = []
        this.setState({ templatesToCatalog: templatesToCatalog }, () => {
          result.resources.forEach((template) => {
            templatesToCatalog[catalog.id].push(template)
          })
        })
        this.setState({ templatesToCatalog: templatesToCatalog }, () => {
          if (Object.keys(templatesToCatalog).length === this.state.catalogs.length) {
            this.setState({ loading: false })
          }
        })        
      })
    })
  }  

  render() {
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

    var catalogs = this.state.catalogs
    var templatesToCatalog = this.state.templatesToCatalog
    console.log(catalogs)
    console.log(templatesToCatalog)

    const renderedResourcesList = catalogs.map((catalog, index) => {
      return (
        <div className="card mx-auto" style={{ "margin": "8px" }} key={catalog.id}>
          <div className="card-header"><b>{catalog.name}</b></div>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted" style={{ "fontSize": "100%" }}>
              <ul className="list-group">
                {
                  templatesToCatalog[catalog.id].map((template, index) => {
                    return <li className="list-group-item" key={template.guid}>
                      {template.name}
                      <a role="button" className="btn btn-primary btn-sm float-right" href={`/deploy?catalogId=${catalog.id}&templateId=${template.id}`}>
                        Deploy
                      </a>
                    </li>
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
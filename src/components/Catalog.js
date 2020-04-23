import React from "react"
import "./Catalog.css"
import CatalogService from "../services/CatalogService"
import { UserAuthContext } from '../App'
import Loading from "./Loading"
import { Button } from "react-bootstrap"

class Catalog extends React.Component {
  constructor() {
    super();
    this.state = {
      catalogs: "",
      templatesToCatalog: {},
      loading: true      
    }
    this.doProvision = this.doProvision.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount")
    this.doGetCatalogs()
  }

  getApiToken() {
    if (!UserAuthContext.Consumer.apiToken) {
      this.props.history.push("/login")
    }
    return UserAuthContext.Consumer.apiToken
  }

  doProvision(id) {
    CatalogService.postProvisionTemplate(this.getApiToken(), ()  => {
      this.setState({redirectToHome: true})
    })
  }

  doGetCatalogs() {
    CatalogService.getCatalogs(this.getApiToken(), (result) => {
      console.log(result)
      this.setState({ catalogs: result.resources }, this.doGetCatalogTemplates)
    })
  }

  doGetCatalogTemplates() {
    this.state.catalogs.forEach((catalog) => {
      CatalogService.getCatalogTemplates(this.getApiToken(), catalog.id, (result) => {
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
        <Loading />
      );
    }

    var catalogs = this.state.catalogs
    var templatesToCatalog = this.state.templatesToCatalog
    console.log(catalogs)
    console.log(templatesToCatalog)

    const renderedResourcesList = catalogs.map((catalog) => {
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
                        <Button className="btn btn-primary btn-sm float-right" onClick={() => {
                          this.props.history.push(`/deploy?catalogId=${catalog.id}&serviceTemplateId=${template.id}`)}
                        }>
                      Details
                    </Button>
                      
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
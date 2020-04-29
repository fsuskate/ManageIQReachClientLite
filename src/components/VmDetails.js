import React from 'react'
import "./ServiceDetails.css"
import ServiceService from '../services/ServicesService'
import Loading from './Loading'
import { Dropdown, Breadcrumb } from "react-bootstrap"
import { UserAuthContext } from '../App'

class VmDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceId: "",
      vmId: "",
      vm: null,
      redirectToHome: false
    };
  }

  componentDidMount() {
    let apiToken = UserAuthContext.Consumer.apiToken
    let searchString = this.props.location.search
    let queryElements = searchString.split("=")
    let vmId = queryElements.pop()
    let serviceId = queryElements.pop()
    serviceId = serviceId.substring(0, serviceId.indexOf("&"));
    this.setState(
    {
      serviceId: serviceId, 
      vmId: vmId
    }, () => {
      ServiceService.getVmDetails(apiToken, 
        this.state.serviceId, 
        this.state.vmId,         
        this.props.history, 
        (vm) => {
        this.setState({vm: vm})
      })
    })
  }      
  
  render() {
    const vm = this.state.vm
    if (!vm) {
      return (
        <Loading />
      );
    }


    return (
      <div className="VmDetails">
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => {
            this.props.history.push(`/service`)}}>Services</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => {
            this.props.history.push(`/service_details?serviceId=${this.state.serviceId}`)}}>
            Service Details
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{vm.id}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="card mx-auto" key={vm.id}>
        <div className="card-header"><b><i className="fa fa-laptop"></i>{vm.name}</b></div>
        <div className="card-body">                    
          <ul className="list-group">
            <li className="list-group-item">
              <table className="table table-sm"><tbody><tr><td width="20%">Description:</td><td width="80%">{vm.description}</td></tr></tbody></table>
              <table className="table table-sm"><tbody><tr><td width="20%">Vendor:</td><td width="80%">{vm.vendor}</td></tr></tbody></table>
              <table className="table table-sm"><tbody><tr><td width="20%">IpAddresses:</td><td width="80%">
                {vm.ipaddresses.map((ip) => {return <li>{ip}</li>})}
                </td></tr></tbody>
              </table>
              <table className="table table-sm"><tbody><tr><td width="20%">Created On:</td><td width="80%">{vm.created_on}</td></tr></tbody></table>
              <table className="table table-sm"><tbody><tr><td width="20%">Actions:</td><td width="80%">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    Actions
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Take Snapshot</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Restore Snapshot</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Delete Snapshot</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td></tr></tbody></table>
            </li>
          </ul>
        </div>
        </div>
      </div>
    );
  }
}

export default VmDetails;
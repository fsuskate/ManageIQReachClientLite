import React from 'react'
import "./ServiceDetails.css"
import AuthService from '../services/AuthService'
import ServiceService from '../services/ServicesService'
import Loading from './Loading'
import { UserAuthContext } from '../App'

class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpu: "",
      memory: "",
      disk: "",
      serviceId: "",
      service: null,
      redirectToHome: false
    };
  }

  componentDidMount() {
    console.log("componentDidMount")
  
    let serviceId = this.props.location.search
    serviceId = serviceId.split("=").pop()
    this.setState({serviceId: serviceId}, () => {
      let authService = new AuthService()
      authService.authenticate(UserAuthContext.Consumer.basicAuthToken, (data) => {
        this.setState({ token: data.auth_token }, () => {
          ServiceService.getService(this.state.token, this.state.serviceId, (service) => {
            this.setState({service: service})
          })
        })
      })
    })
  }
  
  render() {
    const service = this.state.service
    if (!service) {
      return (
        <Loading />
      );
    }

    let vms
    if (service.vms) {
      vms = 
      <li className="list-group-item">VMs:
        <ul className="list-group">
            {
              service.vms.map((vm) => {
                return <li className="list-group-item" key={vm.guid}>
                  <i className="fa fa-laptop"></i> {vm.name}                      
                </li>
              })
            }
        </ul>
      </li>
    }

    let dialogOptions
    if (service.options  && service.options.dialog) {
      dialogOptions = <li className="list-group-item">
      <table className="table table-sm text-muted"><tbody><tr><td width="20%">Ems Id:</td><td width="80%">{service.options.dialog.dialog_ems_dropdown}</td></tr></tbody></table>
      <table className="table table-sm text-muted"><tbody><tr><td width="20%">VM Name:</td><td width="80%">{service.options.dialog.dialog_vm_name}</td></tr></tbody></table>
      <table className="table table-sm text-muted"><tbody><tr><td width="20%">CPU:</td><td width="80%">{service.options.dialog.dialog_cpu_size}</td></tr></tbody></table>
      <table className="table table-sm text-muted"><tbody><tr><td width="20%">Memory:</td><td width="80%">{service.options.dialog.dialog_memory_size}</td></tr></tbody></table>
      <table className="table table-sm text-muted"><tbody><tr><td width="20%">Disk:</td><td width="80%">{service.options.dialog.dialog_disk_size}</td></tr></tbody></table>
      <table className="table table-sm text-muted"><tbody><tr><td width="20%">Template:</td><td width="80%">{service.options.dialog.dialog_template}</td></tr></tbody></table>
      <table className="table table-sm text-muted"><tbody><tr><td width="20%">Quota Limits:</td><td width="80%">{service.options.dialog.dialog_quota_limits}</td></tr></tbody></table>
      <table className="table table-sm text-muted"><tbody><tr><td width="20%">Instance Type Id:</td><td width="80%">{service.options.dialog.dialog_instance_type}</td></tr></tbody></table>
      <table className="table table-sm text-muted"><tbody><tr><td width="20%">Price:</td><td width="80%">{service.options.dialog.dialog_total_price}</td></tr></tbody></table>            
    </li>
    }

    return (
      <div className="ServiceDetails">
        <div className="card mx-auto" key={service.id}>
        <div className="card-header"><b>{service.name}</b></div>
        <div className="card-body">                    
          <ul className="list-group">
            <li className="list-group-item">
              <table className="table table-sm"><tbody><tr><td width="20%">Description:</td><td width="80%">{service.description}</td></tr></tbody></table>
              <table className="table table-sm"><tbody><tr><td width="20%">Service Template:</td><td width="80%">{service.service_template_id}</td></tr></tbody></table>
              <table className="table table-sm"><tbody><tr><td width="20%">Owner:</td><td width="80%">{service.evm_owner_id}</td></tr></tbody></table>
              <table className="table table-sm"><tbody><tr><td width="20%">Created On:</td><td width="80%">{service.created_at}</td></tr></tbody></table>
            </li>
            {vms}
            {dialogOptions}
          </ul>
        </div>
        </div>
      </div>
    );
  }
}

export default ServiceDetails;
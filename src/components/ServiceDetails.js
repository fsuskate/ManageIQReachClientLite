import React from 'react'
import "./ServiceDetails.css"
import ServiceService from '../services/ServicesService'
import Loading from './Loading'
import { Button, Breadcrumb } from "react-bootstrap"
import { UserAuthContext } from '../App'

const laptopChar = '\uF109';
const networkChar = '\uF233';  
const fontServerName = "14px Verdana";
const fontAwesomeWidth = 100;
const fontAwesomeHeight = 100;     
const fontAwesomeName = fontAwesomeWidth + 'px FontAwesome';      
const color = "lightgreen";
const lineWidth = 6;
const bottomOffsetY = 30;    

class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      cpu: "",
      memory: "",
      disk: "",
      serviceId: "",
      service: null,
      redirectToHome: false
    };
  }

  /*
  * Waits for FontAwesome to be loaded
  */
  fontAwesomeOnload(callback, failAfterMS){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var ccw, cch;
    var fontsize=36;
    var testCharacter='\uF047';
    ccw = canvas.width = fontsize * 1.5;
    cch = canvas.height = fontsize * 1.5;
    ctx.font = fontsize + 'px FontAwesome';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var startCount = countPix();
    var t1 = performance.now();
    var timeout = t1 + failAfterMS;
    
    requestAnimationFrame(fontOnload);
    
    function fontOnload(time) {
      var currentCount = countPix();
      if(time > timeout) {
          
      } else if (currentCount === startCount){
          requestAnimationFrame(fontOnload);
      } else {
          callback();
      }
    }
    
    function countPix() {
      ctx.clearRect(0, 0, ccw, cch);
      ctx.fillText(testCharacter, ccw/2, cch/2);
      var data = ctx.getImageData(0, 0, ccw, cch).data;
      var count = 0;
      for (var i = 3; i < data.length; i += 4){
          if (data[i] > 10) { 
              count++;
          }
      }
      return(count);
    }
  }

  drawLaptop(ctx, laptopName, laptopX, laptopY, networkX, networkY) {
    ctx.fillStyle = color;
    ctx.font = fontAwesomeName;  
    ctx.fillText(laptopChar, laptopX, laptopY);      
    
    ctx.fillStyle = color;
    ctx.font = fontServerName;    
    ctx.fillText(laptopName, laptopX, laptopY+bottomOffsetY);  
  }

  drawNetwork(ctx, networkName, laptopX, laptopY, networkX, networkY) {
    ctx.fillStyle = color;
    ctx.font = fontAwesomeName;  
    ctx.fillText(networkChar, networkX, networkY); 

    ctx.fillStyle = color;
    ctx.font = fontServerName;    
    ctx.fillText(networkName, networkX, networkY-fontAwesomeHeight);  
  }

  drawNetworkConnection(ctx, laptopX, laptopY, networkX, networkY) {
    var connectionX = networkX+fontAwesomeWidth/2;
    var connectionY = networkY+fontAwesomeHeight/2;
    
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.moveTo(connectionX, networkY);
    ctx.lineTo(connectionX, connectionY);
    ctx.lineTo(laptopX+fontAwesomeWidth/2, connectionY);
    ctx.lineTo(laptopX+fontAwesomeWidth/2, laptopY-fontAwesomeHeight/1.5);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();        
  }

  drawNetworkDiagram() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    var networkX = 20;
    var networkY = fontAwesomeHeight + 30;
    var laptopX = networkX+fontAwesomeWidth;
    var laptopY = networkY+fontAwesomeHeight*1.75;
    var gutter = fontAwesomeWidth/2;
    
    this.drawNetwork(ctx, "Network 0", laptopX, laptopY, networkX, networkY)
    
    for (var i = 0; i <= 4; i++) {
        var laptopName = "Laptop " + i;
        this.drawLaptop(ctx, laptopName, laptopX, laptopY, networkX, networkY);
        this.drawNetworkConnection(ctx, laptopX, laptopY, networkX, networkY)        
        laptopX += fontAwesomeWidth+gutter;
    }
  }

  componentDidUpdate() {
    if (this.canvasRef.current) {
      this.drawNetworkDiagram()
    }
  }

  componentDidMount() {
    console.log("componentDidMount")
    this.fontAwesomeOnload(() => {
      console.log("fonts loaded")
    }, 2000)
    
    let apiToken = UserAuthContext.Consumer.apiToken
    let serviceId = this.props.location.search
    serviceId = serviceId.split("=").pop()
    this.setState({serviceId: serviceId}, () => {
      ServiceService.getService(apiToken, 
        this.state.serviceId, 
        this.props.history, 
        (service) => {
        this.setState({service: service})
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

    console.log("render after loading")
    let vms
    if (service.vms) {
      vms = 
      <li className="list-group-item">VMs:
        <ul className="list-group">
            {
              service.vms.map((vm) => {
                return <li className="list-group-item" key={vm.guid}>
                  <Button className="btn btn-primary" onClick={() => {
                    this.props.history.push(`/vm_details?serviceId=${service.id}&vmId=${vm.id}`)}
                  }>
                  <i className="fa fa-laptop"></i> {vm.name}
                </Button>                    
                </li>
              })
            }
        </ul>
        <ul className="list-group">
          <li className="list-group-item">
            <div>
              <canvas ref={this.canvasRef} style={{backgroundColor: "black", fontFamily:"fontawesome"}} width={680} height={400}></canvas>
            </div>
          </li>
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
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => {
            this.props.history.push(`/service`)}}>Services</Breadcrumb.Item>
          <Breadcrumb.Item active>{service.id}</Breadcrumb.Item>
        </Breadcrumb>
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
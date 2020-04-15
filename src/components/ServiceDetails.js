import React from 'react';
import { Form } from 'react-bootstrap';
import "./ServiceDetails.css";
import { Redirect } from 'react-router';

class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpu: "",
      memory: "",
      disk: "",
      serviceId: "",
      redirectToHome: false
    };
  }

  componentDidMount() {
    let serviceId = this.props.location.search
    serviceId = serviceId.split("=").pop()
    this.setState({serviceId: serviceId})
  }
  
  render() {
    const redirectToHome = this.state.redirectToHome;
    if (redirectToHome === true) {
        return <Redirect to="/service" />
    }

    return (
      <div className="ServiceDetails">
        <h1>{this.state.serviceId}</h1>           
      </div>
    );
  }
}

export default ServiceDetails;
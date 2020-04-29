import FetchService from './FetchService'

class ServicesService {
  static getServices(token, user, history, callback) {
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let url = "/api/services?expand=resources"

    let userId = user.id
    if (userId && userId.length !== "undefined" && userId.length > 0) {
      url = url + "&filter[]=evm_owner_id=" + userId
    } 
    
    FetchService.executeFetch(url, requestOptions, history, callback)
  }

  static getService(token, serviceId, history, callback) {
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let url = "/api/services/" + serviceId + "?expand=vms&attributes=custom_attributes,vms.cloud_network,vms.flavor,vms.ipaddresses,vms.disks,vms.custom_attributes,vms.operating_system"
    FetchService.executeFetch(url, requestOptions, history, callback)
  }

  static getVmDetails(token, serviceId, vmId, history, callback) {
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let url = "/api/services/" + serviceId + "/vms/" + vmId + "?attributes=flavor,ipaddresses,disks,custom_attributes,operating_system"
    FetchService.executeFetch(url, requestOptions, history, callback)
  }
}

export default ServicesService
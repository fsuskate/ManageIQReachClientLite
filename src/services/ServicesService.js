import { UserIdContext } from '../App'

class ServicesService {
  static getServices(token, callback) {
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let url = "/api/services?expand=resources"

    let userId = UserIdContext.Provider
    if (userId && userId.length !== "undefined" && userId.length > 0) {
      url = url + "&filter[]=evm_owner_id=" + userId
    } else {
      url = url + "&filter[]=evm_owner_id=12000000000006" // Hardcode to me for now
    }

    console.log("url: " + url)

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        callback(result)
      })
      .catch(error => console.log('error', error));
  }
}

export default ServicesService
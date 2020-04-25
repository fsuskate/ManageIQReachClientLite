import FetchService from './FetchService'

class UserService {
  static getUsers(token, username, history, callback) {
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let url = "/api/users?expand=resources"

    if (username) {
      url = url + "&filter[]=userid=" + username + "@broadcom.net"
    }

    FetchService.executeFetch(url, requestOptions, history, callback)
  }
}

export default UserService
class UserService {
  static getUsers(token, username, callback) {
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

export default UserService
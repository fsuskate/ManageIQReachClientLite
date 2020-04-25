import FetchService from './FetchService'

class AuthService {
  authenticate(basicAuthToken, callback) {
    console.log("authenticate")
    var myHeaders = new Headers();
    // Debug only, remove in release
    //myHeaders.append("Authorization", "Basic ZnM3MzA1MDY6RnJhbmNvaXMyMyE=");
    myHeaders.append("Authorization", basicAuthToken)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var url = "/api/auth"
    FetchService.executeFetch(url, requestOptions, null, callback)
  }
}

export default AuthService
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

    fetch("/api/auth", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result) {
          callback(result)
        }
      })
      .catch(error => console.log('error', error));
  }
}

export default AuthService
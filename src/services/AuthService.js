import { UserAuthContext } from '../App'

class AuthService {

  authenticate(callback) {
    console.log(UserAuthContext.Provider)
    console.log("authenticate")
    const authToken = UserAuthContext.Provider
    var myHeaders = new Headers();
    // Debug only, remove in release
    myHeaders.append("Authorization", "Basic ZnM3MzA1MDY6RnJhbmNvaXMyMyE=");
    //myHeaders.append("Authorization", authToken)

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
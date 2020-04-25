class FetchService {
  static executeFetch(url, requestOptions, history, callback) {
    console.log("url: " + url)

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.error && result.error.message &&
          result.error.message.indexOf("Invalid Authentication Token") !== -1) {
          history.push('/login')
        }
        callback(result)
      })
      .catch(error => {
        console.log('error', error)
      });
  }
}

export default FetchService
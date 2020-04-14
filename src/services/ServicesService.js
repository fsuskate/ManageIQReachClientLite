class ServicesService {
    static getServices(token, callback) {
        var myHeaders = new Headers();
        myHeaders.append("X-Auth-Token", token);
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        fetch("https://miq-db-12.lvn.broadcom.net/api/services?expand=resources", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            callback(result)
          })
          .catch(error => console.log('error', error));
      }
}

export default ServicesService
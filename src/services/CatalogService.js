class CatalogService {
    static getCatalogs(token, callback) {
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", token);
    console.log(myHeaders)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://miq-db-12.lvn.broadcom.net/api/service_catalogs?expand=resources", requestOptions)
      .then(response => response.json())
      .then(result => {
        callback(result)
      })
      .catch(error => console.log('error', error));
    }
    
    static getCatalogTemplates(token, catalogId, callback) {
      console.log("getCatalogTemplates for " + catalogId)
      var myHeaders = new Headers();
      console.log(myHeaders)
      myHeaders.append("X-Auth-Token", token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      var url = "https://miq-db-12.lvn.broadcom.net/api/service_catalogs/" + catalogId + "/service_templates?expand=resources"
      console.log(url)
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          callback(result)
        })
        .catch(error => console.log('error', error));
      }
}

export default CatalogService
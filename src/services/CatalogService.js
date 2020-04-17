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

    static postProvisionTemplate(token, callback) {
      var myHeaders = new Headers()
      myHeaders.append("x-auth-token", token)
      myHeaders.append("Content-Type", "text/plain");

      var payload = {
        "action": "order",
        "resource": {
          "href": "https://miq-db-12.lvn.broadcom.net/api/service_catalogs/12000000000002/service_templates/12000000000011",
          "ems_dropdown": "12000000000015",
          "template": "12000000000538",
          "cpu_size": 1,
          "memory_size": 4,
          "disk_size": 60,
          "service_name": "Francis-Test-Centos-Networking-24",
          "vm_name": "renbdl",
          "instance_type": 12000000000401    
        }
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: 'follow'
      };

      fetch("/api/service_catalogs/12000000000002/service_templates/12000000000011", requestOptions)
        .then(response => response.text())
        .then(result => {
          callback(result)
        })
        .catch(error => {
          console.log('error', error)
        });
    }
}

export default CatalogService
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

      fetch("/api/service_catalogs?expand=resources", requestOptions)
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

      var url = "/api/service_catalogs/" + catalogId + "/service_templates?expand=resources"
      console.log(url)
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          callback(result)
        })
        .catch(error => console.log('error', error));
    }

    static getCatalogTemplate(token, catalogId, templateId, callback) {
      console.log("getCatalogTemplate for " + templateId)
      var myHeaders = new Headers();
      console.log(myHeaders)
      myHeaders.append("X-Auth-Token", token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      var url = "/api/service_catalogs/" + catalogId + "/service_templates/" + templateId
      console.log(url)
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          callback(result)
        })
        .catch(error => console.log('error', error));
    }

    static postProvisionTemplate(token, params, callback) {
      var myHeaders = new Headers()
      myHeaders.append("x-auth-token", token)
      myHeaders.append("Content-Type", "text/plain");

      let href_url = "/api/service_catalogs/" + params.catalogId + "/service_templates/" + params.serviceTemplateId
      var payload = {
        "action": "order",
        "resource": {
          "href": href_url,
          "ems_dropdown": "12000000000015",
          "template": params.imageTemplateId,
          "cpu_size": params.cpu,
          "memory_size": params.memory,
          "disk_size": params.disk,
          "service_name": params.serviceName,
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

      let post_url = "/api/service_catalogs/" + params.catalogId + "/service_templates/"
      fetch(post_url, requestOptions)
        .then(response => response.text())
        .then(result => {
          callback(result)
        })
        .catch(error => {
          console.log('error', error)
        });
    }

    static getImageTemplates(token, callback) {
      console.log("getImageTemplates")
      var myHeaders = new Headers();
      console.log(myHeaders)
      myHeaders.append("X-Auth-Token", token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      var url = "/api/templates?expand=resources&filter[]=template=true&filter[]=publicly_available=true"
      
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
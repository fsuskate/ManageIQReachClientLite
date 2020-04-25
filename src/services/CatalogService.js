import FetchService from './FetchService'

class CatalogService {
    static getCatalogs(token, history, callback) {
      var myHeaders = new Headers();
      myHeaders.append("X-Auth-Token", token);
      console.log(myHeaders)

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      var url = "/api/service_catalogs?expand=resources"
      FetchService.executeFetch(url, requestOptions, history, callback)
    }
    
    static getCatalogTemplates(token, catalogId, history, callback) {
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
      FetchService.executeFetch(url, requestOptions, history, callback)
    }

    static getCatalogTemplate(token, catalogId, templateId, history, callback) {
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
      FetchService.executeFetch(url, requestOptions, history, callback)
    }

    static postProvisionTemplate(token, params, history, callback) {
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
      FetchService.executeFetch(post_url, requestOptions, history, callback)
    }

    static getImageTemplates(token, history, callback) {
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
      FetchService.executeFetch(url, requestOptions, history, callback)
    }
}

export default CatalogService
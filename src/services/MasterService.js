export class MasterService {

  static BASE_URL = 'http://3.108.234.164:9090/sonali/api/v1/master/';
  //static BASE_URL = 'http://localhost:9090/sonali/api/v1/master/';

    getDistinctBrand() {
        return fetch(MasterService.BASE_URL + 'brands', {
          method: 'GET',
          headers: { 
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json'
          },
        })
        .then(response => response.json())
    }

    getDistinctCategories() {
        return fetch(MasterService.BASE_URL + 'categories', {
          method: 'GET',
          headers: { 
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json'
          },
        })
        .then(response => response.json())
    }

    getDistinctSizes() {
        return fetch(MasterService.BASE_URL + 'sizes', {
          method: 'GET',
          headers: { 
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json'
          },
        })
        .then(response => response.json())
    }

    getSuppliers() {
      return fetch(MasterService.BASE_URL + 'suppliers', {
        method: 'GET',
        headers: { 
          'Access-Control-Allow-Origin' : '*',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
  }
}
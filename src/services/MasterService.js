export class MasterService {

    getDistinctBrand() {
        return fetch('http://localhost:9090/sonali/api/v1/master/brands', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
    }

    getDistinctCategories() {
        return fetch('http://localhost:9090/sonali/api/v1/master/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
    }

    getDistinctSizes() {
        return fetch('http://localhost:9090/sonali/api/v1/master/sizes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
    }
}
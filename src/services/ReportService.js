export class ReportService {

  static BASE_URL = 'http://65.2.35.202:9090/sonali/api/v1/reports/';
  //static BASE_URL = 'http://localhost:9090/sonali/api/v1/reports/';



  getStockReport(pCode, pName, selectedBrand, selectedCategory, selectedSize, selectedOFS) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'pCode': pCode,
        'productName': pName,
        'category': selectedCategory,
        'size': selectedSize,
        'brand': selectedBrand,
        'isOfsFlag': selectedOFS
      })
    };

    console.log(requestOptions);

    return fetch(ReportService.BASE_URL + 'stock-report', requestOptions)
      .then(response => response.json());
  }

  getSalesReport(fromDate, toDate, pName, selectedBrand, selectedCategory) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'fromDate': new Date(Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())),
        'toDate': new Date(Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())),
        'productName': pName,
        'category': selectedCategory,
        'brand': selectedBrand
      })
    };

    console.log(requestOptions);

    return fetch(ReportService.BASE_URL + 'sales-report', requestOptions)
      .then(response => response.json());
  }
}
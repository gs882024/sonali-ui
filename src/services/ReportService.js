export class ReportService {
  getStockReport(pCode, pName, selectedBrand, selectedCategory, selectedSize) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'pCode': pCode,
        'productName': pName,
        'category': selectedCategory,
        'size': selectedSize,
        'brand': selectedBrand
      })
    };

    console.log(requestOptions);

    return fetch('http://localhost:9090/sonali/api/v1/reports/stock-report', requestOptions)
      .then(response => response.json());
  }

  getSalesReport(fromDate, toDate, pName, selectedBrand, selectedCategory) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'fromDate': new Date(Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())),
        'toDate': new Date(Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())),
        'productName': pName,
        'category': selectedCategory,
        'brand': selectedBrand
      })
    };

    console.log(requestOptions);

    return fetch('http://localhost:9090/sonali/api/v1/reports/sales-report', requestOptions)
      .then(response => response.json());
  }
}
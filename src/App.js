import './App.css';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                      //core css
import "primeicons/primeicons.css";                                    //icons

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StockReport from './modules/reports/stock-report';
import SalesReport from './modules/reports/sales-report';
import Dashboard from './modules/dashboard';
import Navbar from './components/navbar';

import PurchaseEntry from './modules/purchase/purchase-entry';
import SalesEntry from './modules/sales/sales-entry';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="purchase-entry" element={<PurchaseEntry />} />
        <Route path="sales-entry" element={<SalesEntry />} />
        <Route path="stock-report" element={<StockReport />} />
        <Route path="sales-report" element={<SalesReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

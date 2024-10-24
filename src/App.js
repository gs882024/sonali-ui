import './App.css';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                      //core css
import "primeicons/primeicons.css";                                    //icons

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StockReport from './modules/reports/stock-report';
import SalesReport from './modules/reports/sales-report';
import Dashboard from './modules/dashboard';
import Sales from './modules/sales/sales';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="stock-report" element={<StockReport />} />
        <Route path="sales-report" element={<SalesReport />} />
        <Route path="sales" element={<Sales />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

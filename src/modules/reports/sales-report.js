import React, { useState, useEffect } from "react";
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

import { ReportService } from "../../services/ReportService";
import { MasterService } from "../../services/MasterService";

import { exportExcel } from '../../util/file-util';


export default function SalesReport() {
    const [salesReport, setSalesReport] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [brandsSelectItems, setBrands] = useState([]);
    const [categoriesSelectItems, setCategories] = useState([]);

    const [pName, setPName] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const masterService = new MasterService();
        masterService.getDistinctBrand().then(data => setBrands(data));
        masterService.getDistinctCategories().then(data => setCategories(data));
    }, []);

    const loadSalesReport = async () => {
        const reportService = new ReportService();
        reportService.getSalesReport(fromDate, toDate, pName, selectedBrand, selectedCategory).then(data => setSalesReport(data));
    }

    const onBrandChange = (e) => {
        setSelectedBrand(e.value);
    }

    const onCategoryChange = (e) => {
        setSelectedCategory(e.value);
    }

    const formatCurrency = (e) => {
        return e.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
    };

    const mrpBodyTemplate = (e) => {
        return formatCurrency(e.mrp);
    };

    const netAmtBodyTemplate = (e) => {
        return formatCurrency(e.netAmt);
    };

    const totalAmtBodyTemplate = (e) => {
        return formatCurrency(e.totalAmt);
    };

    const exportXls = () => {
        exportExcel(salesReport);
    }

    const amountTotal = () => {
        let total = 0;

        for (let obj of salesReport) {
            total += obj.totalAmt;
        }

        return formatCurrency(total);
    };

    const qtyTotal = () => {
        let total = 0;

        for (let obj of salesReport) {
            total += obj.qty;
        }

        return total;
    };

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Total:" colSpan={2} footerStyle={{ textAlign: 'right' }} />
                <Column footer={qtyTotal} />
                <Column footer="" />
                <Column footer="" />
                <Column footer={amountTotal} />
                <Column footer="" />
            </Row>
        </ColumnGroup>
    );

    return (
        <div>
            <Card title="Sales Report">

                <div>
                    <Panel header="Search Criteria">
                        <div className="p-fluid grid formgrid">
                            <div className="field col-6 md:col-4">
                                <label htmlFor="fromDate">From Date</label>
                                <span id="fromDate" className="p-calendar p-component p-inputwrapper">
                                    <Calendar value={fromDate} onChange={(e) => setFromDate(e.value)} dateFormat="dd/mm/yy" yearNavigator yearRange="2010:2024"/>
                                </span>
                            </div>

                            <div className="field col-6 md:col-4">
                                <label htmlFor="toDate">To Date</label>
                                <span id="toDate" className="p-calendar p-component p-inputwrapper">
                                    <Calendar value={toDate} onChange={(e) => setToDate(e.value)} dateFormat="dd/mm/yy" yearNavigator yearRange="2010:2024"/>
                                </span>
                            </div>

                            <div className="field col-6 md:col-4">
                                <label htmlFor="brand">Company Name / Brand</label>
                                <Dropdown id="brand" value={selectedBrand} options={brandsSelectItems} onChange={onBrandChange} editable="true" placeholder="Select Brand" />
                            </div>

                            <div className="field col-6 md:col-4">
                                <label htmlFor="pname">Product Name</label>
                                <InputText id="pname" type="text" value={pName} onChange={(e) => setPName(e.target.value)} placeholder="Enter Product Name" />
                            </div>

                            <div className="field col-6 md:col-4">
                                <label htmlFor="category">Item Type / Category</label>
                                <Dropdown id="category" value={selectedCategory} options={categoriesSelectItems} onChange={onCategoryChange} editable="true" placeholder="Select Category" />
                            </div>
                        </div>

                        <Divider />

                        <Button icon="pi pi-search" label="Search" onClick={loadSalesReport} />
                    </Panel>
                </div>

                <br />

                <div>
                    <div className="flex align-items-center justify-content-end gap-2">
                        <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportXls} data-pr-tooltip="XLS" />
                    </div>

                    <div className="card card-padding">
                        <DataTable value={salesReport} footerColumnGroup={footerGroup} scrollable scrollHeight="flex" 
                                showGridlines resizableColumns stripedRows paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
                            <Column field="billDate" header="Bill Date" sortable></Column>
                            <Column field="productName" header="Product Name" sortable></Column>
                            <Column field="qty" header="Quantity Sold" sortable></Column>
                            <Column field="mrp" header="MRP" body={mrpBodyTemplate} sortable></Column>
                            <Column field="netAmt" header="Net Amount" body={netAmtBodyTemplate} sortable></Column>
                            <Column field="totalAmt" header="Total Amount" body={totalAmtBodyTemplate} sortable></Column>
                            <Column field="qoh" header="In Stock" sortable></Column>
                        </DataTable>
                    </div>
                </div>
            </Card>
        </div>
    )
}
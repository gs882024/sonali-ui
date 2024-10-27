import React, { useState, useEffect } from "react";
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

import { ReportService } from "../../services/ReportService";
import { MasterService } from "../../services/MasterService";

import { exportExcel } from '../../util/file-util';


export default function StockReport() {
    const [products, setStockReport] = useState([]);
    const [brandsSelectItems, setBrands] = useState([]);
    const [categoriesSelectItems, setCategories] = useState([]);
    const [sizesSelectItems, setSizes] = useState([]);
    const ofsSelectItems = [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
    ];

    const [pCode, setPCode] = useState('');
    const [pName, setPName] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedOFS, setSelectedOFS] = useState('');

    useEffect(() => {
        const masterService = new MasterService();
        masterService.getDistinctBrand().then(data => setBrands(data));
        masterService.getDistinctCategories().then(data => setCategories(data));
        masterService.getDistinctSizes().then(data => setSizes(data));
        setSelectedOFS(false);
    }, []);

    const loadStockReport = async () => {
        const reportService = new ReportService();
        reportService.getStockReport(pCode, pName, selectedBrand, selectedCategory, selectedSize, selectedOFS).then(data => setStockReport(data));
    }

    const onBrandChange = (e) => {
        setSelectedBrand(e.value);
    }

    const onCategoryChange = (e) => {
        setSelectedCategory(e.value);
    }

    const onSizeChange = (e) => {
        setSelectedSize(e.value);
    }

    const onOFSChange = (e) => {
        setSelectedOFS(e.value);
    }

    const formatCurrency = (e) => {
        return e.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
    };

    const mrpBodyTemplate = (e) => {
        return formatCurrency(e.mrp);
    };

    const exportXls = () => {
        exportExcel(products);
    }

    return (
        <div>
            <Card title="Stock Report">

                <div>
                    <Panel header="Search Criteria">
                        <div className="p-fluid grid formgrid">
                            <div className="field col-6 md:col-4">
                                <label htmlFor="pCode">Code</label>
                                <InputText id="pCode" type="text" value={pCode} onChange={(e) => setPCode(e.target.value)} placeholder="Enter Code" />
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

                            <div className="field col-6 md:col-4">
                                <label htmlFor="size">Item Size</label>
                                <Dropdown id="size" value={selectedSize} options={sizesSelectItems} onChange={onSizeChange} editable="true" placeholder="Select Size" />
                            </div>

                            <div className="field col-6 md:col-4">
                                <label htmlFor="expiry">Expiry</label>
                                <span id="expiry" className="p-calendar p-component p-inputwrapper">
                                    <Calendar dateFormat="dd/mm/yy" yearNavigator yearRange="2010:2030" />
                                </span>
                            </div>

                            <div className="field col-6 md:col-4">
                                <label htmlFor="ofs">Out of Stock</label>
                                <Dropdown id="ofs" value={selectedOFS} options={ofsSelectItems} onChange={onOFSChange} optionLabel="label" editable="true" placeholder="Select Size" />
                            </div>
                        </div>

                        <Divider />

                        <Button icon="pi pi-search" label="Search" onClick={loadStockReport} />
                    </Panel>
                </div>

                <br />

                <div>
                    <div className="flex align-items-center justify-content-end gap-2">
                        <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportXls} data-pr-tooltip="XLS" />
                    </div>

                    <div className="card card-padding">
                        <DataTable value={products} scrollable scrollHeight="flex" showGridlines resizableColumns stripedRows paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
                            <Column field="pCode" header="Code"></Column>
                            <Column field="productName" header="Product Name" sortable></Column>
                            <Column field="category" header="Category" sortable></Column>
                            <Column field="brand" header="Brand" sortable></Column>
                            <Column field="size" header="Size"></Column>
                            <Column field="mrp" header="MRP" body={mrpBodyTemplate}></Column>
                            <Column field="qoh" header="In Stock" sortable></Column>
                        </DataTable>
                    </div>
                </div>
            </Card>
        </div>
    )
}
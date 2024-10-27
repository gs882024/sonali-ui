import React, { useState, useEffect } from "react";
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Divider } from "primereact/divider";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { MasterService } from "../../services/MasterService";

export default function PurchaseEntry() {
    const [supplierSelectItems, setSupplier] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');

    const date = new Date();
    const billNo = 'SON-' + date.getDate().toString() + (date.getMonth() + 1).toString() + date.getFullYear().toString() + '-' + date.getTime().toString();

    useEffect(() => {
        //billNo = 'SON-' + new Date().getDate + new Date().getTime;
        const masterService = new MasterService();
        masterService.getSuppliers().then(data => setSupplier(data));
    }, []);

    const onSupplierChange = (e) => {
        setSelectedSupplier(e.value);
    }

    return (
        <div>
            <Card title="Purchase Entry">
                <Divider />
                <div>
                    <div className="p-fluid grid formgrid">
                        <div className="field col-6 md:col-4">
                            <label htmlFor="supName">Supplier Name</label>
                            <Dropdown id="supName" value={selectedSupplier} options={supplierSelectItems} optionLabel="name" onChange={onSupplierChange} editable="true" placeholder="Select Brand" />
                        </div>

                        <div className="field col-6 md:col-4">
                            <label htmlFor="billNo">Bill No</label>
                            <InputText id="billNo" type="text" value={billNo} disabled />
                        </div>

                        <div className="field col-6 md:col-4">
                            <label htmlFor="billDate">Bill Date</label>
                            <InputText id="billDate" type="text" value={new Date().toDateString()} disabled />
                        </div>
                    </div>
                </div>

                <br />

                <div>
                    <div className="card card-padding">
                        <DataTable editMode="cell">
                            <Column header="Code" />
                            <Column header="Type">
                                <InputText />
                            </Column>
                            <Column header="Brand">
                                <InputText />
                            </Column>
                            <Column header="Product">
                                <InputText />
                            </Column>
                            <Column header="Size">
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                            <Column>
                                <InputText />
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </Card>
        </div>
    )
}
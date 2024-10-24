import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Purchase',
            icon: 'pi pi-star',
            command: () => {
                navigate('/purchase-entry');
            }
        },
        {
            label: 'Sales',
            icon: 'pi pi-star',
            command: () => {
                navigate('/sales-entry');
            }
        },
        {
            label: 'Reports',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Sale Report',
                    icon: 'pi pi-bolt',
                    command: () => {
                        navigate('/sales-report');
                    }

                },
                {
                    label: 'Stock Report',
                    icon: 'pi pi-server',
                    command: () => {
                        navigate('/stock-report');
                    }
                },
            ]
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}

export default Navbar;
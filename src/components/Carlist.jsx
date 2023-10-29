import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import Addcar from './Addcar';
import Editcar from './Editcar';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Carlist() {

    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const [columnDefs] = useState([
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true},
        {field: 'year', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true},
        {
            filter: false,
            sortable: false,
            width: 120,
            cellRenderer: row => <Editcar updateCar={updateCar} car={row.data}/>
        },
        {
            filter: false,
            sortable: false,
            width: 120,
            cellRenderer: params => <Button size="small" onClick={() => deleteCar(params.data._links.car.href)}>Delete</Button>
        }
    ]);

    const fetchCars = () => {
        fetch('https://carrestapi.herokuapp.com/cars')
        .then(response => {
            if (response.ok)
                return response.json();
            else throw new Error("Error in fetch: " + response.statusText);
        })
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const saveCar = (car) => {
        fetch('https://carrestapi.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => fetchCars())
        .catch(err => console.error(err))
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => fetchCars())
        .catch(err => console.error(err))
    }

    const deleteCar = (url) => {
        if (window.confirm("Are you sure?")) {
                fetch(url, { method: 'DELETE'})
                .then(response => {
                if (response.ok)
                    fetchCars();
                else throw new Error("Error in DELETE: " + response.statusText);
            })
            .catch(err => console.error(err))
        }
    }

    return(
        <>
        <Addcar saveCar={saveCar}/>
        <div className="ag-theme-material" style={{ width: '100%', height: 600}}>
            <AgGridReact
                rowData={cars}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                paginationAutoPageSize={true}
            />
        </div>
        </>
    )
}

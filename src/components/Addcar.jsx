import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Addcar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const addCar = () => {
        props.saveCar(car);
        handleClose();
    }

    return(
        <>
        <div>
            <Button style={{margin: 10}} variant="outlined" onClick={handleClickOpen}>
                Add Car
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="brand"
                            value={car.brand}
                            onChange={e => handleInputChange(e)}
                            label="Brand"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="model"
                            value={car.model}
                            onChange={e => handleInputChange(e)}
                            label="Model"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="color"
                            value={car.color}
                            onChange={e => handleInputChange(e)}
                            label="Color"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="year"
                            value={car.year}
                            onChange={e => handleInputChange(e)}
                            label="Year"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="fuel"
                            value={car.fuel}
                            onChange={e => handleInputChange(e)}
                            label="Fuel"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="price"
                            value={car.price}
                            onChange={e => handleInputChange(e)}
                            label="Price"
                            fullWidth
                        />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={addCar}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </>
    )
}
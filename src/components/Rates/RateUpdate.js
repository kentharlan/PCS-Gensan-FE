import { TextField, Typography, Button } from "@mui/material"
import { useState } from "react";
import axios from '../../api/axios'

const UPDATE_RATE_URL = "/rates/update/";

const RateUpdate = (props) => {
    const { rate, setOpenModal } = props
    const initialValues = {
        name: rate.name,
        garage: {
            hourly: rate.garage.hourly,
            three: rate.garage.three,
            six: rate.garage.six,
            twelve: rate.garage.twelve,
            twenty_four: rate.garage.twenty_four
        },
        no_garage: {
            hourly: rate.no_garage.hourly,
            three: rate.no_garage.three,
            six: rate.no_garage.six,
            twelve: rate.no_garage.twelve,
            twenty_four: rate.no_garage.twenty_four
        }
    };
    const [values, setValues] = useState(initialValues)

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleGarageChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            garage: {
                ...values.garage,
                [name]: value
            }
        }));
    }

    const handleNoGarageChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            no_garage: {
                ...values.no_garage,
                [name]: value
            }
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(UPDATE_RATE_URL+rate.rate_id, { ...values });
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                variant="filled"
                label='Rate Name'
                name="name"
                value={values.name}
                onChange={handleInputChange}
                required
                autoComplete='off'
                sx={{ width: "100%", margin: "0 0 2% 0" }}
            />
            <Typography variant="h6" sx={{marginLeft: "1vw"}}>
                With Garage
            </Typography>
            <TextField
                variant="filled"
                label='Hourly'
                name="hourly"
                value={values.garage.hourly}
                onChange={handleGarageChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 1% 2% 0" }}
            />
            <TextField
                variant="filled"
                label='3 Hours'
                name="three"
                value={values.garage.three}
                onChange={handleGarageChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 0 2% 1%" }}
            />
            <TextField
                variant="filled"
                label='6 Hours'
                name="six"
                value={values.garage.six}
                onChange={handleGarageChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 1% 2% 0" }}
            />
            <TextField
                variant="filled"
                label='12 Hours'
                name="twelve"
                value={values.garage.twelve}
                onChange={handleGarageChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 0 2% 1%" }}
            />
            <TextField
                variant="filled"
                label='24 Hours'
                name="twenty_four"
                value={values.garage.twenty_four}
                onChange={handleGarageChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 0 2% 1%" }}
            />
            <Typography variant="h6" sx={{marginLeft: "1vw"}}>
                Without Garage
            </Typography>
            <TextField
                variant="filled"
                label='Hourly'
                name="hourly"
                value={values.no_garage.hourly}
                onChange={handleNoGarageChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 1% 2% 0" }}
            />
            <TextField
                variant="filled"
                label='3 Hours'
                name="three"
                value={values.no_garage.three}
                onChange={handleNoGarageChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 0 2% 1%" }}
            />
            <TextField
                variant="filled"
                label='6 Hours'
                name="six"
                value={values.no_garage.six}
                onChange={handleNoGarageChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 1% 2% 0" }}
            />
            <TextField
                variant="filled"
                label='12 Hours'
                name="twelve"
                value={values.no_garage.twelve}
                onChange={handleNoGarageChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 0 2% 1%" }}
            />
            <TextField
                variant="filled"
                label='24 Hours'
                name="twenty_four"
                value={values.no_garage.twenty_four}
                onChange={handleNoGarageChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 0 2% 1%" }}
            />
            <div style={{ textAlign: "center" }}>
                <Button variant="contained" type="submit" sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </form>
    )
}

export default RateUpdate;
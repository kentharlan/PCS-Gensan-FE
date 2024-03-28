import { TextField, Button, MenuItem, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import axios from '../../api/axios'

const CHECK_IN_URL = "/txn/checkin"
const GET_RATES_URL = '/rates';

const Checkin = (props) => {
    const { room, setOpenModal } = props
    const type = room.type === "garage" ? "With Garage" : "Without Garage";
    const initialValues = {
        room_no: room.room_no,
        rate_id: 1,
        base_time: 3,
        additional_time: 0,
    }
    const [values, setValues] = useState(initialValues);
    const [total, setTotal] = useState(0);
    const [rates, setRates] = useState([]);

    useEffect(() => {
        getRates();
    }, [])

    useEffect(() => {
        calculateTotal(rates);
    }, [values])

    const getRates = async () => {
        try {
            const result = await axios.get(GET_RATES_URL);
            const data = result?.data;
            setRates(data);
            calculateTotal(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const calculateTotal = (Rates) => {
        if (Rates.length < 1) return

        let base_time_name = null;

            switch (values.base_time) {
                case 3:
                    base_time_name = "three";
                    break;
                case 6:
                    base_time_name = "six";
                    break;
                case 12:
                    base_time_name = "twelve";
                    break;
                case 24:
                    base_time_name = "twenty_four";
                    break;
            }
            const rate = Rates.find(r => r.rate_id === values.rate_id);
            const rate_type = rate[room.type];
            const time_rate = rate_type[base_time_name];
            const total = parseInt(time_rate) + (parseInt(rate_type.hourly) * parseInt(values.additional_time));
            setTotal(total);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(CHECK_IN_URL, values);
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">
                Room No: {room.room_no}
            </Typography>
            <Typography variant="h6">
                Room Type: {type}
            </Typography>
            <Typography variant="h6">
                Status: Vacant
            </Typography>
            <TextField
                select
                variant="filled"
                label='Rate'
                name="rate_id"
                value={values.rate_id}
                onChange={handleChange}
                required
                autoComplete='off'
                fullWidth
                sx={{ marginTop: "2%"}}
            >
                {rates.map((rate) => (
                    <MenuItem key={rate.rate_id} value={rate.rate_id}>{rate.name}</MenuItem>
                ))}
            </TextField>
            <TextField
                select
                variant="filled"
                label='Base Time'
                name="base_time"
                value={values.base_time}
                onChange={handleChange}
                required
                autoComplete='off'
                fullWidth
                sx={{ marginTop: "2%" }}
            >
                <MenuItem key={3} value={3}>3</MenuItem>
                <MenuItem key={6} value={6}>6</MenuItem>
                <MenuItem key={12} value={12}>12</MenuItem>
                <MenuItem key={24} value={24}>24</MenuItem>
            </TextField>
            <TextField
                variant="filled"
                type="number"
                label='Additional Time'
                name="additional_time"
                value={values.additional_time}
                onChange={handleChange}
                required
                autoComplete='off'
                fullWidth
                inputProps={{ min: "0" }}
                sx={{ marginTop: "2%", marginBottom: "5%" }}
            />
            <Typography variant="h6">
                Total: {total}
            </Typography>

            <div style={{ textAlign: "center", marginTop: "10%" }}>
                <Button variant="contained" type="submit" sx={{ margin: "0 6px" }}>Check In</Button>
                {/* <Button variant="contained" sx={{ margin: "0 6px" }}>Open Time</Button> */}
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </form>
    )
}

export default Checkin
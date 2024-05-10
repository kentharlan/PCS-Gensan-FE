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
        rate_id: '',
        base_time: 3,
        additional_time: 0,
        extra_towel: 0,
        extra_pillow: 0,
        extra_blanket: 0,
        extra_single_bed: 0,
        extra_double_bed: 0,
        extra_person: 0
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
            setValues(prev => ({
                ...prev,
                rate_id: 1
            }));
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
        const total = parseInt(time_rate)
            + (parseInt(rate_type.hourly) * parseInt(values.additional_time))
            + (parseInt(values.extra_towel) * parseInt(rate.extra_towel))
            + (parseInt(values.extra_pillow) * parseInt(rate.extra_pillow))
            + (parseInt(values.extra_blanket) * parseInt(rate.extra_blanket))
            + (parseInt(values.extra_single_bed) * parseInt(rate.extra_single_bed))
            + (parseInt(values.extra_double_bed) * parseInt(rate.extra_double_bed))
            + (parseInt(values.extra_person) * parseInt(rate.extra_person))
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
        <>
            <table>
                <tr>
                    <td colSpan={2}>
                        <Typography variant="h6">
                            Room No: {room.room_no}
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Typography variant="h6">
                            Room Type: {type}
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Typography variant="h6" style={{marginBottom: "3%"}}>
                            Status: Vacant
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td>
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
                            style={{ marginBottom: "5%" }}
                        >
                            {rates.map((rate) => (
                                <MenuItem key={rate.rate_id} value={rate.rate_id}>{rate.name}</MenuItem>
                            ))}
                        </TextField>
                    </td>
                </tr>
                <tr>
                    <td style={{ width: "50%" }}>
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
                            style={{ marginBottom: "5%" }}
                        >
                            <MenuItem key={3} value={3}>3</MenuItem>
                            <MenuItem key={6} value={6}>6</MenuItem>
                            <MenuItem key={12} value={12}>12</MenuItem>
                            <MenuItem key={24} value={24}>24</MenuItem>
                        </TextField>
                    </td>
                    <td style={{ width: "50%" }}>
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
                            style={{ marginBottom: "5%" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td style={{ width: "50%" }}>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Towels'
                            name="extra_towel"
                            value={values.extra_towel}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            inputProps={{ min: "0" }}
                        />
                    </td>
                    <td style={{ width: "50%" }}>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Pillows'
                            name="extra_pillow"
                            value={values.extra_pillow}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            inputProps={{ min: "0" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Blanket'
                            name="extra_blanket"
                            value={values.extra_blanket}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            fullWidth
                            inputProps={{ min: "0" }}
                        />
                    </td>
                    <td>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Single Bed'
                            name="extra_single_bed"
                            value={values.extra_single_bed}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            fullWidth
                            inputProps={{ min: "0" }}
                        />
                    </td>

                </tr>
                <tr>
                    <td>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Double Bed'
                            name="extra_double_bed"
                            value={values.extra_double_bed}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            fullWidth
                            inputProps={{ min: "0" }}
                        />
                    </td>
                    <td>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Person'
                            name="extra_person"
                            value={values.extra_person}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            fullWidth
                            inputProps={{ min: "0" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Typography variant="h6" style={{marginTop: "3%"}}>
                            Total: ₱ {total}
                        </Typography>

                    </td>
                </tr>
            </table>

            <div style={{ textAlign: "center", marginTop: "5%" }}>
                <Button variant="contained" onClick={handleSubmit} sx={{ margin: "0 6px" }}>Check In</Button>
                {/* <Button variant="contained" sx={{ margin: "0 6px" }}>Open Time</Button> */}
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default Checkin
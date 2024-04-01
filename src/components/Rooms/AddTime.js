import { Button, TextField } from "@mui/material"
import { useState } from "react";
import axios from '../../api/axios'

const UPDATE_URL = "/txn/update";

const AddTime = (props) => {
    const { room_no, transaction_no, rate, setOpenInnerModal, setOpenModal, timed_out } = props; 
    const [values, setValues] = useState({
        additional_time: 0,
        additional_bill: 0
    })

    const handleCheckout = async () => {
        try {
            if (values.additional_time > 0){
                await axios.post(UPDATE_URL, {
                    room_no,
                    transaction_no,
                    timed_out,
                    additional_time: values.additional_time,
                    additional_bill: values.additional_bill
                });
    
                setOpenInnerModal(false)
                if (timed_out) setOpenModal(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setValues({
            additional_time: parseInt(value, 10),
            additional_bill: parseInt(value, 10) * parseInt(rate, 10)
        });
    }

    return (
        <>
            <TextField
                variant="filled"
                type="number"
                label='Additional Time in Hours'
                name="additional_time"
                value={values.additional_time}
                onChange={handleChange}
                required
                autoComplete='off'
                fullWidth
                inputProps={{ min: "0" }}
                sx={{ marginBottom: "12%" }}
            />

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" onClick={() => handleCheckout()} sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenInnerModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default AddTime
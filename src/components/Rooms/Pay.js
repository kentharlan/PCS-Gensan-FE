import { Button, Typography, TextField } from "@mui/material"
import axios from '../../api/axios'
import { useAuthUser } from "react-auth-kit";
import { useState } from "react";

const PAY_URL = "/txn/pay";

const Pay = (props) => {
    const { bill, room, setOpenInnerModal } = props;
    const [amount, setAmount] = useState()
    const auth = useAuthUser();

    const handlePay = async () => {
        try {
            if (amount > 0) {
                await axios.post(PAY_URL, {
                    transaction_no: room.transaction_no,
                    amount: amount,
                    user_id: auth().id
                });
    
                setOpenInnerModal(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;
        if (value > bill) setAmount(bill);
        else setAmount(value);
    }

    return (
        <>
            <Typography variant="h6">
                Bill: ₱ {bill}
            </Typography>
            
            <TextField
                variant="filled"
                type="number"
                label='Enter Amount Paid'  
                name="amount"
                value={amount}
                onChange={handleChange}
                required
                autoComplete='off'
                fullWidth
                inputProps={{ min: "0", max: bill }}
                sx={{ marginTop: "5%", marginBottom: "15%" }}
            />

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" onClick={() => handlePay()} sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenInnerModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default Pay
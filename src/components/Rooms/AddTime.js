import { Button, Typography } from "@mui/material"
import axios from '../../api/axios'

const UPDATE_URL = "/txn/update";

const AddTime = (props) => {
    const { room_no, values, setOpenModal, setOpenInnerModal } = props; 
    const suffix = values.additional_time > 1 ? "hours" : "hour"

    const handleCheckout = async () => {
        try {
            await axios.post(UPDATE_URL, values);
            setOpenInnerModal(false)
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Typography variant="h5" sx={{marginBottom: "12%", textAlign: "center"}}>
                Are you sure you want to Add <b>{values.additional_time}</b> {suffix} to <b>Room {room_no}</b>?
            </Typography>

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" onClick={() => handleCheckout()} sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenInnerModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default AddTime
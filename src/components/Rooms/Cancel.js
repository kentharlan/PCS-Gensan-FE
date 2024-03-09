import { Button, Typography } from "@mui/material"
import axios from '../../api/axios'
import { useAuthUser } from "react-auth-kit";

const CANCEL_URL = "/txn/cancel";

const Cancel = (props) => {
    const { room, setOpenModal, setOpenInnerModal } = props;
    const auth = useAuthUser();

    const handleCheckout = async () => {
        try {
            await axios.post(CANCEL_URL, {
                room_no: room.room_no,
                transaction_no: room.transaction_no,
                user_id: auth().id
            });

            setOpenInnerModal(false)
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Typography variant="h5" sx={{marginBottom: "12%", textAlign: "center"}}>
                Are you sure you want to Cancel <b>Room {room.room_no}</b>?
            </Typography>

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" onClick={() => handleCheckout()} sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenInnerModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default Cancel
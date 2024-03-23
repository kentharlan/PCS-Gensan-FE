import { Button, Typography } from "@mui/material"
import axios from '../../api/axios'
import { useAuthUser } from "react-auth-kit";

const CHECK_OUT_URL = "/txn/checkout";

const CheckOutConfirmation = (props) => {
    const { bill, room_no, setOpenModal, setOpenInnerModal } = props;
    const auth = useAuthUser();

    const handleCheckout = async () => {
        try {
            await axios.post(CHECK_OUT_URL, { room_no, bill, user_id: auth().id  });
            setOpenInnerModal(false);
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            { 
                bill <= 0 ?
                    <Typography variant="h5" sx={{marginBottom: "12%", textAlign: "center"}}>
                        Are you sure you want to Check Out <b>Room {room_no}</b>?
                    </Typography>
                :
                    <>
                    <Typography variant="h5" sx={{textAlign: "center", marginBottom: "5%"}}>
                        Are you sure you want to Check Out <b>Room {room_no}</b> with unpaid bill?
                    </Typography>
                    <Typography variant="h5">
                        Bill: <b style={{color: "red"}}>₱{bill}</b>
                    </Typography>
                    </>
            }
            

            <div style={{ textAlign: "center", marginTop: "12%" }}>
                <Button variant="contained" onClick={() => handleCheckout()} sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenInnerModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default CheckOutConfirmation
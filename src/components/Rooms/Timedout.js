import { Button, Typography } from "@mui/material"
import axios from '../../api/axios'
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

const CHECK_OUT_URL = "/txn/checkout";
const GET_TXN_URL = "/txn/";

const TimedOut = (props) => {
    const { room, setOpenModal } = props
    const [ bill, setBill] = useState(0);
    const auth = useAuthUser();

    useEffect(() => {
        getTxn()
    }, [])

    const getTxn = async () => {
        try {
            const result = await axios.get(GET_TXN_URL + room.transaction_no);
            const { bill } = result?.data;
            setBill(bill);
        } catch (error) {
            console.log(error.message)
        }
    }

    const checkOutRoom = async () => {
        try {
            await axios.post(CHECK_OUT_URL, { room_no: room.room_no, user_id: auth().id });
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Typography variant="h6" sx={{textAlign: "center", width: "20vw"}}>
                Check out <b>Room {room.room_no}</b>?
            </Typography>

            <Typography variant="h6" sx={{margin: "5% 5%", marginBottom: "15%"}}>
                Bill: {bill}
            </Typography>

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" onClick={() => checkOutRoom()} sx={{ margin: "0 6px" }}>Check Out</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default TimedOut
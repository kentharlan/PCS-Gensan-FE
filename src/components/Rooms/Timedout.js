import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

import axios from '../../api/axios'
import Modal from "../Modal";
import AddTime from "./AddTime";

const CHECK_OUT_URL = "/txn/checkout";
const GET_TXN_URL = "/txn/";
const GET_RATE_URL = "/rates/"

const TimedOut = (props) => {
    const { room, setOpenModal } = props
    const [ openInnerModal, setOpenInnerModal ] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
    const [ rate, setRate ] = useState(0);
    const [ bill, setBill] = useState(0);
    const auth = useAuthUser();

    useEffect(() => {
        getTxn()
    }, [])

    const getTxn = async () => {
        try {
            const result = await axios.get(GET_TXN_URL + room.transaction_no);
            const txn = result?.data;
            setBill(txn.bill);

            const res = await axios.get(GET_RATE_URL + txn.rate_id);
            const Rate = res?.data
            const rate_type = Rate[room.type];
            const hourly_rate = rate_type.hourly;
            setRate(parseInt(hourly_rate));
        } catch (error) {
            console.log(error.message)
        }
    }

    const checkOutRoom = async () => {
        try {
            await axios.post(CHECK_OUT_URL, { room_no: room.room_no, bill, user_id: auth().id });
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleAddTime = async () => {
        setModalConfig({
            title: `Room ${room.room_no}`,
            content: <AddTime
                setOpenInnerModal={setOpenInnerModal}
                setOpenModal={setOpenModal}
                timed_out={true}
                room_no={room.room_no}
                transaction_no={room.transaction_no}
                rate ={rate}
            />
        })

       setOpenInnerModal(true)
    }

    return (
        <>
            { 
                bill <= 0 ?
                    <Typography variant="h5" sx={{marginBottom: "12%", textAlign: "center"}}>
                        Are you sure you want to Check Out <b>Room {room.room_no}</b>?
                    </Typography>
                :
                    <>
                    <Typography variant="h5" sx={{textAlign: "center", marginBottom: "5%"}}>
                        Are you sure you want to Check Out <b>Room {room.room_no}</b> with unpaid bill?
                    </Typography>
                    <Typography variant="h5">
                        Bill: <b style={{color: "red"}}>₱{bill}</b>
                    </Typography>
                    </>
            }

            <div style={{ textAlign: "center", marginTop: "12%" }}>
                <Button variant="contained" onClick={() => checkOutRoom()} sx={{ margin: "0 6px" }}>Check Out</Button>
                <Button variant="contained" onClick={handleAddTime} sx={{ margin: "0 6px" }}>Add Time</Button>
            </div>

            <Modal
                openModal={openInnerModal}
                setOpenModal={setOpenInnerModal}
                title={modalConfig.title}
            >
                {modalConfig.content}
            </Modal>
        </>
    )
}

export default TimedOut
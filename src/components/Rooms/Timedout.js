import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

import axios from '../../api/axios'
import Modal from "../Modal";
import Additional from "./Additional";

const CHECK_OUT_URL = "/txn/checkout";
const GET_TXN_URL = "/txn/";

const TimedOut = (props) => {
    const { room, setOpenModal } = props
    const [ openInnerModal, setOpenInnerModal ] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
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

    const handleAdditional = async () => {
        setModalConfig({
            title: `Room ${room.room_no}`,
            content: <Additional
                setOpenInnerModal={setOpenInnerModal}
                setOpenModal={setOpenModal}
                timed_out={true}
                transaction_no={room.transaction_no}
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
                <Button variant="contained" onClick={handleAdditional} sx={{ margin: "0 6px" }}>Additional</Button>
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
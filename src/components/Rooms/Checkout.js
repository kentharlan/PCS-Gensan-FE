import { Button, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import axios from '../../api/axios'
import Modal from "../Modal";
import Transfer from "./Transfer";
import { useAuthUser } from "react-auth-kit";
import CheckOutConfirmation from "./CheckOutConfirmation";
import Additional from "./Additional";
import Abort from "./Abort";
import Pay from "./Pay"

const GET_TXN_URL = "/txn/";

const Checkout = (props) => {
    const auth = useAuthUser();
    const { room, setOpenModal } = props;
    const type = room.type === "garage" ? "With Garage" : "Without Garage";
    const [amenities, setAmenities] = useState({
        "Extra Pillow": 0,
        "Extra Towel": 0,
        "Extra Small Bed": 0,
        "Extra Bed": 0,
        "Extra Person": 0
    })
    const [values, setValues] = useState({
        transaction_no: room.transaction_no,
        bill: 0,
        duration: 0,
        additional_time: 0
    })
    const [time, setTime] = useState(0);
    const [durationInSeconds, setDurationInSeconds] = useState(0);
    const [openInnerModal, setOpenInnerModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({});

    useEffect(() => {
        getTxn();

        const interval = setInterval(() => {
            setTime((time) => time - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [openInnerModal])

    const getTxn = async () => {
        try {
            const result = await axios.get(GET_TXN_URL + room.transaction_no);
            const txn = result?.data;

            const duration = parseInt(txn.duration);
            const checkin_dt = new Date(txn.dt_check_in);
            const current_dt = new Date();
            const diff = (checkin_dt.setTime(checkin_dt.getTime() + (duration * 60 * 60 * 1000))) - current_dt
            const initialTime = Math.floor(diff / 1000)

            setTime(initialTime)
            setDurationInSeconds(duration * 60 * 60)
            setValues(prev => ({
                ...prev,
                dt_check_in: txn.dt_check_in,
                bill: parseInt(txn.bill),
                duration: duration
            }));
            setAmenities({
                "Extra Pillow": txn.extra_pillow,
                "Extra Towel": txn.extra_towel,
                "Extra Small Bed": txn.extra_small_bed,
                "Extra Bed": txn.extra_bed,
                "Extra Person": txn.extra_person
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedHours = hours.toString();
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    const handleCheckout = async () => {
        setModalConfig({
            title: "Room Check Out",
            content: <CheckOutConfirmation
                setOpenInnerModal={setOpenInnerModal}
                setOpenModal={setOpenModal}
                room_no={room.room_no}
                bill={values.bill}
            />
        })

        setOpenInnerModal(true)
    }

    const handleAdditional = async () => {
        setModalConfig({
            title: `Room ${room.room_no}`,
            content: <Additional
                setOpenInnerModal={setOpenInnerModal}
                timed_out={false}
                transaction_no={room.transaction_no}
            />
        })

        setOpenInnerModal(true)
    }

    const handleTransfer = async () => {
        setModalConfig({
            title: "Room Transfer",
            content: <Transfer
                setOpenInnerModal={setOpenInnerModal}
                setOpenModal={setOpenModal}
                room={room.room_no}
                transaction_no={room.transaction_no}
            />
        })

        setOpenInnerModal(true)
    }

    const handleCancel = async () => {
        setModalConfig({
            title: "Abort Room",
            content: <Abort
                setOpenInnerModal={setOpenInnerModal}
                setOpenModal={setOpenModal}
                room={room}
            />
        })

        setOpenInnerModal(true)
    }

    const handlePay = async () => {
        setModalConfig({
            title: `Room ${room.room_no}`,
            content: <Pay
                setOpenInnerModal={setOpenInnerModal}
                room={room}
                bill={values.bill}
            />
        })

        setOpenInnerModal(true)
    }

    return (
        <>
            <Typography variant="h6">
                Room No: {room.room_no}
            </Typography>
            <Typography variant="h6">
                Room Type: {type}
            </Typography>
            <Typography variant="h6">
                Status: Occupied
            </Typography>
            <Typography variant="h6">
                Check-in Time: {new Date(values.dt_check_in).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </Typography>
            <Typography variant="h6">
                Duration: {`${values.duration} hours`}
            </Typography>
            <Typography variant="h6">
                Time Left: {formatTime(time)}
            </Typography>
            {Object.entries(amenities).map(([key, value]) => (
                value > 0 ? <Typography variant="h6">{`${key}: ${value}`}</Typography> : null
            ))}
            <Typography variant="h6">
                Bill: {values.bill}
                <Button
                    variant="contained"
                    onClick={handlePay}
                    sx={{ width: "25%", position: "absolute", right: "15%" }}
                    disabled={values.bill <= 0}
                >
                    {values.bill > 0 ? "Pay" : "Paid"}
                </Button>
            </Typography>

            <div style={{ textAlign: "center", marginTop: "10%" }}>
                <Button variant="contained" onClick={handleCheckout} sx={{ margin: "1% 1%", width: "48%" }}>Check Out</Button>
                <Button variant="contained" onClick={handleAdditional} sx={{ margin: "1% 1%", width: "48%" }}>Additional</Button>
                <Button variant="contained" onClick={handleTransfer} sx={{ margin: "1% 1%", width: "48%" }}>Transfer</Button>
                <Button variant="contained" color="error" onClick={handleCancel} disabled={!((durationInSeconds - time) < 900 || auth().admin)} sx={{ margin: "1% 1%", width: "48%" }}>Abort</Button>
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

export default Checkout
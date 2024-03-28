import { Button, Typography, TextField } from "@mui/material"
import { useState, useEffect } from "react";
import axios from '../../api/axios'
import Modal from "../Modal";
import Transfer from "./Transfer";
import { useAuthUser } from "react-auth-kit";
import CheckOutConfirmation from "./CheckOutConfirmation";
import AddTime from "./AddTime";
import Cancel from "./Cancel";
import Pay from "./Pay"

const GET_TXN_URL = "/txn/";
const GET_RATE_URL = "/rates/"

const Checkout = (props) => {
    const auth = useAuthUser();
    const { room, timee, setOpenModal } = props;
    const type = room.type === "garage" ? "With Garage" : "Without Garage";
    const initialValues = {
        transaction_no: room.transaction_no,
        additional_time: 0,
        original_bill: 0,
        new_bill: 0
    }
    const [values, setValues] = useState(initialValues)
    const [rate, setRate] = useState(0);
    const [time, setTime] = useState(timee);
    const [duration, setDuration] = useState(0);
    const [openInnerModal, setOpenInnerModal] = useState(false);
    const [modalConfig, setModalConfig] = useState([]);

    useEffect(() => {
        getTxn();
        setValues(prev => ({
            ...prev,
            additional_time: 0
        }));

        const interval = setInterval(() => {
            setTime((time) => time - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [openInnerModal])

    useEffect(() => {
        calculateBill();
    }, [values.additional_time])

    const getTxn = async () => {
        try {
            const result = await axios.get(GET_TXN_URL + room.transaction_no);
            const txn = result?.data;
            const duration = parseInt(txn.base_time) + parseInt(txn.additional_time);
            setDuration(duration * 60 * 60)
            setValues(prev => ({
                ...prev,
                dt_check_in: txn.dt_check_in,
                original_bill: parseInt(txn.bill),
                new_bill: parseInt(txn.bill)
            }));

            const res = await axios.get(GET_RATE_URL + txn.rate_id);
            const Rate = res?.data
            const rate_type = Rate[room.type];
            const hourly_rate = rate_type.hourly;
            setRate(parseInt(hourly_rate));
        } catch (error) {
            console.log(error.message)
        }
    }

    const calculateBill = () => {
        const new_bill = values.original_bill + (values.additional_time * rate)
        setValues(prev => ({
            ...prev,
            new_bill: new_bill
        }));
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleCheckout = async () => {
        setModalConfig({
            title: "Room Check Out",
            content: <CheckOutConfirmation
                setOpenInnerModal={setOpenInnerModal}
                setOpenModal={setOpenModal}
                room_no={room.room_no}
                bill={values.original_bill}
            />
        })

        setOpenInnerModal(true)
    }

    const handleAddTime = async () => {
        if (values.additional_time > 0) {
            setModalConfig({
                title: "Add Time",
                content: <AddTime
                    setOpenInnerModal={setOpenInnerModal}
                    values={values}
                    room_no={room.room_no}
                />
            })

            setOpenInnerModal(true)
        }
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
            title: "Cancel Room",
            content: <Cancel
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
                bill={values.original_bill}
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
                Time Left: {formatTime(time)}
            </Typography>
            <Typography variant="h6">
                Bill: {values.new_bill}
                <Button 
                    variant="contained"
                    onClick={handlePay}
                    sx={{width: "25%", position: "absolute", right: "15%"}}
                    disabled={values.original_bill <= 0}
                >
                    {values.original_bill > 0 ? "Pay" : "Paid"}
                </Button>
            </Typography>
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
                sx={{ marginTop: "10%" }}
            />

            <div style={{ textAlign: "center", marginTop: "5%" }}>
                <Button variant="contained" onClick={handleCheckout} sx={{ margin: "1% 1%", width: "48%" }}>Check Out</Button>
                <Button variant="contained" onClick={handleAddTime} sx={{ margin: "1% 1%", width: "48%" }}>Add Time</Button>
                <Button variant="contained" onClick={handleTransfer} sx={{ margin: "1% 1%", width: "48%" }}>Transfer</Button>
                <Button variant="contained" onClick={handleCancel} disabled={!((duration - time) < 900 || auth().admin)} sx={{ margin: "1% 1%", width: "48%" }}>Abort</Button>
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
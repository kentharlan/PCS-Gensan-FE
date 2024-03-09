import { Button, Typography, TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import axios from '../../api/axios'

const TRANSFER_URL = '/txn/transfer';
const GET_VACANT_URL = '/rooms/status/1'

const Transfer = (props) => {
    const { room, transaction_no, setOpenModal, setOpenInnerModal } = props
    const [to_room, setRoom] = useState("")
    const [vacant, setVacant] = useState([])


    useEffect(() => {
        getVacantRooms();
    }, [])

    const getVacantRooms = async () => {
        try {
            const result = await axios.get(GET_VACANT_URL);
            const data = result?.data;
            setVacant(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = async (e) => {
        const { value } = e.target;
        setRoom(value)
    }

    const transferRoom = async () => {
        try {
            await axios.post(TRANSFER_URL, { from: room, to: to_room, transaction_no});
            setOpenInnerModal(false);
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Typography variant="h5" sx={{marginBottom: "2%", textAlign: "center"}}>
                Transfer <b>Room {room}</b> to:
            </Typography>

            <TextField
                select
                variant="filled"
                label='Room'
                name="vacant"
                value={to_room}
                onChange={handleChange}
                required
                autoComplete='off'
                fullWidth
                sx={{ marginBottom: "12%" }}
            >
                {vacant.map((vacantroom) => (
                    <MenuItem key={vacantroom.room_no} value={vacantroom.room_no}>{vacantroom.room_no}</MenuItem>
                ))}
            </TextField>

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" onClick={transferRoom} sx={{ margin: "0 6px" }}>Transfer</Button>
                <Button variant="contained" onClick={() => setOpenInnerModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default Transfer;
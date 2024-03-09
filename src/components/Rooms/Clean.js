import { Button, Typography } from "@mui/material"
import axios from '../../api/axios'

const UPDATE_ROOM_URL = '/rooms/update/';

const Clean = (props) => {
    const { room, setOpenModal } = props
    const params = {
        status: 1,
        transaction_no: null
    }

    const updateRoom = async (room_no) => {
        try {
            await axios.put(`${UPDATE_ROOM_URL}${room_no}`, params);
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Typography variant="h5" sx={{marginBottom: "12%", textAlign: "center"}}>
                Is <b>Room {room.room_no}</b> ready for customer?
            </Typography>

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" onClick={() => updateRoom(room.room_no)} sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default Clean
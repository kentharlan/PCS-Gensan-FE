import { Button, Typography } from "@mui/material";
import axios from '../../api/axios'

const DELETE_RATES_URL = '/rates/delete/';

const RateDelete = (props) => {
    const { rate, setOpenModal } = props

    const deleteUser = async (id) => {
        try {
            await axios.delete(DELETE_RATES_URL+id);
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Typography variant="h5" sx={{marginBottom: "12%", textAlign: "center"}}>
                Are you sure you want to <b>DELETE</b> the Rate <b>{rate.name}</b>?
            </Typography>

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" color="error" onClick={() => deleteUser(rate.rate_id)} sx={{ margin: "0 6px" }}>Delete</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default RateDelete;
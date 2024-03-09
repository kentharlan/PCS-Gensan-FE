import { Button, Typography } from "@mui/material"
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";


const Logout = (props) => {
    const { setOpenModal } = props
    const singout = useSignOut();
    const navigate = useNavigate();

    const signOut = () => {
        setOpenModal(false);
        singout();
        navigate("/login");
    }

    return (
        <>
            <Typography variant="h5" sx={{marginBottom: "12%", textAlign: "center"}}>
                Are you sure you want to <b>Logout</b>?
            </Typography>

            <div style={{ textAlign: "center" }}>
                <Button variant="contained" onClick={() => signOut()} sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default Logout;
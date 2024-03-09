import { AppBar, Toolbar, Button, Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "./Modal";
import Logout from "./Logout";
import { useAuthUser } from "react-auth-kit";

export const Navbar = () => {
    const [active, setActive] = useState("Rooms");
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    const auth = useAuthUser();
    let tabComp = null

    useEffect(() => {
        switch (currentPath) {
            case "/accounts":
                setActive("Accounts");
                break;
            case "/rates":
                setActive("Rates");
                break;
            case "/history":
                setActive("History");
                break;
            default:
                setActive("Rooms")
        }
    }, [])

    const handleChange = (event, newValue) => {
        setActive(newValue);
    };

    const logout = () => {
        setOpenModal(true)
    }

    if (auth().admin) {
        tabComp = (
            <Tabs value={active} onChange={handleChange} textColor="inherit"
                TabIndicatorProps={{ style: { backgroundColor: "White" } }}>
                <Tab label="Rooms" value={"Rooms"} component={Link} to="/" />
                <Tab label="Accounts" value={"Accounts"} component={Link} to="/accounts" />
                <Tab label="Rates" value={"Rates"} component={Link} to="/rates" />
                <Tab label="History" value={"History"} component={Link} to="/history" />
            </Tabs>
        )
    } else {
        tabComp = (
            <Tabs value={active} onChange={handleChange} textColor="inherit"
                TabIndicatorProps={{ style: { backgroundColor: "White" } }}>
                <Tab label="Rooms" value={"Rooms"} component={Link} to="/" />
            </Tabs>
        )
    }

    return (
        <>

            <AppBar sx={{ zIndex: 0 }} position="static">
                <Toolbar>
                    {tabComp}
                    <Button variant="contained" sx={{ marginLeft: "auto" }} onClick={() => logout()}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Modal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={"Logout Confirmation"}
            >
                <Logout
                    setOpenModal={setOpenModal}
                />
            </Modal>
        </>
    )
}

export default Navbar
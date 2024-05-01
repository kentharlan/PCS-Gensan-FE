import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material"
import { Add, Delete, Edit } from "@mui/icons-material"
import axios from '../../api/axios'
import { useState, useEffect } from "react"
import Modal from "../Modal"
import UserCreate from "./UserCreate"
import UserDelete from "./UserDelete"
import UserUpdate from "./UserUpdate"
import ChangePass from "./ChangePass"
import Navbar from "../Navbar"

const GET_USERS_URL = '/users';

const Accounts = () => {
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalConfig, setModalConfig] = useState([]);

    useEffect(() => {
        getUsers()
    }, [openModal])

    const getUsers = async () => {
        try {
            const result = await axios.get(GET_USERS_URL);
            const data = result?.data;
            data.map((user) => {
                user.role = user.admin ? "Admin" : "User";
                user.name = `${user.first_name} ${user.last_name}`;
                return user
            })

            setUsers(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleAddButton = () => {
        setModalConfig({
            title: "CREATE NEW ACCOUNT",
            content: <UserCreate
                setOpenModal={setOpenModal}
            />,
        });
        setOpenModal(true);
    }

    const handleEditButton = (user) => {
        setModalConfig({
            title: "EDIT ACCOUNT",
            content: <UserUpdate
                setOpenModal={setOpenModal}
                user={user}
            />
        });
        setOpenModal(true);
    }

    const handleChangePassButton = (id) => {
        setModalConfig({
            title: "CHANGE PASSWORD",
            content: <ChangePass
                setOpenModal={setOpenModal}
                id={id}
            />
        });
        setOpenModal(true);
    }

    const handleDeleteButton = (user) => {
        setModalConfig({
            title: "DELETE ACCOUNT",
            content: <UserDelete
                setOpenModal={setOpenModal}
                user={user}
            />
        });
        setOpenModal(true);
    }

    return (
        <>
            <Navbar />

            <TableContainer component={Paper} elevation={5} sx={{ maxWidth: "95vw", margin: "2vw auto" }} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="h6">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="h6">
                                    Username
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="h6">
                                    Role
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6">
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{user.name}</TableCell>
                                <TableCell align="left">{user.username}</TableCell>
                                <TableCell align="left">{user.role}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" startIcon={<Edit />} onClick={() => handleEditButton(user)} sx={{ margin: "0 3px" }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" startIcon={<Edit />} onClick={() => handleChangePassButton(user.id)} sx={{ margin: "0 3px" }}>
                                        Change Password
                                    </Button>
                                    <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => handleDeleteButton(user)} sx={{ margin: "0 3px" }} disabled={user.id === 1}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <div>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ float: "right", margin: "0 8vw" }}
                    onClick={handleAddButton}
                >
                    Create New Account
                </Button>
            </div>

            <Modal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={modalConfig.title}
                width={"40vw"}
            >
                {modalConfig.content}
            </Modal>
        </>

    )
}

export default Accounts;
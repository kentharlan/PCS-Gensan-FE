import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, TableFooter, MenuItem, Typography, IconButton, Collapse } from "@mui/material"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import axios from '../../api/axios'
import { useState, useEffect } from "react"
import Navbar from "../Navbar"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const GET_HISTORY_URL = '/txn/history';
const GET_USERS_URL = '/users';
const GET_SESSIONS_URL = '/txn/sessions';

const History = () => {
    const [history, setHistory] = useState({
        totalRooms: 0,
        totalAmount: 0,
        records: []
    });
    const [users, setUsers] = useState([]);
    const [sessions, setSessions] = useState({
        records: []
    })
    const [filter, setFilter] = useState({
        search: '',
        start_date: dayjs(),
        end_date: dayjs()
    })
    const [sessionFilter, setSessionFilter] = useState({
        user_id: '',
        start_date: dayjs(),
        end_date: dayjs()
    })

    useEffect(() => {
        getUsers()
        getHistory()
        getSessions()
    }, [])

    useEffect(() => {
        getHistory()
    }, [filter])

    useEffect(() => {
        getSessions()
    }, [sessionFilter])

    const getHistory = async () => {
        try {
            const result = await axios.post(`${GET_HISTORY_URL}?search=${filter.search}&start_date=${filter.start_date.format("YYYY-MM-DD")}&end_date=${filter.end_date.format("YYYY-MM-DD")}`);

            setHistory(result?.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const getUsers = async () => {
        try {
            const result = await axios.get(GET_USERS_URL);

            setUsers(result?.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const getSessions = async () => {
        try {
            const result = await axios.post(`${GET_SESSIONS_URL}?user_id=${sessionFilter.user_id}&start_date=${sessionFilter.start_date.format("YYYY-MM-DD")}&end_date=${sessionFilter.end_date.format("YYYY-MM-DD")}`);

            setSessions(result?.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChange = (eventOrValue, name) => {
        let value, field
        if (eventOrValue && eventOrValue.target) {
            // It's an event, handle like a regular input field
            field = eventOrValue.target.name;
            value = eventOrValue.target.value;
        } else {
            // It's a direct value from DatePicker, use the provided name and value
            field = name;
            value = eventOrValue;
        }

        setFilter({
            ...filter,
            [field]: value
        });
    }

    const handleSessionChange = (eventOrValue, name) => {
        let value, field
        if (eventOrValue && eventOrValue.target) {
            // It's an event, handle like a regular input field
            field = eventOrValue.target.name;
            value = eventOrValue.target.value;
        } else {
            // It's a direct value from DatePicker, use the provided name and value
            field = name;
            value = eventOrValue;
        }

        setSessionFilter({
            ...sessionFilter,
            [field]: value
        });
    }

    return (
        <>
            <Navbar />

            <Box sx={{ maxWidth: "95vw", margin: "2vw auto" }}>
                <Paper elevation={5} sx={{ display: "flex", flexDirection: "column", maxHeight: "85vh" }}>
                    <Box sx={{ padding: "1%", display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}>
                        <TextField
                            variant="filled"
                            type="text"
                            label="Search"
                            name="search"
                            value={filter.search}
                            onChange={handleChange}
                            sx={{ width: "20%", marginRight: "auto" }}
                        />

                        <Typography variant="h5" sx={{ marginRight: "auto", padding: "1%" }}>
                            Transactions
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ marginLeft: "auto" }}>
                            <DatePicker
                                value={filter.start_date}
                                onChange={(newValue) => handleChange(newValue, "start_date")}
                                label="Start Date"
                                sx={{ width: "15%", marginRight: "1%" }}
                            />
                            <DatePicker
                                value={filter.end_date}
                                onChange={(newValue) => handleChange(newValue, "end_date")}
                                label="End Date"
                                sx={{ width: "15%" }}
                            />
                        </LocalizationProvider>
                    </Box>
                        
                    <TableContainer component={Paper} sx={{ flexGrow: 1, overflow: "auto" }}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{ fontWeight: "bold", fontSize: "larger" }}></TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold", fontSize: "larger" }}>Transaction No.</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold", fontSize: "larger" }}>Room</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold", fontSize: "larger" }}>Duration</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold", fontSize: "larger" }}>Bill</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold", fontSize: "larger" }}>Check In</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold", fontSize: "larger" }}>Check Out</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold", fontSize: "larger" }}>Remarks</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ backgroundColor: "#f0f0f0" }}>
                                {history.records && history.records.map((row) => (
                                    <Row
                                        txn={row}
                                    />
                                ))}
                            </TableBody>
                        <TableFooter sx={{ '.MuiTableRow-root': { position: "sticky", bottom: 0, backgroundColor: "#fff" } }}>
                            <TableRow>
                                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "larger" }}>Total Rooms</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "larger" }}>{history.totalRooms}</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "larger" }}>Total Revenue</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "larger" }}>{history.totalAmount}</TableCell>
                                <TableCell colSpan={3} align="center" style={{ fontWeight: "bold", fontSize: "larger" }}></TableCell>
                            </TableRow>
                        </TableFooter>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            <Box sx={{ maxWidth: "95vw", margin: "2vw auto" }}>
                <Paper elevation={5} sx={{ display: "flex", flexDirection: "column", maxHeight: "85vh" }}>
                    <Box sx={{ padding: "1%", display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}>
                        <TextField
                            select
                            variant="filled"
                            label="Cashier"
                            name="user_id"
                            value={sessionFilter.user_id}
                            onChange={handleSessionChange}
                            sx={{ width: "15%", marginRight: "auto"  }}
                        >
                            <MenuItem value={""}>All</MenuItem>
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>{user.first_name}</MenuItem>
                            ))}
                        </TextField>

                        <Typography variant="h5" sx={{ marginRight: "auto", padding: "1%" }}>
                            Sessions
                        </Typography>


                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ marginLeft: "auto" }}>
                            <DatePicker
                                value={sessionFilter.start_date}
                                onChange={(newValue) => handleSessionChange(newValue, "start_date")}
                                label="Start Date"
                                sx={{ width: "15%", marginRight: "1%" }}
                            />
                            <DatePicker
                                value={sessionFilter.end_date}
                                onChange={(newValue) => handleSessionChange(newValue, "end_date")}
                                label="End Date"
                                sx={{ width: "15%" }}
                            />
                        </LocalizationProvider>
                    </Box>
                        
                    <TableContainer component={Paper} sx={{ flexGrow: 1, overflow: "auto" }}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{ fontWeight: "bold", fontSize: "larger" }}>Cashier</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold", fontSize: "larger" }}>Amount</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold", fontSize: "larger" }}>Login Date</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold", fontSize: "larger" }}>Logout Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ backgroundColor: "#f0f0f0" }}>
                                {sessions.records && sessions.records.map((row) => (
                                    <TableRow
                                        key={row.session_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.cashier}</TableCell>
                                        <TableCell align="center">{row.total_amount}</TableCell>
                                        <TableCell align="left">{row.login_dt}</TableCell>
                                        <TableCell align="left">{row.logout_dt}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>

    )
}

function Row(props) {
    const { txn } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{txn.transaction_no}</TableCell>
                <TableCell align="center">{txn.room_no}</TableCell>
                <TableCell align="center">{txn.duration}</TableCell>
                <TableCell align="center">{txn.bill}</TableCell>
                <TableCell align="left">{txn.dt_check_in}</TableCell>
                <TableCell align="left">{txn.dt_check_out}</TableCell>
                <TableCell align="left">{txn.remarks}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: "rgba(0, 0, 0, 0.1)" }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, marginBottom: "2vh" }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={3} />
                                        <TableCell colSpan={2} align="left">
                                            <Typography fontWeight="bold">
                                                Cashier
                                            </Typography>
                                        </TableCell>
                                        <TableCell colSpan={2} align="center">
                                            <Typography fontWeight="bold">
                                                Amount
                                            </Typography>
                                        </TableCell>
                                        <TableCell colSpan={3} align="center">
                                            <Typography fontWeight="bold">
                                                Payment Date
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {txn.payments && txn.payments.map((row) => (
                                        <TableRow
                                            key={row.payment_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell colSpan={3} />
                                            <TableCell colSpan={2} align="left">{row.cashier}</TableCell>
                                            <TableCell colSpan={2} align="center">{row.amount}</TableCell>
                                            <TableCell colSpan={3} align="center">{row.payment_dt}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default History;
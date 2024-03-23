import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, TableFooter, MenuItem, Typography } from "@mui/material"
import axios from '../../api/axios'
import { useState, useEffect } from "react"
import Navbar from "../Navbar"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const GET_HISTORY_URL = '/txn/history';
const GET_USERS_URL = '/users';
const GET_PAYMENTS_URL = '/txn/payments';

const History = () => {
    const [history, setHistory] = useState({
        totalRooms: 0,
        totalAmount: 0,
        records: []
    });
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState({
        totalAmount: 0,
        records: []
    })
    const [filter, setFilter] = useState({
        search: '',
        start_date: dayjs().subtract(1, "month"),
        end_date: dayjs()
    })
    const [paymentFilter, setPaymentFilter] = useState({
        user_id: '',
        start_date: dayjs().subtract(1, "month"),
        end_date: dayjs()
    })

    useEffect(() => {
        getUsers()
        getHistory()
        getPayments()
    }, [])

    useEffect(() => {
        getHistory()
    }, [filter])

    useEffect(() => {
        getPayments()
    }, [paymentFilter])

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

    const getPayments = async () => {
        try {
            const result = await axios.post(`${GET_PAYMENTS_URL}?user_id=${paymentFilter.user_id}&start_date=${paymentFilter.start_date.format("YYYY-MM-DD")}&end_date=${paymentFilter.end_date.format("YYYY-MM-DD")}`);

            setPayments(result?.data);
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

    const handlePaymentChange = (eventOrValue, name) => {
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

        setPaymentFilter({
            ...paymentFilter,
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
                                    <TableRow
                                        key={row.transaction_no}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.transaction_no}</TableCell>
                                        <TableCell align="center">{row.room_no}</TableCell>
                                        <TableCell align="center">{row.duration}</TableCell>
                                        <TableCell align="center">{row.bill}</TableCell>
                                        <TableCell align="left">{row.dt_check_in}</TableCell>
                                        <TableCell align="left">{row.dt_check_out}</TableCell>
                                        <TableCell align="left">{row.remarks}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        <TableFooter sx={{ '.MuiTableRow-root': { position: "sticky", bottom: 0, backgroundColor: "#fff" } }}>
                            <TableRow>
                                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "larger" }}>Total Rooms</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "larger" }}>{history.totalRooms}</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "larger" }}>Total Revenue</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "larger" }}>{history.totalAmount}</TableCell>
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
                            value={paymentFilter.user_id}
                            onChange={handlePaymentChange}
                            sx={{ width: "15%", marginRight: "auto"  }}
                        >
                            <MenuItem value={""}>All</MenuItem>
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>{user.first_name}</MenuItem>
                            ))}
                        </TextField>

                        <Typography variant="h5" sx={{ marginRight: "auto", padding: "1%" }}>
                            Payments
                        </Typography>


                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ marginLeft: "auto" }}>
                            <DatePicker
                                value={paymentFilter.start_date}
                                onChange={(newValue) => handlePaymentChange(newValue, "start_date")}
                                label="Start Date"
                                sx={{ width: "15%", marginRight: "1%" }}
                            />
                            <DatePicker
                                value={paymentFilter.end_date}
                                onChange={(newValue) => handlePaymentChange(newValue, "end_date")}
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
                                    <TableCell align="left" style={{ fontWeight: "bold", fontSize: "larger" }}>Transaction No.</TableCell>
                                    <TableCell align="left" style={{ fontWeight: "bold", fontSize: "larger" }}>Session Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ backgroundColor: "#f0f0f0" }}>
                                {payments.records && payments.records.map((row) => (
                                    <TableRow
                                        key={row.payment_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.cashier}</TableCell>
                                        <TableCell align="center">{row.amount}</TableCell>
                                        <TableCell align="left">{row.transaction_no}</TableCell>
                                        <TableCell align="left">{row.login_dt}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        <TableFooter sx={{ '.MuiTableRow-root': { position: "sticky", bottom: 0, backgroundColor: "#fff" } }}>
                            <TableRow>
                                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "larger" }}>Total Revenue</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "larger" }}>{payments.totalAmount}</TableCell>
                            </TableRow>
                        </TableFooter>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>

    )
}

export default History;
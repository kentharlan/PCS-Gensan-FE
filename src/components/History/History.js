import { TableContainer, Paper } from "@mui/material"
import axios from '../../api/axios'
import { useState, useEffect } from "react"
import Navbar from "../Navbar";
import { DataGrid } from '@mui/x-data-grid';
import './History.css'

const GET_HISTORY_URL = '/txn/history';

const History = () => {
    const [txns, setTxns] = useState([]);

    const columns = [
        {
            field: 'transaction_no',
            headerName: 'Transaction Number',
            headerClassName: 'table-header',
            flex: 2
        },
        {
            field: 'room_no',
            headerName: 'Room',
            headerClassName: 'table-header',
            flex: 1,
        },
        {
            field: 'dt_check_in',
            headerName: 'Check In',
            headerClassName: 'table-header',
            type: 'dateTime',
            flex: 2,
            valueGetter: ({ value }) => value && new Date(value)
        },
        {
            field: 'dt_check_out',
            headerName: 'Check Out',
            headerClassName: 'table-header',
            type: 'dateTime',
            flex: 2,
            valueGetter: ({ value }) => value && new Date(value)
        },
        {
            field: 'duration',
            headerName: 'Duration',
            headerClassName: 'table-header',
            flex: 1,
        },
        {
            field: 'bill',
            headerName: 'Bill',
            headerClassName: 'table-header',
            flex: 1,
        },
        {
            field: 'cashier',
            headerName: 'Cashier',
            headerClassName: 'table-header',
            flex: 1.5,
        },
        {
            field: 'remarks',
            headerName: 'Remarks',
            headerClassName: 'table-header',
            flex: 2,
        },
    ];

    useEffect(() => {
        getHistory()
    }, [])

    const getHistory = async () => {
        try {
            const result = await axios.post(GET_HISTORY_URL);
            const data = result?.data
            setTxns(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <Navbar />

            <TableContainer component={Paper} elevation={5} sx={{ maxWidth: "95vw", margin: "2vw auto" }} >
                <DataGrid
                    rows={txns}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                />
            </TableContainer>
        </>

    )
}

export default History;
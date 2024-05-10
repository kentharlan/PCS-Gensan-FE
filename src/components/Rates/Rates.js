import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Collapse, Typography, Box } from "@mui/material"
import { Add, Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import axios from '../../api/axios'
import { useState, useEffect } from "react"
import Modal from "../Modal"
import RateCreate from './RateCreate';
import RateDelete from './RateDelete';
import RateUpdate from './RateUpdate';
import Navbar from '../Navbar';

const GET_RATES_URL = '/rates';

const Rates = () => {
    const [rates, setRates] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalConfig, setModalConfig] = useState([]);

    useEffect(() => {
        getRates()
    }, [openModal])

    const getRates = async () => {
        try {
            const result = await axios.get(GET_RATES_URL);
            const data = result?.data;
            setRates(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleAddButton = () => {
        setModalConfig({
            title: "ADD RATE",
            content: <RateCreate
                setOpenModal={setOpenModal}
            />
        });
        setOpenModal(true);
    }

    const handleEditButton = (rate) => {
        setModalConfig({
            title: "EDIT RATE",
            content: <RateUpdate
                setOpenModal={setOpenModal}
                rate={rate}
            />
        });
        setOpenModal(true);
    }

    const handleDeleteButton = (rate) => {
        setModalConfig({
            title: "DELETE RATE",
            content: <RateDelete
                setOpenModal={setOpenModal}
                rate={rate}
            />
        });
        setOpenModal(true);
    }

    return (
        <>
            <Navbar />

            <TableContainer component={Paper} elevation={5} sx={{ maxWidth: "95vw", margin: "2vw auto" }}>
                <Table aria-label="collapsible table">
                    <TableHead sx={{ fontWeight: "bold" }}>
                        <TableRow sx={{ fontWeight: "bold" }}>
                            <TableCell />
                            <TableCell align="left">
                                <Typography variant="h6">
                                    Rate Name
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
                        {rates.map((rate) => (
                            <Row
                                key={rate.id}
                                rate={rate}
                                handleEditButton={handleEditButton}
                                handleDeleteButton={handleDeleteButton}
                            />
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
                    Add Rate
                </Button>
            </div>

            <Modal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={modalConfig.title}
                width={"65vw"}
            >
                {modalConfig.content}
            </Modal>
        </>
    );
}

function Row(props) {
    const { rate, handleEditButton, handleDeleteButton } = props;
    const [open, setOpen] = React.useState(false);

    useEffect(() => { }, [rate])

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
                <TableCell align="left">{rate.name}</TableCell>
                <TableCell align="center">
                    <Button variant="contained" startIcon={<Edit />} onClick={() => handleEditButton(rate)} sx={{ margin: "0 3px" }}>
                        Edit
                    </Button>
                    <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => handleDeleteButton(rate)} sx={{ margin: "0 3px" }} disabled={rate.rate_id === 1}>
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: "rgba(0, 0, 0, 0.1)" }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, marginBottom: "2vh" }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <Typography variant="h6" fontWeight="bold">
                                                Room Rates
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">
                                            <Typography fontWeight="bold">
                                                Room Type
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                Hourly
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                3 hours
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                6 hours
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                12 hours
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                24 hours
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">With Garage</TableCell>
                                        <TableCell align="center">₱ {rate.garage.hourly}</TableCell>
                                        <TableCell align="center">₱ {rate.garage.three}</TableCell>
                                        <TableCell align="center">₱ {rate.garage.six}</TableCell>
                                        <TableCell align="center">₱ {rate.garage.twelve}</TableCell>
                                        <TableCell align="center">₱ {rate.garage.twenty_four}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Without Garage</TableCell>
                                        <TableCell align="center">₱ {rate.no_garage.hourly}</TableCell>
                                        <TableCell align="center">₱ {rate.no_garage.three}</TableCell>
                                        <TableCell align="center">₱ {rate.no_garage.six}</TableCell>
                                        <TableCell align="center">₱ {rate.no_garage.twelve}</TableCell>
                                        <TableCell align="center">₱ {rate.no_garage.twenty_four}</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <Typography variant="h6" fontWeight="bold">
                                                Amenities
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                Extra Towel
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                Extra Pillow
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                Extra Blanket
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                Extra Single Bed
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                Extra Double Bed
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold">
                                                Extra Person
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">₱ {rate.extra_towel}</TableCell>
                                        <TableCell align="center">₱ {rate.extra_pillow}</TableCell>
                                        <TableCell align="center">₱ {rate.extra_blanket}</TableCell>
                                        <TableCell align="center">₱ {rate.extra_single_bed}</TableCell>
                                        <TableCell align="center">₱ {rate.extra_double_bed}</TableCell>
                                        <TableCell align="center">₱ {rate.extra_person}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Rates;
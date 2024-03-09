import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import axios from '../../api/axios'
import Checkin from "./Checkin"
import Checkout from "./Checkout"
import Clean from "./Clean"
import Modal from "../Modal"
import './Rooms.css'
import Navbar from "../Navbar"
import TimedOut from "./Timedout"

const GET_ROOMS_URL = "/rooms"
const INIT_ROOMS = "/txn/init"
const GET_ACTIVE_TXNS_URL = "/txn/txns/active"

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalConfig, setModalConfig] = useState([]);
    const [activeTxns, setActiveTxns] = useState([]);
    const [timers, setTimers] = useState([]);

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        getRooms()
    }, [openModal])

    useEffect(() => {
        getActiveTxns()
    }, [rooms])

    useEffect(() => {
        const updatedTimers = startTimers();

        return () => {
            stopTimers(updatedTimers)
            setTimers([]);
        }
    }, [activeTxns])

    const init = async () => {
        try {
            await axios.post(INIT_ROOMS);
        } catch (error) {
            console.log(error.message)
        }
    }

    const getRooms = async () => {
        try {
            const result = await axios.get(GET_ROOMS_URL);
            const data = result?.data;
            setRooms(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const getActiveTxns = async () => {
        try {
            const result = await axios.get(GET_ACTIVE_TXNS_URL);
            const data = result?.data;
            let timerArray = [];
            data.forEach((txn) => {
                if (txn) {
                    const checkin_dt = new Date(txn.dt_check_in);
                    const current_dt = new Date();

                    const duration = parseInt(txn.base_time) + parseInt(txn.additional_time);
                    const diff = (checkin_dt.setTime(checkin_dt.getTime() + (duration * 60 * 60 * 1000))) - current_dt
                    const initialTime = Math.floor(diff / 1000)

                    timerArray[txn.room_no] = {
                        time: initialTime,
                        intervalId: null
                    }
                }
            });

            setTimers(timerArray);
            setActiveTxns(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const startTimers = () => {
        const updatedTimers = timers.map((timer, index) => {
            if (!timer) return null

            const intervalId = setInterval(() => {
                const updatedTime = [...timers]
                updatedTime[index].time -= 1

                setTimers(updatedTime)

                if (updatedTime[index].time < 0) {
                    getRooms();
                    clearInterval(intervalId);
                }
            }, 1000);

            return { ...timer, intervalId };
        });

        setTimers(updatedTimers)
        return updatedTimers
    };

    const stopTimers = (updatedTimers) => {
        updatedTimers.forEach(timer => {
            clearInterval(timer?.intervalId)
        });
    };

    const handleButton = (room) => {
        switch (room.status) {
            case 1:
                setModalConfig({
                    title: "Check In",
                    content: <Checkin
                        setOpenModal={setOpenModal}
                        room={room}
                    />
                })
                break;
            case 2:
                setModalConfig({
                    title: "Check Out",
                    content: <Checkout
                        setOpenModal={setOpenModal}
                        room={room}
                        timee={timers[room.room_no]?.time}
                    />
                })
                break;
            case 3:
                setModalConfig({
                    title: "Update Room to Vacant",
                    content: <Clean
                        setOpenModal={setOpenModal}
                        room={room}
                    />
                })
                break;
            case 4:
                setModalConfig({
                    title: "Time is up!",
                    content: <TimedOut
                        setOpenModal={setOpenModal}
                        room={room}
                    />
                })
                break;
        }

        setOpenModal(true)
    }

    const elements = (room) => {
        if(!room) return

        let color = "primary"
        switch (room.status) {
            case 1:
                color = "success"
                break;
            case 2:
                color = "error"
                break;
            case 3:
                color = "primary"
                break;
            case 4:
                color = "secondary"
                break;
        }

        return (
            <Button
                sx={{ height: "100%", width: "100%" }}
                variant="contained"
                key={room.rooms_no}
                color={color}
                className={timers[room.rooms_no]?.time <= 900 ? 'blinking-button' : ''}
                onClick={() => handleButton(room)}
            >
                {room.room_no}
            </Button>
        )
    };

    return (
        <>
            <Navbar />
            <div style={{ margin: "0 2%" }}>
                <h1 style={{marginBottom: "0"}}>Ground Floor</h1>
                <table class="GeneratedTable" >
                    <tbody>
                        <tr>
                            <th>{elements(rooms[27])}</th>
                            <th rowSpan={3}>{elements(rooms[13])}</th>
                            <th rowSpan={3}>{elements(rooms[12])}</th>
                            <th rowSpan={3}>{elements(rooms[11])}</th>
                            <th rowSpan={3}>{elements(rooms[10])}</th>
                            <th rowSpan={3}>{elements(rooms[9])}</th>
                            <th rowSpan={3}>{elements(rooms[8])}</th>
                            <th rowSpan={3}>{elements(rooms[7])}</th>
                            <th rowSpan={3}>{elements(rooms[6])}</th>
                            <th rowSpan={3}>{elements(rooms[5])}</th>
                            <th rowSpan={3}>{elements(rooms[4])}</th>
                            <th rowSpan={3}>{elements(rooms[3])}</th>
                            <th rowSpan={3}>{elements(rooms[2])}</th>
                            <th rowSpan={3}>{elements(rooms[1])}</th>
                            <th rowSpan={3}>{elements(rooms[0])}</th>
                        </tr>
                        <tr>
                            <th>{elements(rooms[28])}</th>
                        </tr>
                        <tr>
                            <th>{elements(rooms[29])}</th>
                        </tr>
                        <tr>
                            <th>{elements(rooms[30])}</th>
                        </tr>
                        <tr>
                            <th>{elements(rooms[31])}</th>
                        </tr>
                        <tr>
                            <th>{elements(rooms[32])}</th>
                        </tr>
                        <tr>
                            <th>{elements(rooms[33])}</th>
                        </tr>
                        <tr>
                            <th>{elements(rooms[34])}</th>
                            <th rowSpan={3}>{elements(rooms[14])}</th>
                            <th rowSpan={3}>{elements(rooms[15])}</th>
                            <th rowSpan={3}>{elements(rooms[16])}</th>
                            <th rowSpan={3}>{elements(rooms[17])}</th>
                            <th rowSpan={3}>{elements(rooms[18])}</th>
                            <th rowSpan={3}>{elements(rooms[19])}</th>
                            <th rowSpan={3}>{elements(rooms[20])}</th>
                            <th rowSpan={3}>{elements(rooms[21])}</th>
                            <th rowSpan={3}>{elements(rooms[22])}</th>
                            <th rowSpan={3}>{elements(rooms[23])}</th>
                            <th rowSpan={3}>{elements(rooms[24])}</th>
                            <th rowSpan={3}>{elements(rooms[25])}</th>
                            <th rowSpan={3}>{elements(rooms[26])}</th>
                            <th rowSpan={3}></th>
                            <th>{elements(rooms[37])}</th>
                            <th>{elements(rooms[42])}</th>
                        </tr>
                        <tr>
                            <th>{elements(rooms[35])}</th>

                            <th>{elements(rooms[38])}</th>
                            <th>{elements(rooms[41])}</th>
                        </tr>
                        <tr>
                            <th>{elements(rooms[36])}</th>

                            <th>{elements(rooms[39])}</th>
                            <th>{elements(rooms[40])}</th>
                        </tr>
                    </tbody>
                </table >

                <h1 style={{marginBottom: "0"}}>Second Floor</h1>
                <table class="GeneratedTable" style={{marginBottom: "5vw"}}>
                    <tbody>
                        <tr>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>{elements(rooms[67])}</th>
                            <th colSpan={2}>{elements(rooms[66])}</th>
                        </tr>
                        <tr>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>{elements(rooms[65])}</th>
                            <th>{elements(rooms[64])}</th>
                            <th>{elements(rooms[63])}</th>
                            <th>{elements(rooms[62])}</th>
                            <th>{elements(rooms[61])}</th>
                            <th>{elements(rooms[60])}</th>
                            <th>{elements(rooms[59])}</th>
                            <th>{elements(rooms[58])}</th>
                        </tr>
                        <tr>
                            <td height={"10vh"}></td>
                        </tr>
                        <tr>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>{elements(rooms[57])}</th>
                            <th>{elements(rooms[56])}</th>
                            <th>{elements(rooms[55])}</th>
                            <th>{elements(rooms[54])}</th>
                            <th rowSpan={2} style={{paddingRight: "1vw", paddingBottom: "2vh"}}>{elements(rooms[53])}</th>
                            <th>{elements(rooms[52])}</th>
                            <th>{elements(rooms[51])}</th>
                            <th>{elements(rooms[50])}</th>
                        </tr>
                        <tr>
                        <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>{elements(rooms[49])}</th>
                            <th>{elements(rooms[48])}</th>
                            <th>{elements(rooms[47])}</th>
                            <th>{elements(rooms[46])}</th>
                            <th>{elements(rooms[45])}</th>
                            <th>{elements(rooms[44])}</th>
                            <th>{elements(rooms[43])}</th>
                        </tr>
                        
                    </tbody>
                </table>

                <Modal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    title={modalConfig.title}
                >
                    {modalConfig.content}
                </Modal>
            </div>
        </>
    )
}

export default Rooms;
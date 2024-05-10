import { Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import axios from '../../api/axios'

const UPDATE_URL = "/txn/update";

const Additional = (props) => {
    const { transaction_no, setOpenInnerModal, setOpenModal, timed_out } = props;
    const [values, setValues] = useState({
        additional_time: 0,
        extra_towel: 0,
        extra_pillow: 0,
        extra_blanket: 0,
        extra_single_bed: 0,
        extra_double_bed: 0,
        extra_person: 0
    })

    const handleUpdate = async () => {
        try {
            if (Object.values(values).reduce((acc, curr) => acc + Number(curr), 0) > 0) {
                await axios.post(UPDATE_URL, {
                    transaction_no,
                    timed_out,
                    ...values
                });

                setOpenInnerModal(false)
                if (timed_out) setOpenModal(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <>
            <table>
                <tr>
                    <td variant="h5">
                        <Typography>
                            Time
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Additional Time'
                            name="additional_time"
                            value={values.additional_time}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            inputProps={{ min: "0" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td variant="h5">
                        <Typography>
                            Amenities
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td style={{ width: "50%" }}>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Towels'
                            name="extra_towel"
                            value={values.extra_towel}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            inputProps={{ min: "0" }}
                        />
                    </td>
                    <td style={{ width: "50%" }}>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Pillows'
                            name="extra_pillow"
                            value={values.extra_pillow}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            inputProps={{ min: "0" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Blanket'
                            name="extra_blanket"
                            value={values.extra_blanket}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            fullWidth
                            inputProps={{ min: "0" }}
                        />
                    </td>
                    <td>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Single Bed'
                            name="extra_single_bed"
                            value={values.extra_single_bed}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            fullWidth
                            inputProps={{ min: "0" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Double Bed'
                            name="extra_double_bed"
                            value={values.extra_double_bed}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            fullWidth
                            inputProps={{ min: "0" }}
                        />
                    </td>
                    <td>
                        <TextField
                            variant="filled"
                            type="number"
                            label='Extra Person'
                            name="extra_person"
                            value={values.extra_person}
                            onChange={handleChange}
                            required
                            autoComplete='off'
                            fullWidth
                            inputProps={{ min: "0" }}
                        />
                    </td>
                </tr>
            </table>

            <div style={{ textAlign: "center", marginTop: "10%" }}>
                <Button variant="contained" onClick={() => handleUpdate()} sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenInnerModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </>
    )
}

export default Additional
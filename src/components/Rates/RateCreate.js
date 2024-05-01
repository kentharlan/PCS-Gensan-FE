import { TextField, Typography, Button } from "@mui/material"
import { useState } from "react";
import axios from '../../api/axios'

const initialValues = {
    name: '',
    garage: {
        hourly: '',
        three: '',
        six: '',
        twelve: '',
        twenty_four: ''
    },
    no_garage: {
        hourly: '',
        three: '',
        six: '',
        twelve: '',
        twenty_four: ''
    },
    extra_pillow: '',
    extra_towel: '',
    extra_small_bed: '',
    extra_bed: '',
    extra_person: ''
};

const CREATE_RATE_URL = "/rates/create";

const RateCreate = (props) => {
    const { setOpenModal } = props
    const [values, setValues] = useState(initialValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleGarageChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            garage: {
                ...values.garage,
                [name]: value
            }
        }));
    }

    const handleNoGarageChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            no_garage: {
                ...values.no_garage,
                [name]: value
            }
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(CREATE_RATE_URL, { ...values });
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tr>
                    <td colSpan={5}>
                        <TextField
                            variant="filled"
                            label='Rate Name'
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                            sx={{width: '15vw'}}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={5}>
                        <Typography variant="h6" sx={{ marginLeft: "1vw" }}>
                            With Garage
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Hourly'
                            name="hourly"
                            value={values.garage.hourly}
                            onChange={handleGarageChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='3 Hours'
                            name="three"
                            value={values.garage.three}
                            onChange={handleGarageChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='6 Hours'
                            name="six"
                            value={values.garage.six}
                            onChange={handleGarageChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='12 Hours'
                            name="twelve"
                            value={values.garage.twelve}
                            onChange={handleGarageChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='24 Hours'
                            name="twenty_four"
                            value={values.garage.twenty_four}
                            onChange={handleGarageChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={5}>
                        <Typography variant="h6" sx={{ marginLeft: "1vw" }}>
                            Without Garage
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Hourly'
                            name="hourly"
                            value={values.no_garage.hourly}
                            onChange={handleNoGarageChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='3 Hours'
                            name="three"
                            value={values.no_garage.three}
                            onChange={handleNoGarageChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='6 Hours'
                            name="six"
                            value={values.no_garage.six}
                            onChange={handleNoGarageChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='12 Hours'
                            name="twelve"
                            value={values.no_garage.twelve}
                            onChange={handleNoGarageChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='24 Hours'
                            name="twenty_four"
                            value={values.no_garage.twenty_four}
                            onChange={handleNoGarageChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={5}>
                        <Typography variant="h6" align="left" sx={{ marginLeft: "1vw" }}>
                            Amenities
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Extra Pillow'
                            name="extra_pillow"
                            value={values.extra_pillow}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Extra Towel'
                            name="extra_towel"
                            value={values.extra_towel}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Extra Small Bed'
                            name="extra_small_bed"
                            value={values.extra_small_bed}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Extra Bed'
                            name="extra_bed"
                            value={values.extra_bed}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                    <td>
                        <TextField
                            type="number"  
                            variant="filled"
                            label='Extra Person'
                            name="extra_person"
                            value={values.extra_person}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                            sx={{width: '10vw'}}
                        />
                    </td>
                </tr>
            </table>


            <div style={{ textAlign: "center" }}>
                <Button variant="contained" type="submit" sx={{ margin: "20px 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </form>
    )
}

export default RateCreate;
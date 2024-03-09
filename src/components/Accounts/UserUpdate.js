import { TextField, FormControlLabel, Checkbox, Button } from "@mui/material"
import { useState } from "react";
import axios from '../../api/axios'

const UPDATE_USER_URL = "/users/update/";

const UserUpdate = (props) => {
    const { user, setOpenModal } = props
    const initialValues = {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        admin: user.id === 1 ? true : user.admin
    };
    const [values, setValues] = useState(initialValues)

    const handeInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setValues({
            ...values,
            [name]: checked
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(UPDATE_USER_URL + user.id, { ...values });
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                variant="filled"
                label='First Name'
                name="first_name"
                value={values.first_name}
                onChange={handeInputChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 1% 2% 0" }}
            />
            <TextField
                variant="filled"
                label='Last Name'
                name="last_name"
                value={values.last_name}
                onChange={handeInputChange}
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 0 2% 1%" }}
            />
            <TextField
                variant="filled"
                label='Username'
                name="username"
                value={values.username}
                onChange={handeInputChange}
                fullWidth
                required
                autoComplete='off'
                sx={{ width: "49%", margin: "0 2% 2% 0" }}
            />
            <FormControlLabel
                label="Admin"
                control={
                    <Checkbox
                        name="admin"
                        checked={values.admin}
                        onChange={handleCheckBoxChange}
                        disabled={user.id === 1}
                    />
                }
            />
            <div style={{ textAlign: "center" }}>
                <Button variant="contained" type="submit" sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </form>
    )
}

export default UserUpdate;
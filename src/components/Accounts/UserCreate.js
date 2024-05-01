import { TextField, Button, MenuItem } from "@mui/material"
import { useState } from "react";
import axios from '../../api/axios'

const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    admin: false,
    password: '',
    confirmPassword: ''
};

const CREATE_USER_URL = "/users/create";

const UserCreate = (props) => {
    const { setOpenModal } = props
    const [values, setValues] = useState(initialValues)

    const handeInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(CREATE_USER_URL, { ...values });
            setValues(initialValues);
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tr>
                    <td>
                        <TextField
                            variant="filled"
                            label='First Name'
                            name="first_name"
                            value={values.first_name}
                            onChange={handeInputChange}
                            required
                            autoComplete='off'
                            sx={{ width: "100%", marginBottom: "1%" }}
                        />
                    </td>
                    <td>
                        <TextField
                            variant="filled"
                            label='Last Name'
                            name="last_name"
                            value={values.last_name}
                            onChange={handeInputChange}
                            required
                            autoComplete='off'
                            sx={{ width: "100%", marginBottom: "1%" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            variant="filled"
                            label='Username'
                            name="username"
                            value={values.username}
                            onChange={handeInputChange}
                            fullWidth
                            required
                            autoComplete='off'
                            sx={{ width: "100%", marginBottom: "1%" }}
                        />
                    </td>
                    <td>
                        <TextField
                            select
                            variant="filled"
                            label="Role"
                            name="admin"
                            value={values.admin}
                            onChange={handeInputChange}
                            required
                            autoComplete='off'
                            sx={{ width: "100%", marginBottom: "1%" }}
                        >
                            <MenuItem value={true}>Admin</MenuItem>
                            <MenuItem value={false}>User</MenuItem>
                        </TextField>
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            variant="filled"
                            label='Password'
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handeInputChange}
                            required
                            autoComplete='off'
                            sx={{ width: "100%", marginBottom: "1%" }}
                        />
                    </td>
                    <td>
                        <TextField
                            variant="filled"
                            label='Confirm Password'
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handeInputChange}
                            required
                            autoComplete='off'
                            sx={{ width: "100%", marginBottom: "1%" }}
                        />
                    </td>
                </tr>
            </table>

            <div style={{ textAlign: "center", marginTop: "3%" }}>
                <Button variant="contained" type="submit" sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </form>
    )
}

export default UserCreate;
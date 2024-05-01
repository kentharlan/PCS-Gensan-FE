import { TextField, Button, MenuItem } from "@mui/material"
import { useState } from "react";
import axios from '../../api/axios'

const UPDATE_USER_URL = "/users/update/";

const UserUpdate = (props) => {
    const { user, setOpenModal } = props
    const initialValues = {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        admin: user.admin
    };
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
            await axios.put(UPDATE_USER_URL + user.id, { ...values });
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
                            disabled={user.id == 1}
                        >
                            <MenuItem value={true}>Admin</MenuItem>
                            <MenuItem value={false}>User</MenuItem>
                        </TextField>
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

export default UserUpdate;
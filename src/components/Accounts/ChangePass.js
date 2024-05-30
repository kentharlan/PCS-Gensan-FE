import { TextField, Button } from "@mui/material"
import { useState } from "react";
import axios from '../../api/axios'

const initialValues = {
    password: '',
    confirm_password: ''
};
const CHANGE_PASSWORD_URL = "/users/password/";

const ChangePass = (props) => {
    const { id, setOpenModal } = props
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
            await axios.put(CHANGE_PASSWORD_URL + id, { password: values.password });
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
                            name="confirm_password"
                            value={values.confirm_password}
                            onChange={handeInputChange}
                            required
                            autoComplete='off'
                            sx={{ width: "100%", marginBottom: "1%" }}
                        />
                    </td>
                </tr>
            </table>

            <div style={{ textAlign: "center", marginTop: "3%"}}>
                <Button variant="contained" type="submit" sx={{ margin: "0 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </form>
    )
}

export default ChangePass;
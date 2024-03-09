import React, { useState } from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';
import axios from '../api/axios'
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/login';

function Login() {
    const papertStyle = { padding: 20, height: '40vh', width: 300, margin: '20vh auto' }
    const signIn = useSignIn();
    const navigate = useNavigate();

    const [username, setUser] = useState('')
    const [password, setPass] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(LOGIN_URL, { 
                username, 
                password 
            });
            
            const data = result?.data;
            
            signIn({
                token: data.token,
                expiresIn: 1440,
                tokenType: "Bearer",
                authState: { admin: data.admin, id: data.id }
            });

            navigate("/")
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Grid align='center'>
            <Paper elevation={10} style={papertStyle}>
                <h2>Gold Inn</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        onChange={(e) => setUser(e.target.value)}
                        value={username}
                        id="Username"
                        variant="filled"
                        label='Username'
                        fullWidth
                        autoComplete='off'
                        required
                        sx={{ marginBottom: "2%" }}
                    />
                    <TextField
                        onChange={(e) => setPass(e.target.value)}
                        value={password}
                        id="Password"
                        variant="filled"
                        label='Password'
                        fullWidth
                        type="password"
                        required
                        sx={{ marginBottom: "8%" }}
                    />
                    <Button variant="contained" type='submit'>Login</Button>
                </form>
            </Paper>
        </Grid>
    );
}



export default Login;

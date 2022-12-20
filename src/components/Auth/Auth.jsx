import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../../contexts/AuthContextProvider';
// import AuthRightForm from "./AuthRightForm";

export default function Auth() {
    const {
        email,
        password,
        errorMsg,
        hasAccount,
        setPassword,
        setEmail,
        setHasAccount,
        handleLogin,
        handleRegister,
        forgetPassword,
    } = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };
    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#121212',
                    color: 'white',
                    pt: '10%',
                }}
            >
                <Box
                    sx={{
                        width: '30%',
                        border: '1px solid #aeaeae',
                        margin: 'auto',
                        padding: 4,
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ pb: 4 }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: 26,
                            }}
                            variant="h5"
                        ></Typography>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: { xs: 14, sm: 16 },
                            }}
                        >
                            Email
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            sx={{ background: 'white', color: 'black' }}
                        />

                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                                Password
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={errorMsg}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                sx={{ background: 'white', color: 'black' }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        ></Box>
                        {hasAccount ? (
                            <Button
                                className="button_sign_in"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    fontWeight: 600,
                                    backgroundColor: 'white',
                                    height: '55px',
                                    marginBottom: '20px',
                                    color: 'black',
                                    transition: '1000s',
                                }}
                                onClick={() => {
                                    handleLogin();
                                }}
                            >
                                LogIn
                            </Button>
                        ) : (
                            <Button
                                className="button_register"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    fontWeight: 600,
                                    backgroundColor: 'white',
                                    height: '55px',
                                    marginBottom: '20px',
                                    color: 'black',
                                    transition: '1000s',
                                }}
                                onClick={() => {
                                    handleRegister();
                                }}
                            >
                                Register
                            </Button>
                        )}

                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Grid item>
                                {hasAccount ? (
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Link
                                            className="links"
                                            sx={{
                                                color: 'black',
                                                marginBottom: '100px',
                                                color: 'white',
                                            }}
                                            variant="body2"
                                            onClick={() =>
                                                setHasAccount(!hasAccount)
                                            }
                                        >
                                            {'Dont have account? Register now!'}
                                        </Link>
                                        <Link
                                            variant="body2"
                                            sx={{
                                                display: 'block',
                                                color: 'white',
                                            }}
                                        >
                                            Forgot Password?
                                        </Link>
                                    </Box>
                                ) : (
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Link
                                            variant="body2"
                                            className="links"
                                            sx={{
                                                color: 'black',
                                                marginBottom: '100px',
                                                color: 'white',
                                            }}
                                            onClick={() =>
                                                setHasAccount(!hasAccount)
                                            }
                                        >
                                            {'Already have account? Log In!'}
                                        </Link>
                                        <Link
                                            variant="body2"
                                            sx={{
                                                display: 'block',
                                                color: 'white',
                                            }}
                                            onClick={() => forgetPassword()}
                                        >
                                            Forgot Password?
                                        </Link>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

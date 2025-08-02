import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Box, TextField, Button, Typography, Paper, Container, InputAdornment, IconButton} from "@mui/material";
import {Visibility, VisibilityOff, Email, Lock} from "@mui/icons-material";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import {useAuth} from "../../contexts/AuthProvider";

const Login = () => {
    const navigate = useNavigate()
    const { user, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('Test123!');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            user.superAdmin?navigate('/superadmin'):navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <Container maxWidth="sm" sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            py: 4
        }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h1" sx={{ color: 'primary.main', mb: 1 }}>
                    Welcome Back
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Sign in to your account
                </Typography>
            </Box>
            
            <Paper 
                elevation={0} 
                sx={{ 
                    p: 6, 
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F7FAFC 100%)',
                }}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                    />
                    
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Lozinka"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                    />
                    
                    <Button 
                        type="submit" 
                        variant="contained" 
                        size="large"
                        sx={{ 
                            py: 2, 
                            mt: 2, 
                            fontSize: '1rem',
                            background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)',
                            }
                        }}
                    >
                        Prijavi se
                    </Button>
                    
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Nemate korisnički račun?
                        </Typography>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Typography variant="body2" color="secondary" sx={{ fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
                                Registriraj se
                            </Typography>
                        </Link>
                        
                        <Box sx={{ mt: 2 }}>
                            <Link to="/reset" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', '&:hover': { color: 'secondary.main' } }}>
                                    Zaboravili ste lozinku?
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;
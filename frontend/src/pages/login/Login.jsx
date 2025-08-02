import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Box, TextField, Button, Typography, Paper, Container} from "@mui/material";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import {useAuth} from "../../contexts/AuthProvider";

const Login = () => {
    const navigate = useNavigate()
    const { user, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('Test123!');

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
        <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <TitleContainer title={"Prijava"} description={"Prijavi se!"} />
            
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    mt: -2, 
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                    
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Lozinka"
                        type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                    
                    <Button 
                        type="submit" 
                        variant="contained" 
                        size="large"
                        sx={{ py: 1.5, mt: 2 }}
                    >
                        Prijavi se
                    </Button>
                    
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Nemate korisnički račun?
                        </Typography>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                                Registriraj se
                            </Typography>
                        </Link>
                        
                        <Box sx={{ mt: 2 }}>
                            <Link to="/reset" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" color="secondary" sx={{ fontSize: '0.875rem' }}>
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
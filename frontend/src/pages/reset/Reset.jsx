import React from "react";
import {Box, TextField, Button, Typography, Paper, Container, InputAdornment, IconButton} from "@mui/material";
import {Visibility, VisibilityOff, Lock} from "@mui/icons-material";
import TitleContainer from "../../components/titleContainer/TitleContainer";

const Reset = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
                    Reset Password
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Enter your new password below
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
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Unesite novu lozinku"
                        type={showPassword ? 'text' : 'password'}
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
                    
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Potvrdite novu lozinku"
                        type={showConfirmPassword ? 'text' : 'password'}
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
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                        onClick={() => {}}
                    >
                        Resetiraj lozinku
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Reset;
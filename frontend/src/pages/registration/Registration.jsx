import React, { useState } from "react";
import {Box, TextField, Button, Typography, Paper, Container, Alert, InputAdornment, IconButton} from "@mui/material";
import {Visibility, VisibilityOff, Email, Person, Badge, Lock} from "@mui/icons-material";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    jmbag: "",
    password: "",
    repeatPassword: "",
};

const Registration = () => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [statusMsg, setStatusMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const navigate = useNavigate();

    /* ------------- HELPER VALIDATORS ------------- */

    const isBlank = (v) => !v.trim();

    const isValidEmail = (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // @ValidEmail: osnovna provjera

    const isValidJmbag = (v) =>
        /^\d{10}$/.test(v); // @ValidJmbag: 10 znamenki (česti format)

    const isValidPassword = (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,30}$/.test(v);
    // Pokriva min 8, max 30, barem 1 veliko, malo, broj, specijalni znak

    const validate = () => {
        const e = {};

        // firstName & lastName
        if (isBlank(form.firstName)) e.firstName = "Ime je obvezno";
        else if (form.firstName.length > 30)
            e.firstName = "Ime je predugo (max 30)";

        if (isBlank(form.lastName)) e.lastName = "Prezime je obvezno";
        else if (form.lastName.length > 30)
            e.lastName = "Prezime je predugo (max 30)";

        // JMBAG
        if (isBlank(form.jmbag)) e.jmbag = "JMBAG je obvezan";
        else if (!isValidJmbag(form.jmbag))
            e.jmbag = "JMBAG mora imati točno 10 znamenki";

        // Email
        if (isBlank(form.email)) e.email = "Email je obvezan";
        else if (form.email.length > 50) e.email = "Email je predug (max 50)";
        else if (!isValidEmail(form.email)) e.email = "Email nije valjan";

        // Password & repeatPassword
        if (isBlank(form.password)) e.password = "Lozinka je obvezna";
        else if (!isValidPassword(form.password))
            e.password =
                "Lozinka mora imati 8-30 znakova, veliko slovo, malo slovo, broj i specijalni znak";

        if (isBlank(form.repeatPassword))
            e.repeatPassword = "Ponovljena lozinka je obvezna";
        else if (form.password !== form.repeatPassword)
            e.repeatPassword = "Lozinke se ne podudaraju";

        return e;
    };

    /* ------------- EVENT HANDLERS ------------- */

    const handleChange = ({ target: { name, value } }) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined })); // briši staru grešku po polju
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        try {
            await api.post(
                "auth/register",
                {
                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    jmbag: form.jmbag.trim(),
                    email: form.email.trim(),
                    password: form.password,
                    repeatPassword: form.repeatPassword,
                },
                { headers: { "Content-Type": "application/json" } }
            );

            setStatusMsg("Registracija uspješna! Preusmjeravam na prijavu…");
            setTimeout(() => navigate("/login"), 1700);
        } catch (err) {
            console.error(err);
            setStatusMsg(
                err.response?.data?.message ??
                "Došlo je do pogreške prilikom registracije."
            );
        }
    };

    /* ------------- RENDER ------------- */

    const renderError = (field) =>
        errors[field] && <span className="error-msg">{errors[field]}</span>;

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
                    Create Account
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Join the community today
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Ime"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Prezime"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 50 }}
                        error={!!errors.email}
                        helperText={errors.email}
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
                        label="JMBAG (10 znamenki)"
                        name="jmbag"
                        type="text"
                        value={form.jmbag}
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 10 }}
                        error={!!errors.jmbag}
                        helperText={errors.jmbag}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Badge sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Lozinka"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        required
                        inputProps={{ minLength: 8, maxLength: 30 }}
                        error={!!errors.password}
                        helperText={errors.password}
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
                        label="Ponovi lozinku"
                        name="repeatPassword"
                        type={showRepeatPassword ? 'text' : 'password'}
                        value={form.repeatPassword}
                        onChange={handleChange}
                        required
                        inputProps={{ minLength: 8, maxLength: 30 }}
                        error={!!errors.repeatPassword}
                        helperText={errors.repeatPassword}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                        edge="end"
                                    >
                                        {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
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
                        Registriraj se
                    </Button>

                    {statusMsg && (
                        <Alert severity={statusMsg.includes('uspješna') ? 'success' : 'error'} sx={{ mt: 2 }}>
                            {statusMsg}
                        </Alert>
                    )}

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Već imate račun?
                        </Typography>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Typography variant="body2" color="secondary" sx={{ fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
                                Prijavi se
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Registration;

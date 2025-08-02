import React, { useState } from "react";
import {Box, TextField, Button, Typography, Paper, Container, Alert} from "@mui/material";
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
        <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <TitleContainer
                title="Registracija"
                description="Registriraj se da bi se mogao pridružiti sekcijama"
            />

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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Lozinka"
                        name="password"
                        type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                        inputProps={{ minLength: 8, maxLength: 30 }}
                        error={!!errors.password}
                        helperText={errors.password}
                />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Ponovi lozinku"
                        name="repeatPassword"
                        type="password"
                    value={form.repeatPassword}
                    onChange={handleChange}
                    required
                        inputProps={{ minLength: 8, maxLength: 30 }}
                        error={!!errors.repeatPassword}
                        helperText={errors.repeatPassword}
                />

                    <Button 
                        type="submit" 
                        variant="contained" 
                        size="large"
                        sx={{ py: 1.5, mt: 2 }}
                    >
                        Registriraj se
                    </Button>

                    {statusMsg && (
                        <Alert severity={statusMsg.includes('uspješna') ? 'success' : 'error'} sx={{ mt: 2 }}>
                            {statusMsg}
                        </Alert>
                    )}

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Već imate račun?
                        </Typography>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
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

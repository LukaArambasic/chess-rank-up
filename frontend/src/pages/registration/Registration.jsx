import React, { useState } from "react";
import'./Registration.css';
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
        <div className="container">
            <TitleContainer
                title="Registracija"
                description="Registriraj se da bi se mogao pridružiti sekcijama"
            />

            <form className="forma" onSubmit={handleSubmit} noValidate>
                <input
                    name="firstName"
                    type="text"
                    className="inputStyle"
                    placeholder="Ime"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    maxLength={30}
                />
                {renderError("firstName")}

                <input
                    name="lastName"
                    type="text"
                    className="inputStyle"
                    placeholder="Prezime"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    maxLength={30}
                />
                {renderError("lastName")}

                <input
                    name="email"
                    type="email"
                    className="inputStyle"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    maxLength={50}
                />
                {renderError("email")}

                <input
                    name="jmbag"
                    type="text"
                    className="inputStyle"
                    placeholder="JMBAG (10 znamenki)"
                    value={form.jmbag}
                    onChange={handleChange}
                    required
                    maxLength={10}
                />
                {renderError("jmbag")}

                <input
                    name="password"
                    type="password"
                    className="inputStyle"
                    placeholder="Lozinka"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    maxLength={30}
                />
                {renderError("password")}

                <input
                    name="repeatPassword"
                    type="password"
                    className="inputStyle"
                    placeholder="Ponovi lozinku"
                    value={form.repeatPassword}
                    onChange={handleChange}
                    required
                    minLength={8}
                    maxLength={30}
                />
                {renderError("repeatPassword")}

                <input type="submit" id="submitButton" value="Registriraj se" />

                {statusMsg && <p className="status-msg">{statusMsg}</p>}

                <div className="prijava-link">
                    <p>
                        Već imate račun? <br />
                        <Link to="/login">Prijavi se</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Registration;

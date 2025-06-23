import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
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
        <div className="container">
            <TitleContainer title={"Prijava"} description={"Prijavi se!"} />
            <form className="forma" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="inputStyle"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="inputStyle"
                    placeholder="Lozinka"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <input type="submit" id="submitButton" value="Prijavi se"/>

                <div className="prijava-link">
                    <p>Nemate korisnički račun? <br /> <Link to="/register"> Registriraj se</Link> </p>
                    <Link to="/reset"> <span className="ak">Zaboravili ste lozinku?</span></Link>
                </div>
            </form> 
        </div>
    );
}

export default Login;
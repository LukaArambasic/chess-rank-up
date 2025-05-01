import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import {useAuth} from "../../contexts/AuthProvider";

const Login = () => {
    const navigate = useNavigate()
    const { user, login } = useAuth();
    const [email, setEmail] = useState('jj56789@fer.hr');
    const [password, setPassword] = useState('password1');

    useEffect(() => {
        if (user) {

            navigate('/');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Here")
        await login(email, password);
        navigate('/');

    }

    return (
        <div className="container">
            <TitleContainer title={"Prijava"} description={"Prijavi se!"} />
            <form className="forma" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="inputStyle"
                    placeholder="Email"
                    value="jj56789@fer.hr"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="inputStyle"
                    placeholder="Lozinka"
                    value="password1"
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
import {createContext, useContext, useState, useEffect} from "react";
import api from "../api";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        let errorText = null;
        let errorTrue = false;
        console.log("Now here", email, password);
        await api.post('auth/login', {email:email, password:password})
            .then(response => {
                localStorage.setItem('token', response.data.token);
                let user = response.data.user;
                user = {...user, id: response.data.id, role:response.data.isAdmin};
                setUser(user);})
            .catch(error => {
                console.log("Erroroorroroorrorooror")
                logout()
            })
    }

    const logout = () => {
        const token = localStorage.getItem('token');
        if (token) localStorage.removeItem('token');
        setUser(null);
    }

    const checkUser = async () => {
        await api.get('auth/me')
            .then(response => {
                console.log("Me called", response.data.user);
                let successUser = response.data.user;
                successUser = {...successUser, id: response.data.id};
                setUser(successUser);
            })
            .catch(error => logout());
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) checkUser();
    },[])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = () => useContext(AuthContext);
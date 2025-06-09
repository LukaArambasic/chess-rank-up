import {createContext, useContext, useState, useEffect} from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {

        await api.post('auth/login', {email:email, password:password})
            .then(response => {
                localStorage.setItem('token', response.data.token);
                let user = response.data.user;
                user = {...user, id: response.data.id, superAdmin:response.data.superAdmin};
                setUser(user);})
            .catch(_ => {
                console.log("Erroroorroroorrorooror")
                logout()
            })
    }

    const logout = () => {
        const token = localStorage.getItem('token');
        if (token) localStorage.removeItem('token');
        setUser(null);
    }

    async function checkUser() {
        await api.get('auth/me')
            .then(response => {
                let successUser = response.data.user;
                successUser = {...successUser, id: response.data.id};
                setUser(successUser);
                setLoading(false);
            })
            .catch(_ => {
                logout();
                setLoading(false);
            });
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
            checkUser();
        } else {
            setLoading(false);
        }
    },[])

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = () => useContext(AuthContext);
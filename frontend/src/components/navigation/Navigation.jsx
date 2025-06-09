import React, { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faUser, faTrophy, faQuestion, faUserDoctor} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'
import "./Navigation.css"
import {useSection} from "../../contexts/SectionProvider";
import {useAuth} from "../../contexts/AuthProvider";


const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const {sectionId, sectionRole} = useSection();
    const {user, logout} = useAuth();
    const [mode, setMode] = useState('unregistered');

    useEffect(()=>{
        if (!user) {
            setMode('unregistered');
        } else if (user && sectionRole===undefined) {
            setMode("registered");
        } else if (user && sectionRole==="user") {
            setMode("user")
        } else if (user && sectionRole==="admin") {
            setMode("admin")
        } else if (user && sectionRole==="superadmin") {
            setMode("superadmin")
        }
    },[user, sectionRole]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    const handleLogin = () => {
        navigate("/login")
    }

    const handleNavigate = (path) => {
        if (sectionId) {
            navigate(path);
        } else {
            navigate('/my-sections')
        }
    }

    return (
        <div id='navbarContainer'>
            <div id="navbarIcon" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} size={'lg'}/>
            </div>
            {isOpen && (
                <div className='openNavBar'>
                    <div id="navbarIcon2" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faTimes} size={'lg'}/>
                    </div>
                    {mode==="registered" && (
                        <ul id='navbarList'>
                            <li><a onClick={()=>navigate("/")}><FontAwesomeIcon icon={faHome} /> Home</a></li>
                            <li><a onClick={()=>navigate("/about")}><FontAwesomeIcon icon={faQuestion} /> O aplikaciji</a></li>
                            <li><button id='navbarButton' onClick={handleLogout}>Odjava</button></li>
                        </ul>
                    )}
                    {mode==="user" && (
                        <ul id='navbarList'>
                            <li><a onClick={()=>navigate("/")}><FontAwesomeIcon icon={faHome} /> Home</a></li>
                            <li><a onClick={()=>handleNavigate(`/profile`)}><FontAwesomeIcon icon={faUser} /> Profil</a></li>
                            <li><a onClick={()=>handleNavigate(`/scoreboard`)} ><FontAwesomeIcon icon={faTrophy} /> Scoreboard</a></li>
                            <li><a onClick={()=>navigate("/about")}><FontAwesomeIcon icon={faQuestion} /> O aplikaciji</a></li>
                            <li><button id='navbarButton' onClick={handleLogout}>Odjava</button></li>    
                        </ul>
                    )}
                    {mode==="admin" && (
                        <ul id='navbarList'>
                            <li><a onClick={()=>navigate("/")}><FontAwesomeIcon icon={faHome} /> Home</a></li>
                            <li><a onClick={()=>handleNavigate(`/admin`)}><FontAwesomeIcon icon={faUserDoctor} /> Admin</a></li>
                            <li><a onClick={()=>navigate("/about")}><FontAwesomeIcon icon={faQuestion} /> O aplikaciji</a></li>
                            <li><button id='navbarButton' onClick={handleLogout}>Odjava</button></li>
                        </ul>
                    )}
                    {mode==="superadmin" && (
                        <ul id='navbarList'>
                            <li><a onClick={()=>handleNavigate(`/superadmin`)}><FontAwesomeIcon icon={faUserDoctor} /> Superadmin</a></li>
                            <li><a onClick={()=>navigate("/about")}><FontAwesomeIcon icon={faQuestion} /> O aplikaciji</a></li>
                            <li><button id='navbarButton' onClick={handleLogout}>Odjava</button></li>
                        </ul>
                    )}
                    {mode==="unregistered" && (
                        <ul id='navbarList'>
                            <li><a onClick={()=>navigate("/")}><FontAwesomeIcon icon={faHome} /> Home</a></li>
                            <li><a onClick={()=>navigate("/about")}><FontAwesomeIcon icon={faQuestion} /> O aplikaciji</a></li>
                            <li><button id='navbarButton' onClick={handleLogin}>Prijava</button></li>    
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navigation;
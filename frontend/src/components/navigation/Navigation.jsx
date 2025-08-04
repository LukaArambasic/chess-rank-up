import React, { useEffect } from 'react';
import { useState } from 'react';
import { Switch, FormControlLabel, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faUser, faTrophy, faQuestion, faUserDoctor, faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'
import "./Navigation.css"
import {useSection} from "../../contexts/SectionProvider";
import {useAuth} from "../../contexts/AuthProvider";
import {useTheme} from "../../contexts/ThemeContext";


const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const {sectionId, sectionRole} = useSection();
    const {user, logout} = useAuth();
    const {mode: themeMode, toggleTheme} = useTheme();
    const [userMode, setUserMode] = useState('unregistered');

    useEffect(()=>{
        if (!user) {
            setUserMode('unregistered');
        } else if (user && sectionRole===undefined) {
            setUserMode("registered");
        } else if (user && sectionRole==="user") {
            setUserMode("user")
        } else if (user && sectionRole==="admin") {
            setUserMode("admin")
        } else if (user && sectionRole==="superadmin") {
            setUserMode("superadmin")
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
                    {userMode==="registered" && (
                        <ul id='navbarList'>
                            <li><a onClick={()=>navigate("/")}><FontAwesomeIcon icon={faHome} /> Home</a></li>
                            <li><a onClick={()=>navigate("/about")}><FontAwesomeIcon icon={faQuestion} /> O aplikaciji</a></li>
                            <li>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', px: 2 }}>
                                    <FontAwesomeIcon icon={faSun} />
                                    <Switch 
                                        checked={themeMode === 'dark'} 
                                        onChange={toggleTheme}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#805AD5',
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#805AD5',
                                            },
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faMoon} />
                                </Box>
                            </li>
                            <li><button id='navbarButton' onClick={handleLogout}>Odjava</button></li>
                        </ul>
                    )}
                    {userMode==="user" && (
                        <ul id='navbarList'>
                            <li><a onClick={()=>navigate("/")}><FontAwesomeIcon icon={faHome} /> Home</a></li>
                            <li><a onClick={()=>handleNavigate(`/profile`)}><FontAwesomeIcon icon={faUser} /> Profil</a></li>
                            <li><a onClick={()=>handleNavigate(`/scoreboard`)} ><FontAwesomeIcon icon={faTrophy} /> Scoreboard</a></li>
                            <li><a onClick={()=>navigate("/about")}><FontAwesomeIcon icon={faQuestion} /> O aplikaciji</a></li>
                            <li>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', px: 2 }}>
                                    <FontAwesomeIcon icon={faSun} />
                                    <Switch 
                                        checked={themeMode === 'dark'} 
                                        onChange={toggleTheme}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#805AD5',
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#805AD5',
                                            },
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faMoon} />
                                </Box>
                            </li>
                            <li><button id='navbarButton' onClick={handleLogout}>Odjava</button></li>    
                        </ul>
                    )}
                    {userMode==="admin" && (
                        <ul id='navbarList'>
                            <li><a onClick={()=>navigate("/")}><FontAwesomeIcon icon={faHome} /> Home</a></li>
                            <li><a onClick={()=>handleNavigate(`/admin`)}><FontAwesomeIcon icon={faUserDoctor} /> Admin</a></li>
                            <li><a onClick={()=>navigate("/about")}><FontAwesomeIcon icon={faQuestion} /> O aplikaciji</a></li>
                            <li>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', px: 2 }}>
                                    <FontAwesomeIcon icon={faSun} />
                                    <Switch 
                                        checked={themeMode === 'dark'} 
                                        onChange={toggleTheme}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#805AD5',
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#805AD5',
                                            },
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faMoon} />
                                </Box>
                            </li>
                            <li><button id='navbarButton' onClick={handleLogout}>Odjava</button></li>
                        </ul>
                    )}
                    {userMode==="superadmin" && (
                        <ul id='navbarList'>
                            <li><a onClick={()=>handleNavigate(`/superadmin`)}><FontAwesomeIcon icon={faUserDoctor} /> Superadmin</a></li>
                            <li><a onClick={()=>navigate("/about")}><FontAwesomeIcon icon={faQuestion} /> O aplikaciji</a></li>
                            <li>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', px: 2 }}>
                                    <FontAwesomeIcon icon={faSun} />
                                    <Switch 
                                        checked={themeMode === 'dark'} 
                                        onChange={toggleTheme}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#805AD5',
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#805AD5',
                                            },
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faMoon} />
                                </Box>
                            </li>
                            <li><button id='navbarButton' onClick={handleLogout}>Odjava</button></li>
                        </ul>
                    )}
                    {userMode==="unregistered" && (
                        <ul id='navbarList'>
                            <li><a onClick={()=>navigate("/")}><FontAwesomeIcon icon={faHome} /> Home</a></li>
                            <li><a onClick={()=>navigate("/about")}><FontAwesomeIcon icon={faQuestion} /> O aplikaciji</a></li>
                            <li>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', px: 2 }}>
                                    <FontAwesomeIcon icon={faSun} />
                                    <Switch 
                                        checked={themeMode === 'dark'} 
                                        onChange={toggleTheme}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#805AD5',
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#805AD5',
                                            },
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faMoon} />
                                </Box>
                            </li>
                            <li><button id='navbarButton' onClick={handleLogin}>Prijava</button></li>    
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navigation;
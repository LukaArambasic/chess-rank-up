import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Container,
  Divider,
  Avatar,
  Stack
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  EmojiEvents as TrophyIcon,
  Help as HelpIcon,
  AdminPanelSettings as AdminIcon,
  SupervisorAccount as SuperAdminIcon,
  Logout as LogoutIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSection } from "../../contexts/SectionProvider";
import { useAuth } from "../../contexts/AuthProvider";

const TitleContainer = ({ title, description }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { sectionId, sectionRole } = useSection();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
        setDrawerOpen(false);
    };

    const handleLogin = () => {
        navigate("/login");
        setDrawerOpen(false);
    };

    const handleNavigate = (path) => {
        if (sectionId) {
            navigate(path);
        } else {
            navigate('/my-sections');
        }
        setDrawerOpen(false);
    };

    const getMenuItems = () => {
        if (!user) {
            return [
                { text: 'Home', icon: <HomeIcon />, action: () => navigate("/") },
                { text: 'O aplikaciji', icon: <HelpIcon />, action: () => navigate("/about") },
                { text: 'Prijava', icon: <LoginIcon />, action: handleLogin, primary: true }
            ];
        }

        if (user && !sectionRole) {
            return [
                { text: 'Home', icon: <HomeIcon />, action: () => navigate("/") },
                { text: 'O aplikaciji', icon: <HelpIcon />, action: () => navigate("/about") },
                { text: 'Odjava', icon: <LogoutIcon />, action: handleLogout, primary: true }
            ];
        }

        const baseItems = [
            { text: 'Home', icon: <HomeIcon />, action: () => navigate("/") }
        ];

        if (sectionRole === "user") {
            baseItems.push(
                { text: 'Profil', icon: <PersonIcon />, action: () => handleNavigate('/profile') },
                { text: 'Scoreboard', icon: <TrophyIcon />, action: () => handleNavigate('/scoreboard') }
            );
        } else if (sectionRole === "admin") {
            baseItems.push(
                { text: 'Admin', icon: <AdminIcon />, action: () => handleNavigate('/admin') }
            );
        } else if (sectionRole === "superadmin") {
            baseItems.push(
                { text: 'Superadmin', icon: <SuperAdminIcon />, action: () => handleNavigate('/superadmin') }
            );
        }

        baseItems.push(
            { text: 'O aplikaciji', icon: <HelpIcon />, action: () => navigate("/about") },
            { text: 'Odjava', icon: <LogoutIcon />, action: handleLogout, primary: true }
        );

        return baseItems;
    };

    return (
        <>
            <AppBar 
                position="static" 
                sx={{ 
                    background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)',
                    boxShadow: '0 4px 20px rgba(128, 90, 213, 0.3)'
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDrawerOpen(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {title}
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            {description}
                        </Typography>
                    </Box>

                    {user && (
                        <Avatar 
                            sx={{ 
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                border: '2px solid rgba(255, 255, 255, 0.3)'
                            }}
                        >
                            {user.firstName?.[0]}{user.lastName?.[0]}
                        </Avatar>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: 280,
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #F7FAFC 100%)',
                    }
                }}
            >
                <Box sx={{ p: 3, background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)', color: 'white' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                                {user ? `${user.firstName?.[0]}${user.lastName?.[0]}` : 'G'}
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {user ? `${user.firstName} ${user.lastName}` : 'Gost'}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                    {sectionRole === 'admin' ? 'Administrator' : 
                                     sectionRole === 'superadmin' ? 'Superadministrator' : 
                                     sectionRole === 'user' ? 'Član' : 'Neprijavljen'}
                                </Typography>
                            </Box>
                        </Stack>
                        <IconButton 
                            onClick={() => setDrawerOpen(false)}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Box>

                <List sx={{ pt: 2 }}>
                    {getMenuItems().map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                onClick={item.action}
                                sx={{
                                    mx: 1,
                                    mb: 0.5,
                                    borderRadius: 2,
                                    ...(item.primary && {
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                        }
                                    })
                                }}
                            >
                                <ListItemIcon sx={{ 
                                    color: item.primary ? 'white' : 'primary.main',
                                    minWidth: 40 
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: item.primary ? 600 : 500
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default TitleContainer;
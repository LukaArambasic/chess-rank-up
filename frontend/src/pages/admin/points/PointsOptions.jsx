import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Paper,
  Avatar,
  Stack,
  Chip
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  AutoMode as AutoModeIcon,
  TrendingUp,
  Speed,
  Assessment,
  Timeline
} from '@mui/icons-material';
import TitleContainer from "../../../components/titleContainer/TitleContainer";

const PointsOptions = () => {
    const navigate = useNavigate();
    
    const pointsOptions = [
        {
            id: 1, 
            name: "Manualno", 
            title: "Manualni Unos",
            description: "Dodijeli bodove pojedinačno za specifične članove i događanja",
            to: "manual",
            icon: <PersonAddIcon sx={{ fontSize: 48 }} />,
            gradient: "linear-gradient(135deg, #38A169 0%, #2F855A 100%)",
            color: "#38A169",
            badge: "Precizno",
            stats: "Individualno"
        },
        {
            id: 2, 
            name: "Automatski", 
            title: "Automatski Unos",
            description: "Uvezi CSV/TXT datoteku za brzi unos većeg broja sudionika",
            to: "automatic",
            icon: <AutoModeIcon sx={{ fontSize: 48 }} />,
            gradient: "linear-gradient(135deg, #805AD5 0%, #553C9A 100%)",
            color: "#805AD5",
            badge: "Efikasno",
            stats: "Masovni unos"
        }
    ];

    const handleClick = (option) => {
        navigate(option.to);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <TitleContainer title="Upravljanje Bodovima" description="Odaberite način dodjeljivanja bodova" />
            
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Header Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        mb: 4,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: 3,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -50,
                            right: -50,
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            animation: 'pulse 4s ease-in-out infinite'
                        }}
                    />
                    
                    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 3 }}>
                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 60, height: 60 }}>
                                <TrendingUp sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 60, height: 60 }}>
                                <Assessment sx={{ fontSize: 32 }} />
                            </Avatar>
                        </Stack>
                        
                        <Typography variant="h3" component="h1" gutterBottom sx={{ 
                            fontWeight: 700,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            mb: 2
                        }}>
                            Sustav Bodovanja
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            Odaberite način dodjeljivanja bodova članovima sekcije
                        </Typography>
                    </Box>
                </Paper>

                {/* Main Options */}
                <Grid container spacing={4} justifyContent="center">
                    {pointsOptions.map((option, index) => (
                        <Grid item xs={12} md={6} key={option.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    background: option.gradient,
                                    color: 'white',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    transform: 'perspective(1000px) rotateX(0deg)',
                                    '&:hover': {
                                        transform: 'perspective(1000px) rotateX(-5deg) translateY(-12px)',
                                        boxShadow: `0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px ${option.color}40`,
                                    }
                                }}
                            >
                                {/* Animated background */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -30,
                                        right: -30,
                                        width: 120,
                                        height: 120,
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        animation: 'float 6s ease-in-out infinite',
                                        animationDelay: `${index * 0.5}s`
                                    }}
                                />
                                
                                <CardActionArea
                                    onClick={() => handleClick(option)}
                                    sx={{ height: '100%', p: 4 }}
                                >
                                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 0 }}>
                                        {/* Badge */}
                                        <Box sx={{ mb: 2 }}>
                                            <Chip
                                                label={option.badge}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem',
                                                    backdropFilter: 'blur(10px)'
                                                }}
                                            />
                                        </Box>

                                        {/* Icon */}
                                        <Box sx={{ mb: 3, textAlign: 'center' }}>
                                            <Box
                                                sx={{
                                                    display: 'inline-flex',
                                                    p: 2,
                                                    borderRadius: '50%',
                                                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                                                    backdropFilter: 'blur(10px)',
                                                    border: '2px solid rgba(255, 255, 255, 0.2)'
                                                }}
                                            >
                                                {option.icon}
                                            </Box>
                                        </Box>

                                        {/* Content */}
                                        <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
                                            <Typography variant="h4" component="h2" gutterBottom sx={{ 
                                                fontWeight: 700,
                                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                                mb: 2
                                            }}>
                                                {option.title}
                                            </Typography>
                                            
                                            <Typography variant="body1" sx={{ 
                                                opacity: 0.95,
                                                lineHeight: 1.6,
                                                fontWeight: 400,
                                                mb: 2
                                            }}>
                                                {option.description}
                                            </Typography>

                                            <Chip
                                                label={option.stats}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                                    color: 'white',
                                                    fontWeight: 600
                                                }}
                                            />
                                        </Box>

                                        {/* Action indicator */}
                                        <Box sx={{ 
                                            mt: 3, 
                                            textAlign: 'center',
                                            opacity: 0.8
                                        }}>
                                            <Typography variant="caption" sx={{ 
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                fontWeight: 600
                                            }}>
                                                Kliknite za pristup →
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Bottom Section */}
                <Paper
                    elevation={0}
                    sx={{
                        mt: 6,
                        p: 4,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                        color: 'white',
                        borderRadius: 3
                    }}
                >
                    <Timeline sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        Efikasno upravljanje bodovima
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Odaberite metodu koja najbolje odgovara vašim potrebama
                    </Typography>
                </Paper>
            </Container>

            <style jsx>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.1); opacity: 0.2; }
                    100% { transform: scale(1); opacity: 0.1; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(180deg); }
                }
            `}</style>
        </Box>
    );
}

export default PointsOptions;
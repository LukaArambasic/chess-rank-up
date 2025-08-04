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
  Add as AddIcon,
  List as ListIcon,
  EmojiEvents,
  Speed,
  LocalFireDepartment,
  Timeline
} from '@mui/icons-material';
import TitleContainer from "../../../components/titleContainer/TitleContainer";

const EventsOptions = () => {
    const navigate = useNavigate();
    
    const eventOptions = [
        {
            id: 1, 
            name: "Dodaj događanje", 
            title: "Kreiraj Novo Događanje",
            description: "Stvori novo događanje za svoju sekciju s detaljnim postavkama",
            to: "add",
            icon: <AddIcon sx={{ fontSize: 48 }} />,
            gradient: "linear-gradient(135deg, #38A169 0%, #2F855A 100%)",
            color: "#38A169",
            badge: "➕ KREIRANJE",
            stats: "Brzo i jednostavno"
        },
        {
            id: 2, 
            name: "Sva događanja", 
            title: "Upravljaj Događanjima",
            description: "Pregled, uređivanje i brisanje svih postojećih događanja",
            to: "all",
            icon: <ListIcon sx={{ fontSize: 48 }} />,
            gradient: "linear-gradient(135deg, #805AD5 0%, #553C9A 100%)",
            color: "#805AD5",
            badge: "📋 UPRAVLJANJE",
            stats: "Kompletna kontrola"
        }
    ];

    const handleClick = (option) => {
        navigate(option.to);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <TitleContainer title="🔥 DOGAĐANJA ADMIN" description="Upravljaj događanjima kao pravi šef!" />
            
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Epic Hero Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        mb: 4,
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
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
                                <EmojiEvents sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 60, height: 60 }}>
                                <LocalFireDepartment sx={{ fontSize: 32 }} />
                            </Avatar>
                        </Stack>
                        
                        <Typography variant="h2" component="h1" gutterBottom sx={{ 
                            fontWeight: 900,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            mb: 2
                        }}>
                            DOGAĐANJA KONTROLA
                        </Typography>
                        <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            Kreiraj nezaboravne trenutke za svoju sekciju! 🚀
                        </Typography>
                    </Box>
                </Paper>

                {/* Main Options */}
                <Grid container spacing={4} justifyContent="center">
                    {eventOptions.map((option, index) => (
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
                                                    fontWeight: 700,
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
                                                KLIKNI ZA PRISTUP →
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Bottom Motivation */}
                <Paper
                    elevation={0}
                    sx={{
                        mt: 6,
                        p: 4,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: 3
                    }}
                >
                    <Timeline sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                        Kreiraj nezaboravne trenutke! 💪
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Svako događanje je prilika za stvaranje legendi! 🔥
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

export default EventsOptions;
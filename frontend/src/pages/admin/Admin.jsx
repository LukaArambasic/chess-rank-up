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
  Chip,
  Divider
} from '@mui/material';
import {
  AdminPanelSettings,
  EmojiEvents,
  TrendingUp,
  Groups,
  Assessment,
  Security,
  Speed,
  Star,
  LocalFireDepartment,
  Shield,
  Timeline,
  ManageAccounts
} from '@mui/icons-material';
import TitleContainer from "../../components/titleContainer/TitleContainer";

const Admin = () => {
    const navigate = useNavigate();
    
    const adminOptions = [
        {
            id: 1, 
            name: "Događanja", 
            title: "Upravljanje Događanjima",
            description: "Kreiraj, uredi i upravljaj svim događanjima sekcije",
            to: "events",
            icon: <EmojiEvents sx={{ fontSize: 48 }} />,
            gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
            color: "#FF6B35",
            badge: "🔥 AKTIVNO",
            stats: "12 aktivnih"
        },
        {
            id: 2, 
            name: "Bodovi", 
            title: "Sustav Bodovanja",
            description: "Dodijeli bodove, prati napredak i upravljaj postignućima",
            to: "points",
            icon: <TrendingUp sx={{ fontSize: 48 }} />,
            gradient: "linear-gradient(135deg, #38A169 0%, #2F855A 100%)",
            color: "#38A169",
            badge: "📊 ANALITIKA",
            stats: "156 ukupno"
        },
        {
            id: 3, 
            name: "Članovi", 
            title: "Upravljanje Članovima",
            description: "Pregled članova, dozvole i administracija korisnika",
            to: "users",
            icon: <Groups sx={{ fontSize: 48 }} />,
            gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
            color: "#8B5CF6",
            badge: "👥 ZAJEDNICA",
            stats: "45 članova"
        }
    ];

    const handleClick = (option) => {
        navigate(option.to);
    };

    const quickStats = [
        { label: "Ukupno Članova", value: "45", icon: <Groups />, color: "#8B5CF6" },
        { label: "Aktivni Događaji", value: "12", icon: <EmojiEvents />, color: "#FF6B35" },
        { label: "Ukupno Bodova", value: "1,247", icon: <Star />, color: "#FFD700" },
        { label: "Ovaj Mjesec", value: "8", icon: <Timeline />, color: "#38A169" }
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <TitleContainer title="⚡ ADMIN PANEL" description="Upravljaj sekcijom kao pravi šef!" />
            
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Epic Hero Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        mb: 4,
                        background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
                        color: 'white',
                        borderRadius: 3,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -100,
                            right: -100,
                            width: 300,
                            height: 300,
                            borderRadius: '50%',
                            background: 'rgba(255, 107, 53, 0.1)',
                            zIndex: 0,
                            animation: 'pulse 4s ease-in-out infinite'
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: -50,
                            left: -50,
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            background: 'rgba(139, 92, 246, 0.1)',
                            zIndex: 0
                        }}
                    />
                    
                    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 3 }}>
                            <Avatar sx={{ bgcolor: '#FF6B35', width: 60, height: 60 }}>
                                <AdminPanelSettings sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Avatar sx={{ bgcolor: '#8B5CF6', width: 60, height: 60 }}>
                                <Shield sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Avatar sx={{ bgcolor: '#38A169', width: 60, height: 60 }}>
                                <Security sx={{ fontSize: 32 }} />
                            </Avatar>
                        </Stack>
                        
                        <Typography variant="h2" component="h1" gutterBottom sx={{ 
                            fontWeight: 900,
                            background: 'linear-gradient(45deg, #FF6B35, #8B5CF6, #38A169)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: 'none',
                            mb: 2
                        }}>
                            KOMANDNI CENTAR
                        </Typography>
                        <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            Ovdje upravljaš svojom sekcijom kao pravi lider! 🚀
                        </Typography>
                    </Box>
                </Paper>

                {/* Quick Stats */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {quickStats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F7FAFC 100%)',
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                                        borderColor: stat.color
                                    }
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: stat.color,
                                            width: 40,
                                            height: 40,
                                            mx: 'auto',
                                            mb: 1
                                        }}
                                    >
                                        {stat.icon}
                                    </Avatar>
                                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color, mb: 0.5 }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        {stat.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Main Admin Options */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ 
                        fontWeight: 700, 
                        color: 'primary.main',
                        textAlign: 'center',
                        mb: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2
                    }}>
                        <ManageAccounts sx={{ fontSize: 32 }} />
                        GLAVNE FUNKCIJE
                    </Typography>
                    
                    <Grid container spacing={4}>
                        {adminOptions.map((option, index) => (
                            <Grid item xs={12} md={4} key={option.id}>
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
                                    {/* Animated background elements */}
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
                                            animationDelay: `${index * 0.5}s`,
                                            '@keyframes float': {
                                                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                                                '50%': { transform: 'translateY(-15px) rotate(180deg)' }
                                            }
                                        }}
                                    />
                                    
                                    <CardActionArea
                                        onClick={() => handleClick(option)}
                                        sx={{ height: '100%', p: 3 }}
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
                                                <Typography variant="h5" component="h3" gutterBottom sx={{ 
                                                    fontWeight: 700,
                                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                                    mb: 1
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
                </Box>

                {/* Bottom Motivation */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        textAlign: 'center',
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
                            bottom: -30,
                            left: -30,
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            zIndex: 0
                        }}
                    />
                    
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Speed sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                            Upravljaj kao pravi lider! 💪
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            Svaka odluka koju doneseš oblikuje budućnost sekcije! 🚀
                        </Typography>
                    </Box>
                </Paper>
            </Container>

            <style jsx>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.1); opacity: 0.2; }
                    100% { transform: scale(1); opacity: 0.1; }
                }
            `}</style>
        </Box>
    );
};

export default Admin;
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  Stack,
  Chip,
  Alert,
  Fade,
  Zoom
} from '@mui/material';
import {
  Add as AddIcon,
  EmojiEvents,
  CalendarToday,
  Star,
  Save as SaveIcon,
  Speed,
  LocalFireDepartment,
  CheckCircle
} from '@mui/icons-material';
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import api from "../../../api";
import { useSection } from "../../../contexts/SectionProvider";
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
    const { sectionId } = useSection();
    const navigate = useNavigate();

    // State variables
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date(Date.now()).toISOString().split('T')[0]);
    const [points, setPoints] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleCreate = async () => {
        if (!name.trim()) {
            setError('Naziv događanja je obavezan!');
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            await api.post(`sections/${sectionId}/event`, {
                name: name.trim(),
                date: date,
                idEventType: points <= 0 ? 1 : points > 6 ? 6 : points,
                description: "Novo događanje stvoreno kroz admin panel.",
            });
            
            setSuccess(true);
            setTimeout(() => {
                navigate('/admin/events/all');
            }, 2000);
        } catch (error) {
            console.log("Error creating new event: ", error);
            setError('Greška pri stvaranju događanja. Pokušajte ponovo.');
        } finally {
            setLoading(false);
        }
    };

    const getPointsColor = (points) => {
        if (points >= 6) return '#FF6B35';
        if (points >= 4) return '#FFD700';
        if (points >= 2) return '#38A169';
        return '#805AD5';
    };

    const getPointsLabel = (points) => {
        if (points >= 6) return '🔥 MEGA EVENT';
        if (points >= 4) return '⭐ VAŽAN EVENT';
        if (points >= 2) return '💪 STANDARDNI';
        return '✅ OSNOVNI';
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <TitleContainer title="➕ NOVI DOGAĐAJ" description="Kreiraj nezaboravan trenutak za svoju sekciju!" />
            
            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* Epic Hero Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        mb: 4,
                        background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
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
                        <Avatar sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)', 
                            width: 80, 
                            height: 80, 
                            mx: 'auto', 
                            mb: 2,
                            border: '3px solid rgba(255,255,255,0.3)'
                        }}>
                            <AddIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                        
                        <Typography variant="h3" component="h1" gutterBottom sx={{ 
                            fontWeight: 900,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            mb: 2
                        }}>
                            KREATOR DOGAĐANJA
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            Stvori događanje koje će svi pamtiti! 🚀
                        </Typography>
                    </Box>
                </Paper>

                {/* Success Message */}
                {success && (
                    <Fade in timeout={500}>
                        <Alert 
                            severity="success" 
                            sx={{ mb: 3, borderRadius: 2 }}
                            icon={<CheckCircle />}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                🎉 Događanje uspješno stvoreno!
                            </Typography>
                            <Typography variant="body2">
                                Preusmjeravam vas na listu događanja...
                            </Typography>
                        </Alert>
                    </Fade>
                )}

                {/* Error Message */}
                {error && (
                    <Fade in timeout={500}>
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    </Fade>
                )}

                {/* Main Form */}
                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ 
                        p: 3, 
                        background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
                        color: 'white'
                    }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <EmojiEvents sx={{ fontSize: 32 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                📝 DETALJI DOGAĐANJA
                            </Typography>
                        </Stack>
                    </Box>
                    
                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={4}>
                            {/* Event Name */}
                            <Grid item xs={12}>
                                <Zoom in timeout={600}>
                                    <Card sx={{ 
                                        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
                                        border: '1px solid',
                                        borderColor: 'grey.200'
                                    }}>
                                        <CardContent sx={{ p: 3 }}>
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                                                    <EmojiEvents />
                                                </Avatar>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    Naziv Događanja
                                                </Typography>
                                            </Stack>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                placeholder="Unesite naziv događanja..."
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        bgcolor: 'white',
                                                        '& fieldset': {
                                                            borderColor: 'grey.300',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'primary.main',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: 'primary.main',
                                                        }
                                                    }
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>

                            {/* Event Date */}
                            <Grid item xs={12} md={6}>
                                <Zoom in timeout={800}>
                                    <Card sx={{ 
                                        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
                                        border: '1px solid',
                                        borderColor: 'grey.200'
                                    }}>
                                        <CardContent sx={{ p: 3 }}>
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                                <Avatar sx={{ bgcolor: 'info.main', width: 40, height: 40 }}>
                                                    <CalendarToday />
                                                </Avatar>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    Datum
                                                </Typography>
                                            </Stack>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                variant="outlined"
                                                value={date}
                                                onChange={e => setDate(e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        bgcolor: 'white',
                                                        '& fieldset': {
                                                            borderColor: 'grey.300',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'info.main',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: 'info.main',
                                                        }
                                                    }
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>

                            {/* Points */}
                            <Grid item xs={12} md={6}>
                                <Zoom in timeout={1000}>
                                    <Card sx={{ 
                                        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
                                        border: '1px solid',
                                        borderColor: 'grey.200'
                                    }}>
                                        <CardContent sx={{ p: 3 }}>
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                                <Avatar sx={{ bgcolor: getPointsColor(points), width: 40, height: 40 }}>
                                                    <Star />
                                                </Avatar>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        Bodovi (1-6)
                                                    </Typography>
                                                    <Chip
                                                        label={getPointsLabel(points)}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getPointsColor(points) + '20',
                                                            color: getPointsColor(points),
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem'
                                                        }}
                                                    />
                                                </Box>
                                            </Stack>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                variant="outlined"
                                                inputProps={{ min: 1, max: 6 }}
                                                value={points}
                                                onChange={e => {
                                                    const val = parseInt(e.target.value);
                                                    if (isNaN(val)) {
                                                        setPoints(1);
                                                    } else {
                                                        setPoints(Math.max(1, Math.min(6, val)));
                                                    }
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        bgcolor: 'white',
                                                        '& fieldset': {
                                                            borderColor: 'grey.300',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: getPointsColor(points),
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: getPointsColor(points),
                                                        }
                                                    }
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Zoom in timeout={1200}>
                                    <Card sx={{ 
                                        background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                                        color: 'white'
                                    }}>
                                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                onClick={handleCreate}
                                                disabled={loading || success}
                                                startIcon={loading ? <Speed sx={{ animation: 'spin 1s linear infinite' }} /> : <SaveIcon />}
                                                sx={{
                                                    py: 2,
                                                    px: 6,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 700,
                                                    bgcolor: 'white',
                                                    color: 'success.main',
                                                    '&:hover': {
                                                        bgcolor: 'grey.100',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                                                    },
                                                    '&:disabled': {
                                                        bgcolor: 'rgba(255,255,255,0.7)',
                                                        color: 'success.main'
                                                    }
                                                }}
                                            >
                                                {loading ? 'Stvaram događanje...' : success ? 'Uspješno stvoreno!' : 'Stvori Događanje'}
                                            </Button>
                                            
                                            <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
                                                🚀 Pripremi se za nezaboravan događaj!
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

                {/* Bottom Motivation */}
                <Paper
                    elevation={0}
                    sx={{
                        mt: 4,
                        p: 4,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: 3
                    }}
                >
                    <LocalFireDepartment sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                        Svako događanje je nova prilika! 💪
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Kreiraj trenutke koje će svi pamtiti zauvijek! 🔥
                    </Typography>
                </Paper>
            </Container>

            <style jsx>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.1); opacity: 0.2; }
                    100% { transform: scale(1); opacity: 0.1; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Box>
    );
};

export default AddEvent;
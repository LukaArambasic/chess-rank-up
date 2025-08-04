import React, {useEffect, useState} from 'react';
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
    Zoom,
    Autocomplete
} from '@mui/material';
import {
    PersonAdd as PersonAddIcon,
    EmojiEvents,
    Person,
    Save as SaveIcon,
    Speed,
    CheckCircle,
    Assessment
} from '@mui/icons-material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";
import {useParams, useNavigate} from "react-router-dom";

const ManualPoints = () => {
    const {eventId, memberId} = useParams();
    const {sectionId} = useSection();
    const navigate = useNavigate();
    
    const [events, setEvents] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            await api.get(`sections/${sectionId}/event`)
                .then(response => {
                    const newEvents = response.data.map(event => ({
                        ...event,
                        label: `${event.name} ${event.date}`
                    }))
                    setEvents(newEvents);
                    const selected = newEvents.filter(event => event.id===parseInt(eventId))[0];
                    setSelectedEvent(selected);
                    return api.get(`sections/${sectionId}/members`)
                })
                .then(response => {
                    const newMembers = response.data.map(member => ({
                        ...member,
                        id: member.memberId,
                        label: `${member.firstName} ${member.lastName} ${member.jmbag}`
                    }));
                    const selected = newMembers.filter(member => member.id===parseInt(memberId))[0];
                    setSelectedMember(selected?selected:null);
                    setMembers(newMembers);
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                });
        }

        fetchData();
    }, [sectionId, eventId, memberId]);

    const handleSubmit = async () => {
        if (!selectedEvent) {
            setError('Molimo odaberite događaj.');
            return;
        }
        if (!selectedMember) {
            setError('Molimo odaberite člana.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            const requestData = {
                memberId: selectedMember.id,
                eventId: selectedEvent.id
            };

            await api.post(`sections/${sectionId}/participations`, requestData);
            
            setSuccess(true);
            setTimeout(() => {
                navigate('/admin/points');
            }, 2000);
        } catch (error) {
            console.error("Error creating data: ", error);
            setError('Greška pri dodjeljivanju bodova. Pokušajte ponovo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <TitleContainer title="Manualni Unos Bodova" description="Dodijeli bodove pojedinačno za određeni događaj" />
            
            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* Header Section */}
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
                            <PersonAddIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                        
                        <Typography variant="h3" component="h1" gutterBottom sx={{ 
                            fontWeight: 700,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            mb: 2
                        }}>
                            Dodijeli Bodove
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            Odaberite događaj i člana za dodjelu bodova
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
                                Bodovi uspješno dodijeljeni!
                            </Typography>
                            <Typography variant="body2">
                                Preusmjeravam vas na opcije bodova...
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
                {events && events.length && (
                    <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        <Box sx={{ 
                            p: 3, 
                            background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
                            color: 'white'
                        }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Assessment sx={{ fontSize: 32 }} />
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    Detalji Dodjele
                                </Typography>
                            </Stack>
                        </Box>
                        
                        <Box sx={{ p: 4 }}>
                            <Grid container spacing={4}>
                                {/* Event Selection */}
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
                                                        Odaberi Događaj
                                                    </Typography>
                                                </Stack>
                                                <Autocomplete
                                                    slotProps={{
                                                        popper: {
                                                            sx: {
                                                                '& .MuiAutocomplete-option': { fontSize: 16, minHeight: 'unset' },
                                                            },
                                                        },
                                                    }}
                                                    value={selectedEvent}
                                                    onChange={(e, newValue) => setSelectedEvent(newValue)}
                                                    options={events}
                                                    renderInput={(params) => <TextField {...params} label="Odaberi događaj" />}
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

                                {/* Member Selection */}
                                <Grid item xs={12}>
                                    <Zoom in timeout={800}>
                                        <Card sx={{ 
                                            background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
                                            border: '1px solid',
                                            borderColor: 'grey.200'
                                        }}>
                                            <CardContent sx={{ p: 3 }}>
                                                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                                    <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
                                                        <Person />
                                                    </Avatar>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        Odaberi Člana
                                                    </Typography>
                                                </Stack>
                                                <Autocomplete
                                                    slotProps={{
                                                        popper: {
                                                            sx: {
                                                                '& .MuiAutocomplete-option': { fontSize: 16, minHeight: 'unset' },
                                                            },
                                                        },
                                                    }}
                                                    value={selectedMember}
                                                    onChange={(e, newValue) => setSelectedMember(newValue)}
                                                    options={members}
                                                    renderInput={(params) => <TextField {...params} label="Odaberi člana" />}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            bgcolor: 'white',
                                                            '& fieldset': {
                                                                borderColor: 'grey.300',
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: 'secondary.main',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: 'secondary.main',
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
                                    <Zoom in timeout={1000}>
                                        <Card sx={{ 
                                            background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                                            color: 'white'
                                        }}>
                                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    onClick={handleSubmit}
                                                    disabled={loading || success}
                                                    startIcon={loading ? <Speed sx={{ animation: 'spin 1s linear infinite' }} /> : <SaveIcon />}
                                                    sx={{
                                                        py: 2,
                                                        px: 6,
                                                        fontSize: '1.1rem',
                                                        fontWeight: 600,
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
                                                    {loading ? 'Dodijeljujem bodove...' : success ? 'Uspješno dodijeljeno!' : 'Dodijeli Bodove'}
                                                </Button>
                                                
                                                <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
                                                    Provjerite podatke prije potvrde
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Zoom>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                )}

                {/* Bottom Section */}
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
                    <Assessment sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        Precizno upravljanje bodovima
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Svaki bod je važan za napredak članova
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

export default ManualPoints;
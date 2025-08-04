import React, {useEffect, useState} from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    Avatar,
    Stack,
    Chip,
    Fade,
    Zoom,
    Autocomplete
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Person,
    EmojiEvents,
    CalendarToday,
    Add as AddIcon,
    Timeline,
    Assessment,
    LocalFireDepartment,
    Speed
} from '@mui/icons-material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";

const AdminUser = () => {
    const { id } = useParams();
    const { sectionId } = useSection();
    const navigate = useNavigate();

    const [member, setMember] = useState(null);
    const [events, setEvents] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [eventToRemove, setEventToRemove] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const memberResponse = await api.get(`members/${id}`);
                setMember(memberResponse.data);
                
                const participationsResponse = await api.get(`sections/${sectionId}/participations/member/${id}`);
                setEvents(participationsResponse.data);
                
                const semestersResponse = await api.get('semesters');
                semestersResponse.data.sort((a,b)=>b.dateTo-a.dateTo);
                const semesters = semestersResponse.data.map(semester => ({
                    ...semester,
                    label: semester.name,
                }));
                setSemesters(semesters);
            } catch (error) {
                console.log("Error fetching data ", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, sectionId]);

    const openConfirmDialog = (event) => {
        setEventToRemove(event);
        setDialogOpen(true);
    };

    const closeConfirmDialog = () => {
        setDialogOpen(false);
        setEventToRemove(null);
    };

    const confirmRemove = async () => {
        if (eventToRemove) {
            try {
                await api.delete(`sections/${sectionId}/participations/${eventToRemove.id}/${id}`);
                setEvents((prev) => prev.filter((e) => e.id !== eventToRemove.id));
            } catch (error) {
                console.error("Error deleting data: ", error);
            }
        }
        closeConfirmDialog();
    };

    function formatDateCro(isoDate) {
        const [year, month, day] = isoDate.split('-');
        return `${Number(day)}.${Number(month)}.${year}.`;
    }

    const filteredEvents = events.filter(event => {
        if (selectedSemester == null) return true;
        const eventDate = new Date(event.date);
        const dateFrom = new Date(selectedSemester.dateFrom);
        const dateTo = new Date(selectedSemester.dateTo);
        return (eventDate > dateFrom && eventDate < dateTo);
    });

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <TitleContainer title="Učitavanje..." description="Priprema se korisnik..." />
                <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
                    <Paper sx={{ p: 6, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                        <Speed sx={{ fontSize: 64, mb: 2, animation: 'spin 2s linear infinite' }} />
                        <Typography variant="h5">Učitavanje korisnika...</Typography>
                    </Paper>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {member && events && (
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <TitleContainer title={`👤 ${member.firstName} ${member.lastName}`} description="Upravljaj aktivnostima člana" />
                    
                    {/* Member Info Hero */}
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
                        
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                        border: '4px solid rgba(255, 255, 255, 0.3)',
                                        fontSize: '2.5rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {member.firstName[0]}{member.lastName[0]}
                                </Avatar>
                                
                                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
                                    <Typography variant="h3" component="h1" gutterBottom sx={{ 
                                        fontWeight: 700,
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                    }}>
                                        {member.firstName} {member.lastName}
                                    </Typography>
                                    
                                    <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ mb: 2 }}>
                                        <Chip
                                            label={member.jmbag}
                                            sx={{ 
                                                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                        <Chip
                                            label={member.email}
                                            sx={{ 
                                                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </Paper>

                    {/* Add Event Button */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            mb: 4,
                            background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                            borderRadius: 2
                        }}
                    >
                        <Button 
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={() => navigate(`/admin/points/manual/0/${id}`)}
                            sx={{
                                bgcolor: 'white',
                                color: 'success.main',
                                fontWeight: 600,
                                py: 1.5,
                                px: 3,
                                '&:hover': {
                                    bgcolor: 'grey.100',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                                }
                            }}
                        >
                            Dodaj Novo Događanje
                        </Button>
                    </Paper>

                    {/* Semester Filter */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            mb: 4,
                            background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
                            border: '1px solid',
                            borderColor: 'grey.200',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                            🔍 Filtriraj po semestru
                        </Typography>
                        <Autocomplete
                            slotProps={{
                                popper: {
                                    sx: {
                                        '& .MuiAutocomplete-option': { fontSize: 16, minHeight: 'unset' },
                                    },
                                },
                            }}
                            value={selectedSemester}
                            onChange={(e, newValue) => setSelectedSemester(newValue)}
                            options={semesters}
                            renderInput={(params) => <TextField {...params} label="Odaberi semestar" />}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white'
                                }
                            }}
                        />
                    </Paper>

                    {/* Events Table */}
                    <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        <Box sx={{ 
                            p: 3, 
                            background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
                            color: 'white'
                        }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Timeline sx={{ fontSize: 32 }} />
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    📊 DOGAĐANJA ({filteredEvents.length})
                                </Typography>
                            </Stack>
                        </Box>
                        
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <EmojiEvents sx={{ fontSize: 20, color: 'primary.main' }} />
                                                <span>Naziv</span>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarToday sx={{ fontSize: 20, color: 'info.main' }} />
                                                <span>Datum</span>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                            Akcije
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredEvents.length > 0 ? (
                                        filteredEvents.map((event, index) => (
                                            <Fade in timeout={300 + index * 100} key={event.id}>
                                                <TableRow 
                                                    hover
                                                    sx={{
                                                        '&:hover': {
                                                            bgcolor: 'action.hover',
                                                            transform: 'translateX(4px)',
                                                            transition: 'all 0.3s ease'
                                                        },
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Avatar sx={{ 
                                                                bgcolor: 'primary.main', 
                                                                width: 32, 
                                                                height: 32,
                                                                fontSize: '0.875rem'
                                                            }}>
                                                                {index + 1}
                                                            </Avatar>
                                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                                {event.name}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {formatDateCro(event.date)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton 
                                                            onClick={() => openConfirmDialog(event)}
                                                            sx={{
                                                                color: 'error.main',
                                                                '&:hover': {
                                                                    bgcolor: 'error.light',
                                                                    color: 'white'
                                                                }
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            </Fade>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} sx={{ textAlign: 'center', py: 6 }}>
                                                <EmojiEvents sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                                    Nema događanja
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {selectedSemester ? 'Nema događanja u odabranom semestru' : 'Student nije bio ni na jednom događanju'}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {/* Confirmation Dialog */}
                    <Dialog 
                        open={dialogOpen}
                        onClose={closeConfirmDialog}
                        PaperProps={{
                            sx: {
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #F7FAFC 100%)',
                            }
                        }}
                    >
                        <DialogTitle sx={{ 
                            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                            color: 'white',
                            fontWeight: 700
                        }}>
                            🗑️ Ukloni događanje
                        </DialogTitle>
                        <DialogContent sx={{ pt: 3 }}>
                            <DialogContentText sx={{ fontSize: '1rem', color: 'text.primary' }}>
                                Jeste li sigurni da želite ukloniti sudionika s događanja:
                            </DialogContentText>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                color: 'primary.main',
                                mt: 1,
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 2
                            }}>
                                {eventToRemove ? `${eventToRemove.name} - ${formatDateCro(eventToRemove.date)}` : ''}
                            </Typography>
                            <Typography variant="body2" color="error.main" sx={{ mt: 2, fontWeight: 500 }}>
                                ⚠️ Sudionik će biti uklonjen s ovog događanja!
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{ p: 3, gap: 2 }}>
                            <Button 
                                onClick={closeConfirmDialog}
                                variant="outlined"
                                sx={{ minWidth: 100 }}
                            >
                                Otkaži
                            </Button>
                            <Button 
                                color="error" 
                                variant="contained"
                                onClick={confirmRemove}
                                sx={{ minWidth: 100, fontWeight: 600 }}
                            >
                                Ukloni
                            </Button>
                        </DialogActions>
                    </Dialog>

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
                            Svaki član je važan dio tima! 💪
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            Upravljaj aktivnostima s preciznošću i brigom! 🔥
                        </Typography>
                    </Paper>
                </Container>
            )}

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

export default AdminUser;
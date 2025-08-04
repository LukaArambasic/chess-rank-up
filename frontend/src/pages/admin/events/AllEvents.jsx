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
    Button, FormControl, Autocomplete, TextField
} from '@mui/material';
import {
    Delete as DeleteIcon,
    EmojiEvents,
    CalendarToday,
    Star,
    Search as SearchIcon,
    LocalFireDepartment,
    Timeline,
    Assessment
} from '@mui/icons-material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import { useNavigate } from 'react-router-dom';
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";

const AdminEventsPage = () => {
    const navigate = useNavigate();
    const {sectionId} = useSection();

    // Example initial data; replace or fetch from API as needed
    const [events, setEvents] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await api.get(`sections/${sectionId}/event`)
                .then(response => {
                    setEvents(response.data);
                    return api.get('semesters')
                })
                .then(response => {
                    response.data.sort((a,b)=>b.dateTo-a.dateTo);
                    const semesters = response.data.map(semester => {
                        return {
                            ...semester,
                            label: semester.name,
                        }
                    })
                    setSemesters(semesters);
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                })
        }
        fetchData();
    }, [sectionId]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [eventToRemove, setEventToRemove] = useState(null);

    function formatDateCro(isoDate) {
        const [year, month, day] = isoDate.split('-');
        return `${Number(day)}.${Number(month)}.${year}.`;
    }

    const handleRowClick = (id) => {
        navigate(`/admin/events/${id}`);
    };

    const openConfirmDialog = (evt, e) => {
        e.stopPropagation();
        setEventToRemove(evt);
        setDialogOpen(true);
    };

    const closeConfirmDialog = () => {
        setDialogOpen(false);
        setEventToRemove(null);
    };

    const confirmRemove = async () => {
        await api.delete(`sections/${sectionId}/event/${eventToRemove.id}`)
            .then(response => {
                setEvents((prev) => prev.filter((ev) => ev.id !== eventToRemove.id));
            })
            .catch(error => {
                console.log("Error deleting data, ", error);
            })
        closeConfirmDialog();
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <TitleContainer title="📋 SVA DOGAĐANJA" description="Upravljaj svim događanjima kao pravi šef!" />
            
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Epic Hero Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        mb: 4,
                        background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)',
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
                        <Timeline sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
                        <Typography variant="h3" component="h1" gutterBottom sx={{ 
                            fontWeight: 900,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            mb: 2
                        }}>
                            DOGAĐANJA KONTROLA
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            Upravljaj svim događanjima na jednom mjestu! 🚀
                        </Typography>
                    </Box>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <SearchIcon sx={{ color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            Filtriraj Događanja
                        </Typography>
                    </Box>
                    <FormControl fullWidth>
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
                            renderInput={(params) => <TextField {...params} label="Odaberi semestar za filtriranje" />}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white'
                                }
                            }}
                        />
                    </FormControl>
                </Paper>

                {/* Events Table */}
                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ 
                        p: 3, 
                        background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
                        color: 'white'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Assessment sx={{ fontSize: 32 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                📊 LISTA DOGAĐANJA
                            </Typography>
                        </Box>
                    </Box>
                    
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: 'grey.50' }}>
                                    <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EmojiEvents sx={{ fontSize: 20, color: 'primary.main' }} />
                                            <span>Naziv događaja</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CalendarToday sx={{ fontSize: 20, color: 'info.main' }} />
                                            <span>Datum</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Star sx={{ fontSize: 20, color: 'warning.main' }} />
                                            <span>Bodovi</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                        Akcije
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events && events.length > 0 ? events
                                    .filter(event => {
                                        if (selectedSemester == null) return true;
                                        const eventDate = new Date(event.date);
                                        const dateFrom = new Date(selectedSemester.dateFrom);
                                        const dateTo = new Date(selectedSemester.dateTo);
                                        return (eventDate > dateFrom && eventDate < dateTo);
                                    })
                                    .map((evt) => (
                                    <TableRow
                                        key={evt.id}
                                        hover
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'action.hover',
                                                transform: 'translateX(4px)',
                                                transition: 'all 0.3s ease'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                        onClick={() => handleRowClick(evt.id)}
                                    >
                                        <TableCell>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {evt.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {formatDateCro(evt.date)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" sx={{ 
                                                fontWeight: 600,
                                                color: 'primary.main'
                                            }}>
                                                {evt.eventTypeName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={(e) => openConfirmDialog(evt, e)}
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
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={4} sx={{ textAlign: 'center', py: 6 }}>
                                            <LocalFireDepartment sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                                Nema događanja
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Stvorite prvo događanje za svoju sekciju!
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
                        🗑️ Potvrdi brisanje
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3 }}>
                        <DialogContentText sx={{ fontSize: '1rem', color: 'text.primary' }}>
                            Jeste li sigurni da želite obrisati događanje:
                        </DialogContentText>
                        <Typography variant="h6" sx={{ 
                            fontWeight: 600, 
                            color: 'primary.main',
                            mt: 1,
                            p: 2,
                            bgcolor: 'grey.50',
                            borderRadius: 2
                        }}>
                            "{eventToRemove ? eventToRemove.name+' - '+formatDateCro(eventToRemove.date) : ''}"
                        </Typography>
                        <Typography variant="body2" color="error.main" sx={{ mt: 2, fontWeight: 500 }}>
                            ⚠️ Ova akcija se ne može poništiti!
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
                            Obriši
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
                        Upravljaj kao pravi lider! 💪
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
            `}</style>
        </Box>
    );
};

export default AdminEventsPage;
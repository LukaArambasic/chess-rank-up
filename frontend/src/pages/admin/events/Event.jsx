import React, {useEffect, useState} from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    Stack,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import {
    Delete as DeleteIcon,
    EmojiEvents,
    CalendarToday,
    Star,
    PersonAdd,
    Groups,
    LocalFireDepartment
} from '@mui/icons-material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";

const AdminEvent = () => {
    const { id } = useParams();
    const { sectionId } = useSection();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const [event, setEvent] = useState(null);
    const [users, setUsers] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [userToRemove, setUserToRemove] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await api.get(`sections/${sectionId}/event/${id}`)
                .then(response => {
                    setEvent(response.data);
                    return api.get(`sections/${sectionId}/participations/event/${id}`)
                })
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                })
        }
        fetchData();
    }, [id, sectionId]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const openConfirmDialog = (user) => {
        setUserToRemove(user);
        setDialogOpen(true);
    };

    const closeConfirmDialog = () => {
        setDialogOpen(false);
        setUserToRemove(null);
    };

    const confirmRemove = () => {
        if (userToRemove) {
            deleteUser();
            setUsers((prev) => prev.filter((u) => u.jmbag !== userToRemove.jmbag));
        }
        closeConfirmDialog();
    };

    async function deleteUser() {
        await api.delete(`sections/${sectionId}/participations/${id}/${userToRemove.id}`)
            .catch(error => {
                console.error("Error deleting data: ", error);
            })
    }

    function formatDateCro(isoDate) {
        const [year, month, day] = isoDate.split('-');
        return `${Number(day)}.${Number(month)}.${year}.`;
    }

    const filteredUsers = users.filter((user) => {
        const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
        const query = searchQuery.trim().toLowerCase();
        return (
            user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.jmbag.includes(query) ||
            fullName.includes(query)
        );
    });

    return (

        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {event && users && (
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <TitleContainer title={`🎯 ${event.name}`} description="Upravljaj sudionicima događanja" />
                    
                    {/* Event Details Hero */}
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
                        
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                        border: '4px solid rgba(255, 255, 255, 0.3)',
                                        fontSize: '3rem'
                                    }}
                                >
                                    <EmojiEvents sx={{ fontSize: '3rem' }} />
                                </Avatar>
                                
                                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
                                    <Typography variant="h3" component="h1" gutterBottom sx={{ 
                                        fontWeight: 700,
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                    }}>
                                        {event.name}
                                    </Typography>
                                    
                                    <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ mb: 2 }}>
                                        <Chip
                                            icon={<CalendarToday />}
                                            label={formatDateCro(event.date)}
                                            sx={{ 
                                                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                                                color: 'white',
                                                '& .MuiChip-icon': { color: 'white' }
                                            }}
                                        />
                                        <Chip
                                            icon={<Star />}
                                            label={event.eventTypeName}
                                            sx={{ 
                                                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                                                color: 'white',
                                                '& .MuiChip-icon': { color: 'white' }
                                            }}
                                        />
                                        <Chip
                                            icon={<Groups />}
                                            label={`${users.length} sudionika`}
                                            sx={{ 
                                                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                                                color: 'white',
                                                '& .MuiChip-icon': { color: 'white' }
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </Paper>

                    {/* Add Participant Button */}
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
                            startIcon={<PersonAdd />}
                            onClick={() => navigate(`/admin/points/manual/${id}/0`)}
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
                            Dodaj Novog Sudionika
                        </Button>
                    </Paper>

                    {/* Search */}
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
                        <TextField
                            label="🔍 Pretraži po imenu, JMBAG-u ili emailu"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={handleSearchChange}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white'
                                }
                            }}
                        />
                    </Paper>

                    {/* Participants Table */}
                    <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        <Box sx={{ 
                            p: 3, 
                            background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
                            color: 'white'
                        }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Groups sx={{ fontSize: 32 }} />
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    👥 SUDIONICI ({filteredUsers.length})
                                </Typography>
                            </Stack>
                        </Box>
                        
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: 'grey.50' }}>
                                    <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                        Ime i Prezime
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                        JMBAG
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                        Akcije
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, index) => (
                                        <TableRow 
                                            key={user.jmbag} 
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
                                                        {user.lastName}, {user.firstName}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {user.jmbag}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton 
                                                    onClick={() => openConfirmDialog(user)}
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
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} sx={{ textAlign: 'center', py: 6 }}>
                                            <Groups sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                                Nema sudionika
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Dodajte prve sudionike ovog događanja!
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
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
                            🗑️ Ukloni sudionika
                        </DialogTitle>
                        <DialogContent sx={{ pt: 3 }}>
                            <DialogContentText sx={{ fontSize: '1rem', color: 'text.primary' }}>
                                Jeste li sigurni da želite ukloniti sudionika:
                            </DialogContentText>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                color: 'primary.main',
                                mt: 1,
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 2
                            }}>
                                {userToRemove ? `${userToRemove.lastName}, ${userToRemove.firstName} (${userToRemove.jmbag})` : ''}
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
                            Svaki sudionik čini događanje boljim! 💪
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            Upravljaj sudionicima i stvori nezaboravne trenutke! 🔥
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
            `}</style>
        </Box>

    );
};

export default AdminEvent;

import React, {useEffect, useState} from 'react';
import {
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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

        <div className="container">
            {event && users && (
                <>
            <TitleContainer title={`Event: ${event.name}`} description="Pogledaj listu svih sudionika" />
            <div className="aboutText">
                <div>
                    <Typography variant="h6" gutterBottom>
                        Detalji događaja
                    </Typography>
                    <Typography>
                        <strong>Naziv:</strong> {event.name}
                    </Typography>
                    <Typography>
                        <strong>Datum:</strong> {formatDateCro(event.date)}
                    </Typography>
                    <Typography>
                        <strong>Bodovi:</strong> {event.eventTypeName}
                    </Typography>
                </div>
                <h2>Sudionici</h2>

                <div style={{ width: '90%', margin: '10px 0px' }}>
                    <Button variant="contained" onClick={() => navigate(`/admin/points/manual/${id}/0`)}
                    >
                        Dodaj sudionika
                    </Button>
                </div>

                <TextField
                    label="Pretraži po imenu, JMBAG-u ili emailu"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ marginBottom: '20px' }}
                />

                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ime</TableCell>
                                <TableCell>JMBAG</TableCell>
                                <TableCell align="center">Akcije</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.jmbag} hover>
                                        <TableCell>{user.lastName}, {user.firstName}</TableCell>
                                        <TableCell>{user.jmbag}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => openConfirmDialog(user)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                        Nema korisnika
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
                >
                    <DialogTitle>Potvrdi brisanje</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Jeste li sigurni da želite ukloniti sudionika {
                            userToRemove ? `${userToRemove.lastName}, ${userToRemove.firstName} ${userToRemove.jmbag}` : ''
                        }?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeConfirmDialog}>Otkaži</Button>
                        <Button color="error" onClick={confirmRemove}>Obriši</Button>
                    </DialogActions>
                </Dialog>
            </div>
                </>

            )}

        </div>

    );
};

export default AdminEvent;

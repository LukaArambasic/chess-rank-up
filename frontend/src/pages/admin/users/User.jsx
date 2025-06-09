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
    DialogActions, FormControl, Autocomplete
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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

    useEffect(() => {
        async function fetchData() {
            await api.get(`members/${id}`)
                .then(response => {
                    setMember(response.data);
                    return api.get(`sections/${sectionId}/participations/member/${id}`)
                })
                .then(response => {
                    setEvents(response.data);
                    return api.get('semesters');
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
    }, [id, sectionId]);

    const openConfirmDialog = (user) => {
        setEventToRemove(user);
        setDialogOpen(true);
    };

    const closeConfirmDialog = () => {
        setDialogOpen(false);
        setEventToRemove(null);
    };

    const confirmRemove = () => {
        if (eventToRemove) {
            deleteEvent();
            setEvents((prev) => prev.filter((u) => u.jmbag !== eventToRemove.jmbag));
        }
        closeConfirmDialog();
    };

    async function deleteEvent() {
        await api.delete(`sections/${sectionId}/participations/${eventToRemove.id}/${id}`)
            .catch(error => {
                console.error("Error deleting data: ", error);
            })
    }

    function formatDateCro(isoDate) {
        const [year, month, day] = isoDate.split('-');
        return `${Number(day)}.${Number(month)}.${year}.`;
    }

    return (

        <div className="container">
            {member && events && (
                <>
                    <TitleContainer title={`Student info`} description="Pogledaj listu svih događanja" />
                    <div className="aboutText">
                        <div>
                            <Typography variant="h6" gutterBottom>
                                Informacije o korisniku
                            </Typography>
                            <Typography>
                                <strong>Ime i prezime:</strong> {member.firstName} {member.lastName}
                            </Typography>
                            <Typography>
                                <strong>Email:</strong> {member.email}
                            </Typography>
                            <Typography>
                                <strong>JMBAG:</strong> {member.jmbag}
                            </Typography>
                        </div>
                        <h2>Događanja</h2>

                        <div style={{ width: '90%', margin: '10px 0px' }}>
                            <Button variant="contained" onClick={() => navigate(`/admin/points/manual/0/${id}`)}
                            >
                                Dodaj događanje
                            </Button>
                        </div>


                        <FormControl style={{width: "90%", margin: "10px 0px"}}>
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
                            />
                        </FormControl>

                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Naziv</TableCell>
                                        <TableCell>Datum</TableCell>
                                        <TableCell align="center">Akcije</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {events && events
                                        .filter(event => {
                                            if (selectedSemester == null) return true;
                                            const eventDate = new Date(event.date);
                                            const dateFrom = new Date(selectedSemester.dateFrom);
                                            const dateTo = new Date(selectedSemester.dateTo);
                                            return (eventDate > dateFrom && eventDate < dateTo);
                                        }).length > 0 ? (
                                            events
                                            .filter(event => {
                                                if (selectedSemester == null) return true;
                                                const eventDate = new Date(event.date);
                                                const dateFrom = new Date(selectedSemester.dateFrom);
                                                const dateTo = new Date(selectedSemester.dateTo);
                                                return (eventDate > dateFrom && eventDate < dateTo);
                                            })
                                            .map((event) => (
                                            <TableRow key={event.id} hover>
                                                <TableCell>{event.name}</TableCell>
                                                <TableCell>{formatDateCro(event.date)}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => openConfirmDialog(event)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                                Student nije bio ni na jednom događanju.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Paper>
                        <div style={{height:"50px"}}></div>


                        {/* Confirmation Dialog */}
                        <Dialog
                            open={dialogOpen}
                            onClose={closeConfirmDialog}
                        >
                            <DialogTitle>Potvrdi brisanje</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Jeste li sigurni da želite ukloniti sudionika {
                                    eventToRemove ? `${eventToRemove.lastName}, ${eventToRemove.firstName} ${eventToRemove.jmbag}` : ''
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

export default AdminUser;

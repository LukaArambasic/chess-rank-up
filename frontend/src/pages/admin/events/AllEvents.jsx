import React, {useEffect, useState} from 'react';
import {
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
        <div className='container'>
            <TitleContainer
                title="Sva događanja"
                description="Pregled i upravljanje događanjima sekcije"
            />


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

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Naziv događaja</TableCell>
                            <TableCell>Datum</TableCell>
                            <TableCell>Bodovi</TableCell>
                            <TableCell align="center">Akcije</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events && events.length > 0 && events
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
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleRowClick(evt.id)}
                            >
                                <TableCell>{evt.name}</TableCell>
                                <TableCell>{formatDateCro(evt.date)}</TableCell>
                                <TableCell>{evt.eventTypeName}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={(e) => openConfirmDialog(evt, e)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Confirmation Dialog */}
            <Dialog open={dialogOpen} onClose={closeConfirmDialog}>
                <DialogTitle>Potvrdi brisanje</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Jeste li sigurni da želite obrisati event "${eventToRemove ? eventToRemove.name+' '+formatDateCro(eventToRemove.date) : ''}"?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDialog}>Otkaži</Button>
                    <Button color="error" onClick={confirmRemove}>Obriši</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminEventsPage;

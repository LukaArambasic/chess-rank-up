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
    Button
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
    const [events, setEvents] = useState();

    useEffect(() => {
        console.log("Section id: ",sectionId)
        async function fetchData() {
            await api.get(`sections/${sectionId}/event`)
                .then(response => {
                    console.log(response.data)
                    setEvents(response.data);
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                })
        }
        fetchData();
    }, []);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [eventToRemove, setEventToRemove] = useState(null);

    function formatDateCro(isoDate) {
        const [year, month, day] = isoDate.split('-');
        return `${Number(day)}.${Number(month)}.${year}`;
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
                console.log(response.data);
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
                title="Lista evenata"
                description="Pregled i upravljanje eventima"
            />

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
                        {events && events.map((evt) => (
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

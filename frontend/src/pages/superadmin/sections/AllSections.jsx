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

    // Example initial data; replace or fetch from API as needed
    const [sections, setSections] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await api.get(`sections`)
                .then(response => {
                    console.log(response.data)
                    setSections(response.data);
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                })
        }
        fetchData();
    }, []);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [sectionToRemove, setSectionToRemove] = useState(null);

    function formatDateCro(isoDate) {
        const [year, month, day] = isoDate.split('-');
        return `${Number(day)}.${Number(month)}.${year}`;
    }

    const handleRowClick = (id) => {
        navigate(`/superadmin/sections/${id}`);
    };

    const openConfirmDialog = (section, e) => {
        e.stopPropagation();
        console.log(section)
        setSectionToRemove(section);
        setDialogOpen(true);
    };

    const closeConfirmDialog = () => {
        setDialogOpen(false);
        setSectionToRemove(null);
    };

    const confirmRemove = async () => {
        await api.delete(`sections/${sectionToRemove.id}`)
            .then(response => {
                console.log(response.data);
                setSections((prev) => prev.filter((ev) => ev.id !== sectionToRemove.id));
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
                            <TableCell>Ime sekcije</TableCell>
                            <TableCell>Opis sekcije</TableCell>
                            <TableCell align="center">Akcije</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sections && sections.map((section) => (
                            <TableRow
                                key={section.id}
                                hover
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleRowClick(section.id)}
                            >
                                <TableCell>{section.name}</TableCell>
                                <TableCell>{section.descriptionUrl.slice(0,15)}...</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={(e) => openConfirmDialog(section, e)}
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
                        {`Jeste li sigurni da želite obrisati event "${sectionToRemove ? sectionToRemove.name : ''}"?`}
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

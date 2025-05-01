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
    const [semesters, setSemesters] = useState([
        { id: 1, name: "Proljetni semestar 2025", dateFrom: "2025-02-01", dateTo: "2025-06-30" },
        { id: 2, name: "Ljetni semestar 2025", dateFrom: "2025-07-01", dateTo: "2025-10-15" },
        { id: 3, name: "Zimski semestar 2024/25", dateFrom: "2024-11-01", dateTo: "2025-01-31" },
        { id: 4, name: "Jesenski semestar 2025", dateFrom: "2025-09-01", dateTo: "2025-12-15" }
    ]);

    useEffect(() => {
        async function fetchData() {
            await api.get(`semesters`)
                .then(response => {
                    console.log(response.data)
                    setSemesters(response.data);
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                })
        }
        //fetchData();
    }, []);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [semesterToRemove, setSemesterToRemove] = useState(null);

    function formatDateCro(isoDate) {
        const [year, month, day] = isoDate.split('-');
        return `${Number(day)}.${Number(month)}.${year}`;
    }

    const handleRowClick = (id) => {
        navigate(`/superadmin/semesters/${id}`);
    };

    const openConfirmDialog = (semester, e) => {
        e.stopPropagation();
        console.log(semester)
        setSemesterToRemove(semester);
        setDialogOpen(true);
    };

    const closeConfirmDialog = () => {
        setDialogOpen(false);
        setSemesterToRemove(null);
    };

    const confirmRemove = async () => {
        await api.delete(`semesters/${semesterToRemove.id}`)
            .then(response => {
                console.log(response.data);
                setSemesters((prev) => prev.filter((ev) => ev.id !== semesterToRemove.id));
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
                        {semesters && semesters.map((semester) => (
                            <TableRow
                                key={semester.id}
                                hover
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleRowClick(semester.id)}
                            >
                                <TableCell>{semester.name}</TableCell>
                                <TableCell>{formatDateCro(semester.dateFrom)}</TableCell>
                                <TableCell>{formatDateCro(semester.dateTo)}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={(e) => openConfirmDialog(semester, e)}
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
                        {`Jeste li sigurni da želite obrisati event "${semesterToRemove ? semesterToRemove.name+' '+formatDateCro(semesterToRemove.dateFrom)+'-'+formatDateCro(semesterToRemove.dateTo) : ''}"?`}
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

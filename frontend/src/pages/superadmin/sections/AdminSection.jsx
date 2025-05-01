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

const AdminSection = () => {
    const { id } = useParams();
    const { sectionId } = useSection();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const [section, setSection] = useState(null);

    useEffect(() => {
        setSection({id:id, name:"Šah", description:"Ovo je opis."})
        async function fetchData() {
            await api.get(`sections/${sectionId}/event/${id}`)
                .then(response => {
                    console.log(response.data)
                    setSection(response.data);
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                })
        }
        //fetchData();
    }, []);

    const usersData = [
        { name: 'John', surname: 'Doe', jmbag: '0036530114', email: 'john.doe@example.com' },
        { name: 'Jane', surname: 'Smith', jmbag: '0036530113', email: 'jane.smith@example.com' },
        { name: 'Tom', surname: 'Brown', jmbag: '0036530115', email: 'tom.brown@example.com' }
    ];
    const [admins, setAdmins] = useState(usersData);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [userToRemove, setUserToRemove] = useState(null);

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
            setAdmins((prev) => prev.filter((u) => u.jmbag !== userToRemove.jmbag));
        }
        closeConfirmDialog();
    };

    function formatDateCro(isoDate) {
        console.log("IsoDate:", isoDate);
        const [year, month, day] = isoDate.split('-');
        return `${Number(day)}.${Number(month)}.${year}.`;
    }

    const filteredUsers = admins.filter((user) => {
        const fullName = `${user.name.toLowerCase()} ${user.surname.toLowerCase()}`;
        const query = searchQuery.trim().toLowerCase();
        return (
            user.name.toLowerCase().includes(query) ||
            user.surname.toLowerCase().includes(query) ||
            user.jmbag.includes(query) ||
            user.email.toLowerCase().includes(query) ||
            fullName.includes(query)
        );
    });

    return (

        <div className="container">
            {section && (
                <div style={{width:"auto"}}>
                    <TitleContainer title={`Sekcija: ${section.name}`} description="Pogledaj info o sekciji" />
                    <div className="aboutText">
                        <div>
                    <Typography variant="h6" gutterBottom>
                        Podaci o sekciji
                    </Typography>
                    <Typography>
                        <strong>Naziv:</strong> {section.name}
                    </Typography>
                    <Typography>
                        <strong>Kratki opis:</strong> {section.description}
                    </Typography>
                    <div style={{ width: '90%', margin: '10px 0px' }}>
                        <Button variant="contained" onClick={() => navigate(`edit`)}
                        >
                            Uredi podatke
                        </Button>
                    </div>
                </div>
                <h2>Voditelji sekcije: {section.name}</h2>

                <div style={{ width: '90%', margin: '10px 0px' }}>
                    <Button variant="contained" onClick={() => navigate(`add-admin`)}
                    >
                        Dodaj novog voditelja
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
                                        <TableCell>{user.surname}, {user.name}</TableCell>
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
                            userToRemove ? `${userToRemove.surname}, ${userToRemove.name}` : ''
                        }?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeConfirmDialog}>Otkaži</Button>
                        <Button color="error" onClick={confirmRemove}>Obriši</Button>
                    </DialogActions>
                </Dialog>
            </div>
                </div>

            )}

        </div>

    );
};

export default AdminSection;

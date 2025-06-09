import React, {useEffect, useState} from 'react';
import {
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import { useNavigate } from 'react-router-dom';
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";

const AllUsers = () => {
  const navigate = useNavigate();
  const {sectionId} = useSection();

  // Example initial data; replace or fetch from API as needed
  const [members, setMembers] = useState();

  useEffect(() => {
    async function fetchData() {
      await api.get(`sections/${sectionId}/members`)
          .then(response => {
            setMembers(response.data);
          })
          .catch(error => {
            console.log("Error fetching data ", error);
          })
    }
    fetchData();
  }, [sectionId]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  const handleRowClick = (id) => {
    navigate(`/admin/users/${id}`);
  };

  const openConfirmDialog = (member, e) => {
    e.stopPropagation();
    setMemberToRemove(member);
    setDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setDialogOpen(false);
    setMemberToRemove(null);
  };

  const confirmRemove = async () => {
    await api.delete(`sections/${sectionId}/members/${memberToRemove.memberId}`)
        .then(response => {
          setMembers((prev) => prev.filter((member) => member.memberId !== memberToRemove.memberId));
        })
        .catch(error => {
          console.log("Error deleting data, ", error);
        })
    closeConfirmDialog();
  };

  const [searchTerm, setSearchTerm] = useState('');
  const filteredMembers = members?.filter(member => {
    const q = searchTerm.trim().toLowerCase();
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    return (
        fullName.includes(q) ||
        member.jmbag.includes(q)
    );
  });


  return (
      <div className='container'>
        <TitleContainer
            title="Lista članova"
            description="Pregled i upravljanje članovima"
        />

        {/* Ovdje ide još filter za usera */}
        <FilterUsers value={searchTerm} onChange={setSearchTerm} />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ime i prezime</TableCell>
                <TableCell>JMBAG</TableCell>
                <TableCell>Polaže TZK</TableCell>
                <TableCell align="center">Akcije</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members && filteredMembers && filteredMembers.map((member) => (
                  <TableRow
                      key={member.jmbag}
                      hover
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRowClick(member.memberId)}
                  >
                    <TableCell>{member.firstName} {member.lastName}</TableCell>
                    <TableCell>{member.jmbag}</TableCell>
                    <TableCell>{member.active?"Da":"Ne"}</TableCell>
                    <TableCell align="center">
                      <IconButton
                          onClick={(e) => openConfirmDialog(member, e)}
                      >
                        <FontAwesomeIcon icon={faBan} />
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
              {`Jeste li sigurni da želite obrisati event "${memberToRemove ? memberToRemove.firstName+' '+memberToRemove.lastName+' '+memberToRemove.jmbag : ''}"?`}
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

const FilterUsers = ({ value, onChange }) => (
    <Box mb={2}>
      <TextField
          fullWidth
          label="Pretraži po imenu, prezimenu ili JMBAG"
          variant="outlined"
          value={value}
          onChange={e => onChange(e.target.value)}
      />
    </Box>
);


export default AllUsers;

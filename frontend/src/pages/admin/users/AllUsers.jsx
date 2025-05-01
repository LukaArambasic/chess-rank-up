import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import TitleContainer from '../../../components/titleContainer/TitleContainer';

const AllUsers = () => {
  const usersData = [
    { name: 'John', surname: 'Doe', id: "0036530114", email: "john.doe@example.com", active: true, points: 8, pe: true },
    { name: 'Jane', surname: 'Smith', id: "0036530113", email: "jane.smith@example.com", active: true, points: 1, pe: false },
    { name: 'Tom', surname: 'Brown', id: "0036530115", email: "tom.brown@example.com", active: false, points: 10, pe: true },
  ];

  const [users, setUsers] = useState(usersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on search input (name, surname, id, or email)
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.toLowerCase()} ${user.surname.toLowerCase()}`;
    const searchWords = searchQuery.trim().toLowerCase().split(' ');

    return (
      user.name.toLowerCase().includes(searchWords[0]) ||
      user.surname.toLowerCase().includes(searchWords[0]) ||
      user.id.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (searchWords.length > 1 && fullName.includes(searchQuery.toLowerCase()))
    );
  });

  // Handle open/close for the pop-up modal
  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const togglePEStatus = () => {
    setUsers(users.map(user => {
      if (user.id === selectedUser.id) {
        return { ...user, pe: !user.pe };
      }
      return user;
    }));
    handleClose();
  };

  return (
    <div className='container'>
      <TitleContainer title={"Svi korisnici"} description={"Pogledaj listu svih korisnika"} />
      <div className='aboutText'>
        <h2>Sudionici</h2>
        <p style={{ color: 'grey' }}>Prikazuje se samo ime, ali možete pretraživati i po JMBAG-u i emailu</p>

        {/* Search bar */}
        <TextField
          label="Pretraži po imenu, JMBAG-u ili emailu"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px' }}
        />

        {/* Users Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ime</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>P.E.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.surname}, {user.name}</TableCell>
                  <TableCell>{user.points}</TableCell>
                  <TableCell>
                    <div 
                      onClick={() => handleOpen(user)} 
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: user.pe ? 'red' : 'green'
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={user.pe ? faTimes : faCheck} 
                        style={{ color: 'white' }} 
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: 'center' }}>Nema korisnika</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Promijeni P.E. status"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to ${selectedUser?.pe ? 'remove' : 'add'} ${selectedUser?.name} ${selectedUser?.surname} to P.E.?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={togglePEStatus} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllUsers;

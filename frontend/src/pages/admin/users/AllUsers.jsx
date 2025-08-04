import React, {useEffect, useState} from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
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
  Button,
  TextField,
  Avatar,
  Stack,
  Chip,
  Fade
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Groups,
  Person,
  Search as SearchIcon,
  LocalFireDepartment,
  Timeline,
  Assessment,
  CheckCircle,
  Block
} from '@mui/icons-material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import { useNavigate } from 'react-router-dom';
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";

const AllUsers = () => {
  const navigate = useNavigate();
  const {sectionId} = useSection();

  const [members, setMembers] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

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

  const filteredMembers = members?.filter(member => {
    const q = searchTerm.trim().toLowerCase();
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    return (
        fullName.includes(q) ||
        member.jmbag.includes(q)
    );
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TitleContainer title="👥 SVI ČLANOVI" description="Upravljaj svim članovima sekcije!" />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Epic Hero Section */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            mb: 4,
            background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
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
          
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Groups sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
            <Typography variant="h3" component="h1" gutterBottom sx={{ 
              fontWeight: 900,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 2
            }}>
              ČLANOVI KONTROLA
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
              Upravljaj svojom zajednicom s ponosom! 🚀
            </Typography>
          </Box>
        </Paper>

        {/* Search Section */}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <SearchIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Pretraži Članove
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Pretraži po imenu, prezimenu ili JMBAG"
            variant="outlined"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white'
              }
            }}
          />
        </Paper>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
              <CardContent>
                <Groups sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {members?.length || 0}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Ukupno članova
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
              <CardContent>
                <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {members?.filter(m => m.active).length || 0}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Aktivni članovi
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
              <CardContent>
                <SearchIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {filteredMembers?.length || 0}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Filtrirani rezultati
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
              <CardContent>
                <Assessment sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  100%
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Kontrola
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Members Table */}
        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ 
            p: 3, 
            background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
            color: 'white'
          }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Timeline sx={{ fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                📊 LISTA ČLANOVA ({filteredMembers?.length || 0})
              </Typography>
            </Stack>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person sx={{ fontSize: 20, color: 'primary.main' }} />
                      <span>Ime i prezime</span>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    JMBAG
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    Akcije
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members && filteredMembers && filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => (
                    <Fade in timeout={300 + index * 100} key={member.jmbag}>
                      <TableRow
                        hover
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'action.hover',
                            transform: 'translateX(4px)',
                            transition: 'all 0.3s ease'
                          },
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => handleRowClick(member.memberId)}
                      >
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar sx={{ 
                              bgcolor: 'primary.main', 
                              width: 32, 
                              height: 32,
                              fontSize: '0.875rem'
                            }}>
                              {member.firstName[0]}{member.lastName[0]}
                            </Avatar>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {member.firstName} {member.lastName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {member.jmbag}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={member.active ? <CheckCircle /> : <Block />}
                            label={member.active ? "Aktivan" : "Neaktivan"}
                            color={member.active ? "success" : "default"}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={(e) => openConfirmDialog(member, e)}
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
                    </Fade>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', py: 6 }}>
                      <Groups sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        Nema članova
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {searchTerm ? 'Pokušajte s drugim pojmom za pretraživanje' : 'Dodajte prve članove u sekciju!'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
            🗑️ Ukloni člana
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <DialogContentText sx={{ fontSize: '1rem', color: 'text.primary' }}>
              Jeste li sigurni da želite ukloniti člana:
            </DialogContentText>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: 'primary.main',
              mt: 1,
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 2
            }}>
              {memberToRemove ? `${memberToRemove.firstName} ${memberToRemove.lastName} (${memberToRemove.jmbag})` : ''}
            </Typography>
            <Typography variant="body2" color="error.main" sx={{ mt: 2, fontWeight: 500 }}>
              ⚠️ Član će biti uklonjen iz sekcije!
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
            Svaki član čini sekciju jačom! 💪
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Upravljaj svojom zajednicom s ponosom i odgovornošću! 🔥
          </Typography>
        </Paper>
      </Container>

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

export default AllUsers;
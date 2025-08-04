import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip,
  Stack,
  Paper,
  Avatar
} from '@mui/material';
import {
  Groups,
  AdminPanelSettings,
  Person,
  TrendingUp,
  EmojiEvents,
  School
} from '@mui/icons-material';
import TitleContainer from '../../components/titleContainer/TitleContainer';
import api from "../../api";
import { useAuth } from "../../contexts/AuthProvider";
import { useSection } from "../../contexts/SectionProvider";

const EnrolledSections = () => {
  const { user } = useAuth();
  const { setSection } = useSection();
  const navigate = useNavigate();
  const [mySections, setMySections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`members/${user.id}/sections`);
        setMySections(response.data);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user.id]);

  const handleSectionClick = (section) => {
    let role = "user";
    let navPath = "/profile";
    
    if (section.rank === "Kralj") {
      role = "admin";
      navPath = "/admin";
    }
    
    setSection(section.id, role);
    navigate(navPath);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 'Kralj':
        return <AdminPanelSettings sx={{ fontSize: 24, color: 'warning.main' }} />;
      default:
        return <Person sx={{ fontSize: 24, color: 'primary.main' }} />;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Kralj':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const getRankLabel = (rank) => {
    switch (rank) {
      case 'Kralj':
        return 'Administrator';
      default:
        return 'Član';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TitleContainer title="Moje sekcije" description="Pristupite sekcijama u kojima ste prijavljeni" />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Učitavanje vaših sekcija...
            </Typography>
          </Box>
        ) : mySections.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              bgcolor: 'grey.50',
              border: '1px solid',
              borderColor: 'grey.200'
            }}
          >
            <School sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="text.secondary">
              Niste pridruženi nijednoj sekciji
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Istražite dostupne sekcije i pridružite se onima koje vas zanimaju
            </Typography>
            <Box>
              <Typography
                variant="body2"
                color="primary.main"
                sx={{ 
                  cursor: 'pointer', 
                  textDecoration: 'underline',
                  '&:hover': { color: 'primary.dark' }
                }}
                onClick={() => navigate('/join')}
              >
                Pogledajte sve sekcije →
              </Typography>
            </Box>
          </Paper>
        ) : (
          <>
            {/* Stats */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Pridruženi ste {mySections.length} {mySections.length === 1 ? 'sekciji' : 'sekcija'}
              </Typography>
            </Box>

            {/* Sections Grid */}
            <Grid container spacing={3}>
              {mySections.map((section) => (
                <Grid item xs={12} sm={6} lg={4} key={section.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      position: 'relative',
                      background: section.rank === 'Kralj' 
                        ? 'linear-gradient(135deg, #FFF8E1 0%, #FFFDE7 100%)'
                        : 'linear-gradient(135deg, #FFFFFF 0%, #F7FAFC 100%)',
                      border: '1px solid',
                      borderColor: section.rank === 'Kralj' ? 'warning.light' : 'grey.200',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: section.rank === 'Kralj'
                          ? '0 12px 40px rgba(255, 193, 7, 0.15)'
                          : '0 12px 40px rgba(0,0,0,0.12)'
                      }
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleSectionClick(section)}
                      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Stack spacing={3} sx={{ height: '100%' }}>
                          {/* Header with icon and role */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Avatar
                              sx={{
                                bgcolor: section.rank === 'Kralj' ? 'warning.main' : 'primary.main',
                                width: 48,
                                height: 48
                              }}
                            >
                              <Groups sx={{ fontSize: 24 }} />
                            </Avatar>
                            <Chip
                              icon={getRankIcon(section.rank)}
                              label={getRankLabel(section.rank)}
                              size="small"
                              color={getRankColor(section.rank)}
                              variant="outlined"
                            />
                          </Box>

                          {/* Section name */}
                          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                            {section.name}
                          </Typography>

                          {/* Role description */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ flexGrow: 1, lineHeight: 1.6 }}
                          >
                            {section.rank === 'Kralj' 
                              ? 'Imate administratorske privilegije u ovoj sekciji. Možete upravljati članovima, događanjima i bodovima.'
                              : 'Član sekcije. Možete vidjeti svoj profil, bodove i sudjelovati u događanjima.'
                            }
                          </Typography>

                          {/* Action indicators */}
                          <Box>
                            <Stack direction="row" spacing={2} alignItems="center">
                              {section.rank === 'Kralj' ? (
                                <>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <AdminPanelSettings sx={{ fontSize: 16, color: 'warning.main' }} />
                                    <Typography variant="caption" color="warning.main" sx={{ fontWeight: 500 }}>
                                      Admin panel
                                    </Typography>
                                  </Box>
                                </>
                              ) : (
                                <>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <TrendingUp sx={{ fontSize: 16, color: 'primary.main' }} />
                                    <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                                      Moj profil
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <EmojiEvents sx={{ fontSize: 16, color: 'secondary.main' }} />
                                    <Typography variant="caption" color="secondary.main" sx={{ fontWeight: 500 }}>
                                      Bodovi
                                    </Typography>
                                  </Box>
                                </>
                              )}
                            </Stack>
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Call to action */}
            <Paper
              elevation={0}
              sx={{
                mt: 6,
                p: 4,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #E6FFFA 0%, #B2F5EA 100%)',
                border: '1px solid',
                borderColor: 'success.light'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Želite se pridružiti još sekcija?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Istražite sve dostupne sportske sekcije na FER-u
              </Typography>
              <Typography
                variant="body2"
                color="success.main"
                sx={{ 
                  cursor: 'pointer', 
                  textDecoration: 'underline',
                  fontWeight: 500,
                  '&:hover': { color: 'success.dark' }
                }}
                onClick={() => navigate('/join')}
              >
                Pogledajte sve sekcije →
              </Typography>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default EnrolledSections;
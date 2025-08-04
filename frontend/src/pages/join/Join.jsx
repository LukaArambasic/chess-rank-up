import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  TextField,
  Button,
  Chip,
  Stack,
  InputAdornment,
  Paper
} from '@mui/material';
import {
  Search,
  Groups,
  PersonAdd,
  CheckCircle,
  Info
} from '@mui/icons-material';
import TitleContainer from "../../components/titleContainer/TitleContainer";
import api from "../../api";
import { useAuth } from "../../contexts/AuthProvider";
import { useSection } from "../../contexts/SectionProvider";

const Join = () => {
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setSection } = useSection();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let functionSections = [];
        
        const sectionsResponse = await api.get("sections");
        functionSections = sectionsResponse.data;
        
        const userSectionsResponse = await api.get(`members/${user.id}/sections`);
        const mySectionIds = userSectionsResponse.data.map(section => section.id);
        
        const updatedSections = functionSections.map(section => ({
          ...section,
          enrolled: mySectionIds.includes(section.id)
        }));
        
        setSections(updatedSections);
        setFilteredSections(updatedSections);
      } catch (error) {
        console.log("Error happened: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user.id]);

  useEffect(() => {
    const filtered = sections.filter(section =>
      section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (section.descriptionUrl && section.descriptionUrl.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredSections(filtered);
  }, [searchQuery, sections]);

  const handleSectionClick = (id) => {
    navigate(`/section/${id}`);
  };

  const handleJoinClick = async (event, id) => {
    event.stopPropagation();
    
    try {
      const data = {
        "jmbag": user.jmbag,
        "rankName": "Pijun"
      };
      
      await api.post(`sections/${id}/members`, data);
      setSection(id, "user");
      navigate(`/profile`);
    } catch (error) {
      console.log("Error adding section: ", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TitleContainer title="Sve sekcije" description="Istražite i pridružite se sportskim sekcijama na FER-u" />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
            border: '1px solid',
            borderColor: 'grey.200'
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pretražite sekcije po nazivu ili opisu..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white',
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              }
            }}
          />
        </Paper>

        {/* Stats */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Pronađeno {filteredSections.length} od {sections.length} sekcija
          </Typography>
        </Box>

        {/* Sections Grid */}
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Učitavanje sekcija...
            </Typography>
          </Box>
        ) : filteredSections.length === 0 ? (
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
            <Search sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="text.secondary">
              Nema rezultata
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Pokušajte s drugim pojmom za pretraživanje
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredSections.map((section) => (
              <Grid item xs={12} sm={6} lg={4} key={section.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardActionArea
                    onClick={() => handleSectionClick(section.id)}
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Stack spacing={2} sx={{ height: '100%' }}>
                        {/* Header with icon and status */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Groups sx={{ fontSize: 32, color: 'primary.main' }} />
                          {section.enrolled && (
                            <Chip
                              icon={<CheckCircle />}
                              label="Pridružen"
                              size="small"
                              color="success"
                              variant="outlined"
                            />
                          )}
                        </Box>

                        {/* Section name */}
                        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {section.name}
                        </Typography>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            flexGrow: 1,
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {section.descriptionUrl || 'Kliknite za više informacija o ovoj sekciji...'}
                        </Typography>

                        {/* Action area */}
                        <Box sx={{ pt: 2 }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Info sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              Kliknite za detalje
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </CardActionArea>

                  {/* Join button */}
                  {!section.enrolled && (
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<PersonAdd />}
                        onClick={(event) => handleJoinClick(event, section.id)}
                        sx={{
                          py: 1.5,
                          background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(56, 161, 105, 0.3)'
                          }
                        }}
                      >
                        Pridruži se
                      </Button>
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Join;
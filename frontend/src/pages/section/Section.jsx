import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Avatar,
  Stack,
  Chip,
  Button,
  Divider,
  LinearProgress,
  Fade,
  Zoom
} from '@mui/material';
import {
  Groups,
  EmojiEvents,
  TrendingUp,
  PersonAdd,
  Star,
  Timeline,
  CheckCircle,
  LocalFireDepartment,
  Speed,
  School,
  AdminPanelSettings,
  CalendarToday,
  Leaderboard
} from '@mui/icons-material';
import TitleContainer from "../../components/titleContainer/TitleContainer";
import api from "../../api";
import { useAuth } from "../../contexts/AuthProvider";
import { useSection } from "../../contexts/SectionProvider";

const Section = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { setSection } = useSection();
  const navigate = useNavigate();
  
  const [sectionData, setSectionData] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  // Mock additional data - you can replace with real API calls
  const [sectionStats, setSectionStats] = useState({
    totalMembers: 45,
    activeMembers: 38,
    recentEvents: 12,
    topPerformers: [
      { name: "Ana Kovač", points: 156, rank: "Kraljica" },
      { name: "Marko Babić", points: 142, rank: "Top" },
      { name: "Petra Novak", points: 128, rank: "Skakač" }
    ],
    recentActivity: [
      { event: "Turnir u brzopoteznom šahu", date: "2024-01-15", participants: 24 },
      { event: "Simultanka s velemajstorom", date: "2024-01-10", participants: 18 },
      { event: "Analiza partija", date: "2024-01-08", participants: 15 }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/sections/${id}`);
        setSectionData(response.data);
        
        // Check if user is already joined
        if (user) {
          const userSectionsResponse = await api.get(`members/${user.id}/sections`);
          const joinedSectionIds = userSectionsResponse.data.map(section => section.id);
          setIsJoined(joinedSectionIds.includes(parseInt(id)));
        }
      } catch (error) {
        console.log("Section error: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, user]);

  const handleJoinSection = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setJoining(true);
      const data = {
        "jmbag": user.jmbag,
        "rankName": "Pijun"
      };
      
      await api.post(`sections/${id}/members`, data);
      setSection(id, "user");
      setIsJoined(true);
      
      // Navigate to profile after joining
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    } catch (error) {
      console.log("Error joining section: ", error);
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <TitleContainer title="Učitavanje..." description="Priprema se sekcija..." />
        <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
          <Paper sx={{ p: 6, background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)', color: 'white' }}>
            <Speed sx={{ fontSize: 64, mb: 2, animation: 'spin 2s linear infinite' }} />
            <Typography variant="h5">Učitavanje sekcije...</Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (!sectionData) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <TitleContainer title="Greška" description="Sekcija nije pronađena" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TitleContainer 
        title={sectionData.name} 
        description="Otkrijte sve o ovoj sekciji" 
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            mb: 4,
            background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)',
            color: 'white',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              zIndex: 0
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  border: '4px solid rgba(255, 255, 255, 0.3)',
                  fontSize: '3rem'
                }}
              >
                <Groups sx={{ fontSize: '3rem' }} />
              </Avatar>
              
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ 
                  fontWeight: 700,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {sectionData.name}
                </Typography>
                
                <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ mb: 2 }}>
                  {isJoined && (
                    <Chip
                      icon={<CheckCircle />}
                      label="Pridružen"
                      sx={{ 
                        bgcolor: 'rgba(76, 175, 80, 0.2)', 
                        color: 'white',
                        border: '1px solid rgba(76, 175, 80, 0.5)',
                        '& .MuiChip-icon': { color: 'white' }
                      }}
                    />
                  )}
                  <Chip
                    icon={<Groups />}
                    label={`${sectionStats.totalMembers} članova`}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      '& .MuiChip-icon': { color: 'white' }
                    }}
                  />
                </Stack>
                
                <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: '600px' }}>
                  {sectionData.descriptionUrl || "Pridružite se našoj zajednici i otkrijte svijet sporta!"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Stats Cards */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Zoom in timeout={600}>
                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                    color: 'white',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Groups sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                        {sectionStats.totalMembers}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Ukupno članova
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Zoom in timeout={800}>
                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    color: 'white',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <LocalFireDepartment sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                        {sectionStats.activeMembers}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Aktivni članovi
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Zoom in timeout={1000}>
                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: 'white',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <EmojiEvents sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                        {sectionStats.recentEvents}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Događanja ovaj mjesec
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Zoom in timeout={1200}>
                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                    color: 'white',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Star sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                        {sectionStats.topPerformers.length}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Top performeri
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            </Grid>
          </Grid>

          {/* Top Performers */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1400}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="h5" gutterBottom sx={{ 
                  fontWeight: 600, 
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Leaderboard />
                  Top Performeri
                </Typography>
                
                <Stack spacing={2}>
                  {sectionStats.topPerformers.map((performer, index) => (
                    <Card key={index} sx={{ 
                      background: index === 0 ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' : 'background.paper',
                      color: index === 0 ? 'white' : 'text.primary',
                      transition: 'transform 0.2s ease',
                      '&:hover': { transform: 'translateX(4px)' }
                    }}>
                      <CardContent sx={{ py: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar sx={{ 
                            bgcolor: index === 0 ? 'rgba(255,255,255,0.2)' : 'primary.main',
                            width: 40,
                            height: 40,
                            fontSize: '1.2rem'
                          }}>
                            {index + 1}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {performer.name}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              opacity: index === 0 ? 0.9 : 0.7 
                            }}>
                              {performer.rank}
                            </Typography>
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {performer.points}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </Paper>
            </Fade>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1600}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="h5" gutterBottom sx={{ 
                  fontWeight: 600, 
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Timeline />
                  Nedavna Aktivnost
                </Typography>
                
                <Stack spacing={2}>
                  {sectionStats.recentActivity.map((activity, index) => (
                    <Card key={index} sx={{ 
                      background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      transition: 'transform 0.2s ease',
                      '&:hover': { transform: 'translateX(4px)' }
                    }}>
                      <CardContent sx={{ py: 2 }}>
                        <Stack spacing={1}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {activity.event}
                          </Typography>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Chip
                              icon={<CalendarToday />}
                              label={new Date(activity.date).toLocaleDateString('hr-HR')}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              icon={<Groups />}
                              label={`${activity.participants} sudionika`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </Paper>
            </Fade>
          </Grid>
        </Grid>

        {/* Join Section CTA */}
        {!isJoined && user && (
          <Fade in timeout={1800}>
            <Paper
              elevation={0}
              sx={{
                mt: 6,
                p: 6,
                textAlign: 'center',
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
                  bottom: -50,
                  left: -50,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  zIndex: 0
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <PersonAdd sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                  Spreman za pridruživanje? 🚀
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, maxWidth: '600px', mx: 'auto' }}>
                  Postani dio naše zajednice i počni svoju sportsku avanturu!
                </Typography>
                
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleJoinSection}
                  disabled={joining}
                  startIcon={joining ? <Speed sx={{ animation: 'spin 1s linear infinite' }} /> : <PersonAdd />}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    bgcolor: 'white',
                    color: 'success.main',
                    '&:hover': {
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                    },
                    '&:disabled': {
                      bgcolor: 'rgba(255,255,255,0.7)',
                      color: 'success.main'
                    }
                  }}
                >
                  {joining ? 'Pridružujem se...' : 'Pridruži se sekciji'}
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}

        {/* Already Joined Message */}
        {isJoined && (
          <Fade in timeout={1800}>
            <Paper
              elevation={0}
              sx={{
                mt: 6,
                p: 4,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)',
                color: 'white',
                borderRadius: 3
              }}
            >
              <CheckCircle sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Već ste član ove sekcije! 🎉
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Idite na svoj profil da vidite svoje bodove i aktivnosti
              </Typography>
            </Paper>
          </Fade>
        )}
      </Container>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default Section;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
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
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Fade,
  Zoom
} from '@mui/material';
import {
  ArrowBack,
  Timeline,
  EmojiEvents,
  TrendingUp,
  CalendarToday,
  Star,
  LocalFireDepartment,
  Speed,
  Assessment,
  CheckCircle,
  Schedule,
  Whatshot,
  FlashOn
} from '@mui/icons-material';
import TitleContainer from '../../components/titleContainer/TitleContainer';
import { useSection } from "../../contexts/SectionProvider";
import { useAuth } from "../../contexts/AuthProvider";
import api from "../../api";

const Activity = () => {
  const { sectionId } = useSection();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalPoints: 0,
    averagePoints: 0,
    bestMonth: '',
    streak: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`sections/${sectionId}/members/${user.id}/profile/activities`);
        const events = response.data.events || [];
        setActivities(events);
        
        // Calculate stats
        const totalPoints = events.reduce((sum, event) => sum + (event.points || 0), 0);
        const averagePoints = events.length > 0 ? Math.round(totalPoints / events.length * 10) / 10 : 0;
        
        setStats({
          totalEvents: events.length,
          totalPoints,
          averagePoints,
          bestMonth: 'Januar 2024', // Mock data - you can calculate this
          streak: 5 // Mock data - consecutive events
        });
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (sectionId && user?.id) {
      fetchData();
    }
  }, [sectionId, user?.id]);

  const formatDateCro = (isoDate) => {
    if (!isoDate) return 'N/A';
    const [year, month, day] = isoDate.split('-');
    return `${Number(day)}.${Number(month)}.${year}.`;
  };

  const getEventTypeColor = (points) => {
    if (points >= 6) return 'error';
    if (points >= 4) return 'warning';
    if (points >= 2) return 'info';
    return 'success';
  };

  const getEventTypeIcon = (points) => {
    if (points >= 6) return <LocalFireDepartment />;
    if (points >= 4) return <Whatshot />;
    if (points >= 2) return <FlashOn />;
    return <CheckCircle />;
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <TitleContainer title="Učitavanje..." description="Priprema se vaša aktivnost..." />
        <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
          <Paper sx={{ p: 6, background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)', color: 'white' }}>
            <Speed sx={{ fontSize: 64, mb: 2, animation: 'spin 2s linear infinite' }} />
            <Typography variant="h5">Učitavanje aktivnosti...</Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TitleContainer 
        title="🔥 MOJA AKTIVNOST" 
        description={`${user?.firstName} ${user?.lastName} - Putovanje kroz bodove`} 
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <IconButton
            component={Link}
            to="/profile"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'translateX(-4px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowBack />
          </IconButton>
        </Box>

        {/* Hero Stats Section */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            <Timeline sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
            <Typography variant="h3" component="h1" gutterBottom sx={{ 
              fontWeight: 900,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              PREGLED AKTIVNOSTI
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Detaljni pregled svih vaših događanja i bodova 📊
            </Typography>
          </Box>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Zoom in timeout={600}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-8px)' }
              }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <EmojiEvents sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {stats.totalEvents}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Ukupno događanja
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
                '&:hover': { transform: 'translateY(-8px)' }
              }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Star sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {stats.totalPoints}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Ukupno bodova
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Zoom in timeout={1000}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-8px)' }
              }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <TrendingUp sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {stats.averagePoints}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Prosjek po događaju
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Zoom in timeout={1200}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-8px)' }
              }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <LocalFireDepartment sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {stats.streak}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Niz događanja
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        </Grid>

        {/* Activity Timeline */}
        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ 
            p: 3, 
            background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
            color: 'white'
          }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Assessment sx={{ fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                📊 KRONOLOGIJA AKTIVNOSTI
              </Typography>
            </Stack>
          </Box>
          
          {activities.length === 0 ? (
            <Box sx={{ p: 6, textAlign: 'center' }}>
              <Schedule sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h5" gutterBottom color="text.secondary">
                Nema zabilježenih aktivnosti
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Vaše buduće aktivnosti će se prikazati ovdje
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarToday sx={{ fontSize: 20 }} />
                        <span>Datum</span>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <EmojiEvents sx={{ fontSize: 20 }} />
                        <span>Događanje</span>
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                        <Star sx={{ fontSize: 20 }} />
                        <span>Bodovi</span>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.map((activity, index) => (
                    <Fade in timeout={300 + index * 100} key={index}>
                      <TableRow
                        sx={{
                          '&:hover': {
                            bgcolor: 'action.hover',
                            transform: 'translateX(4px)',
                            transition: 'all 0.3s ease'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar sx={{ 
                              bgcolor: 'primary.main', 
                              width: 32, 
                              height: 32,
                              fontSize: '0.875rem'
                            }}>
                              {index + 1}
                            </Avatar>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {formatDateCro(activity.date)}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {activity.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            icon={getEventTypeIcon(activity.points)}
                            label={`${activity.points} bodova`}
                            color={getEventTypeColor(activity.points)}
                            variant="outlined"
                            sx={{ 
                              fontWeight: 600,
                              minWidth: 100
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Bottom Motivation */}
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 4,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)',
            color: 'white',
            borderRadius: 3
          }}
        >
          <LocalFireDepartment sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Odličan napredak! 💪
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Svaki događaj doprinosi vašem uspjehu. Nastavite s dobrim radom!
          </Typography>
        </Paper>
      </Container>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default Activity;
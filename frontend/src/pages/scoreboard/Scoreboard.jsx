import React, { useEffect, useState } from "react";
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
  LinearProgress,
  Divider,
  Fade,
  Zoom
} from '@mui/material';
import {
  EmojiEvents,
  LocalFireDepartment,
  Star,
  TrendingUp,
  Shield,
  Speed,
  Whatshot,
  FlashOn
} from '@mui/icons-material';
import TitleContainer from "../../components/titleContainer/TitleContainer";
import api from "../../api";
import { useSection } from "../../contexts/SectionProvider";

const Scoreboard = ({ name, description }) => {
  const { sectionId } = useSection();
  const [scoreboard, setScoreboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/sections/${sectionId}/scoreboard/${name.toLowerCase()}`);
        setScoreboard(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (sectionId) {
      fetchData();
    }
  }, [name, sectionId]);

  const getPositionStyle = (position) => {
    if (position === 1) {
      return {
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)',
        border: '2px solid #FFD700'
      };
    } else if (position === 2) {
      return {
        background: 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)',
        color: 'white',
        boxShadow: '0 6px 24px rgba(192, 192, 192, 0.4)',
        border: '2px solid #C0C0C0'
      };
    } else if (position === 3) {
      return {
        background: 'linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)',
        color: 'white',
        boxShadow: '0 6px 24px rgba(205, 127, 50, 0.4)',
        border: '2px solid #CD7F32'
      };
    } else if (position <= 10) {
      return {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
        border: '2px solid #667eea'
      };
    } else {
      return {
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F7FAFC 100%)',
        color: 'text.primary',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #E2E8F0'
      };
    }
  };

  const getPositionIcon = (position) => {
    if (position === 1) return <EmojiEvents sx={{ fontSize: 32, color: '#FFD700' }} />;
    if (position === 2) return <Star sx={{ fontSize: 28, color: '#C0C0C0' }} />;
    if (position === 3) return <Whatshot sx={{ fontSize: 28, color: '#CD7F32' }} />;
    if (position <= 10) return <FlashOn sx={{ fontSize: 24, color: '#667eea' }} />;
    return <TrendingUp sx={{ fontSize: 20, color: 'text.secondary' }} />;
  };

  const getPositionBadge = (position) => {
    if (position === 1) return { label: '👑 KRALJ', color: '#FFD700' };
    if (position === 2) return { label: '🥈 VICEKRALJ', color: '#C0C0C0' };
    if (position === 3) return { label: '🥉 PRINC', color: '#CD7F32' };
    if (position <= 10) return { label: '⚡ TOP 10', color: '#667eea' };
    return null;
  };

  const getScoreboardTitle = () => {
    const titles = {
      'Semester': '🔥 SEMESTAR ARENA',
      'Year': '👑 GODIŠNJI TRON',
      'Total': '⚡ HALL OF LEGENDS'
    };
    return titles[name] || `🏆 ${name.toUpperCase()}`;
  };

  const getScoreboardGradient = () => {
    const gradients = {
      'Semester': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
      'Year': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      'Total': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
    };
    return gradients[name] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <TitleContainer title="🏆 Loading..." description="Priprema se arena..." />
        <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
          <Paper sx={{ p: 6, background: getScoreboardGradient(), color: 'white' }}>
            <Speed sx={{ fontSize: 64, mb: 2, animation: 'spin 2s linear infinite' }} />
            <Typography variant="h5">Učitavanje ratnika...</Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TitleContainer 
        title={getScoreboardTitle()} 
        description={description} 
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Epic Header */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            mb: 4,
            background: getScoreboardGradient(),
            color: 'white',
            borderRadius: 3,
            textAlign: 'center',
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
          
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            fontWeight: 900,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            position: 'relative',
            zIndex: 1
          }}>
            {scoreboard.length} RATNIKA U ARENI
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, position: 'relative', zIndex: 1 }}>
            Tko će vladati ovom kategorijom? 🔥
          </Typography>
        </Paper>

        {/* Top 3 Podium */}
        {scoreboard.length >= 3 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ 
              textAlign: 'center', 
              fontWeight: 700,
              mb: 4,
              background: 'linear-gradient(45deg, #FFD700, #FF6B35)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🏆 PODIJ POBJEDNIKA 🏆
            </Typography>
            
            <Grid container spacing={3} justifyContent="center">
              {/* 2nd Place */}
              <Grid item xs={12} sm={4}>
                <Zoom in timeout={800}>
                  <Card sx={{ 
                    ...getPositionStyle(2),
                    height: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transform: 'translateY(40px)'
                  }}>
                    <CardContent>
                      <Avatar sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: 'auto', 
                        mb: 2,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        fontSize: '2rem'
                      }}>
                        🥈
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        {scoreboard[1]?.firstName} {scoreboard[1]?.lastName}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 900 }}>
                        {scoreboard[1]?.points}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        bodova
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>

              {/* 1st Place */}
              <Grid item xs={12} sm={4}>
                <Zoom in timeout={1000}>
                  <Card sx={{ 
                    ...getPositionStyle(1),
                    height: 320,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '2rem',
                        animation: 'bounce 2s ease-in-out infinite'
                      }}
                    >
                      👑
                    </Box>
                    <CardContent>
                      <Avatar sx={{ 
                        width: 100, 
                        height: 100, 
                        mx: 'auto', 
                        mb: 2,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        fontSize: '3rem',
                        border: '3px solid rgba(255,255,255,0.5)'
                      }}>
                        🏆
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                        {scoreboard[0]?.firstName} {scoreboard[0]?.lastName}
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
                        {scoreboard[0]?.points}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        bodova
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>

              {/* 3rd Place */}
              <Grid item xs={12} sm={4}>
                <Zoom in timeout={600}>
                  <Card sx={{ 
                    ...getPositionStyle(3),
                    height: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transform: 'translateY(40px)'
                  }}>
                    <CardContent>
                      <Avatar sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: 'auto', 
                        mb: 2,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        fontSize: '2rem'
                      }}>
                        🥉
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        {scoreboard[2]?.firstName} {scoreboard[2]?.lastName}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 900 }}>
                        {scoreboard[2]?.points}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        bodova
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Full Leaderboard */}
        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ 
            p: 3, 
            background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
            color: 'white'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }}>
              📊 KOMPLETNA LJESTVICA
            </Typography>
          </Box>
          
          <Box sx={{ p: 2 }}>
            {scoreboard.map((member, index) => {
              const position = index + 1;
              const badge = getPositionBadge(position);
              
              return (
                <Fade in timeout={300 + index * 100} key={index}>
                  <Card
                    sx={{
                      ...getPositionStyle(position),
                      mb: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        boxShadow: position <= 3 ? '0 12px 40px rgba(0,0,0,0.2)' : '0 8px 24px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <CardContent sx={{ py: 2 }}>
                      <Stack direction="row" alignItems="center" spacing={3}>
                        {/* Position */}
                        <Box sx={{ 
                          minWidth: 60,
                          textAlign: 'center'
                        }}>
                          <Typography variant="h4" sx={{ 
                            fontWeight: 900,
                            color: position <= 3 ? 'inherit' : 'primary.main'
                          }}>
                            {position}
                          </Typography>
                        </Box>

                        {/* Icon */}
                        <Box>
                          {getPositionIcon(position)}
                        </Box>

                        {/* Name */}
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600,
                            color: position > 10 ? 'text.primary' : 'inherit'
                          }}>
                            {member.firstName} {member.lastName}
                          </Typography>
                          {badge && (
                            <Chip
                              label={badge.label}
                              size="small"
                              sx={{
                                bgcolor: position <= 10 ? 'rgba(255,255,255,0.2)' : badge.color + '20',
                                color: position <= 10 ? 'white' : badge.color,
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                mt: 0.5
                              }}
                            />
                          )}
                        </Box>

                        {/* Points */}
                        <Box sx={{ textAlign: 'right', minWidth: 100 }}>
                          <Typography variant="h5" sx={{ 
                            fontWeight: 800,
                            color: position <= 3 ? 'inherit' : 'primary.main'
                          }}>
                            {member.points}
                          </Typography>
                          <Typography variant="caption" sx={{ 
                            opacity: 0.8,
                            color: position > 10 ? 'text.secondary' : 'inherit'
                          }}>
                            bodova
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Fade>
              );
            })}
          </Box>
        </Paper>

        {/* Bottom Stats */}
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
          <Shield sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Borba se nastavlja! 💪
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Svaki bod te približava vrhu. Nastavi borbu, ratniče! 🔥
          </Typography>
        </Paper>
      </Container>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
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

export default Scoreboard;
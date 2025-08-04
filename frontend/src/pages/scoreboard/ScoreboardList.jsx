import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Paper,
  Avatar,
  Stack,
  Chip
} from '@mui/material';
import {
  EmojiEvents,
  Timeline,
  TrendingUp,
  Star,
  LocalFireDepartment,
  Speed,
  Military
} from '@mui/icons-material';
import TitleContainer from "../../components/titleContainer/TitleContainer";

const ScoreboardList = () => {
  const navigate = useNavigate();
  
  const scoreboardTypes = [
    {
      id: 1,
      name: "Semestar",
      title: "Trenutni Semestar",
      description: "Borba za vrh ovog semestra! Tko će dominirati?",
      icon: <LocalFireDepartment sx={{ fontSize: 48 }} />,
      gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
      color: "#FF6B35",
      to: "semester",
      badge: "🔥 LIVE",
      subtitle: "Aktivno natjecanje"
    },
    {
      id: 2,
      name: "Godina",
      title: "Godišnji Rang",
      description: "Najbolji performeri kroz cijelu godinu. Legendarni status!",
      icon: <EmojiEvents sx={{ fontSize: 48 }} />,
      gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
      color: "#FFD700",
      to: "year",
      badge: "👑 ELITE",
      subtitle: "Godišnji prvaci"
    },
    {
      id: 3,
      name: "Ukupno",
      title: "Hall of Fame",
      description: "Vječni rekorderi! Najveće legende svih vremena.",
      icon: <Military sx={{ fontSize: 48 }} />,
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
      color: "#8B5CF6",
      to: "total",
      badge: "⚡ LEGEND",
      subtitle: "Svi bodovi ikad"
    }
  ];

  const handleClick = (type) => {
    navigate(type.to);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TitleContainer 
        title="🏆 SCOREBOARD" 
        description="Izaberi svoju arenu za borbu!" 
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Epic Header */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            mb: 6,
            background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
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
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'rgba(255, 215, 0, 0.1)',
              zIndex: 0
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255, 107, 53, 0.1)',
              zIndex: 0
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 3 }}>
              <Avatar sx={{ bgcolor: '#FF6B35', width: 60, height: 60 }}>
                <LocalFireDepartment sx={{ fontSize: 32 }} />
              </Avatar>
              <Avatar sx={{ bgcolor: '#FFD700', width: 60, height: 60 }}>
                <EmojiEvents sx={{ fontSize: 32 }} />
              </Avatar>
              <Avatar sx={{ bgcolor: '#8B5CF6', width: 60, height: 60 }}>
                <Military sx={{ fontSize: 32 }} />
              </Avatar>
            </Stack>
            
            <Typography variant="h2" component="h1" gutterBottom sx={{ 
              fontWeight: 900, 
              background: 'linear-gradient(45deg, #FFD700, #FF6B35, #8B5CF6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}>
              ARENA RATNIKA
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 500 }}>
              Gdje se stvaraju legende i ruše rekordi! 🔥
            </Typography>
          </Box>
        </Paper>

        {/* Scoreboard Cards */}
        <Grid container spacing={4}>
          {scoreboardTypes.map((type, index) => (
            <Grid item xs={12} md={4} key={type.id}>
              <Card
                sx={{
                  height: '100%',
                  background: type.gradient,
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transform: 'perspective(1000px) rotateX(0deg)',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateX(-5deg) translateY(-20px)',
                    boxShadow: `0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px ${type.color}40`,
                  }
                }}
              >
                {/* Animated background elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    animation: 'float 6s ease-in-out infinite',
                    animationDelay: `${index * 0.5}s`,
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                      '50%': { transform: 'translateY(-20px) rotate(180deg)' }
                    }
                  }}
                />
                
                <CardActionArea
                  onClick={() => handleClick(type)}
                  sx={{ height: '100%', p: 4 }}
                >
                  <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 0 }}>
                    {/* Badge */}
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={type.badge}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          backdropFilter: 'blur(10px)'
                        }}
                      />
                    </Box>

                    {/* Icon */}
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {type.icon}
                      </Box>
                    </Box>

                    {/* Content */}
                    <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
                      <Typography variant="h4" component="h2" gutterBottom sx={{ 
                        fontWeight: 800,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        mb: 1
                      }}>
                        {type.title}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ 
                        opacity: 0.9, 
                        mb: 2,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {type.subtitle}
                      </Typography>
                      
                      <Typography variant="body1" sx={{ 
                        opacity: 0.95,
                        lineHeight: 1.6,
                        fontWeight: 400
                      }}>
                        {type.description}
                      </Typography>
                    </Box>

                    {/* Action indicator */}
                    <Box sx={{ 
                      mt: 3, 
                      textAlign: 'center',
                      opacity: 0.8
                    }}>
                      <Typography variant="caption" sx={{ 
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontWeight: 600
                      }}>
                        KLIKNI ZA ULAZAK →
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <Paper
          elevation={0}
          sx={{
            mt: 6,
            p: 4,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3
          }}
        >
          <Speed sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Spreman za borbu? 💪
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Odaberi svoju kategoriju i pokaži što vrijediš!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ScoreboardList;
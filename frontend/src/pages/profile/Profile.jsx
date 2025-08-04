import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Chip,
  LinearProgress,
  Divider,
  IconButton
} from '@mui/material';
import {
  Person,
  EmojiEvents,
  TrendingUp,
  School,
  Assessment,
  Star,
  Timeline,
  CheckCircle
} from '@mui/icons-material';
import TitleContainer from "../../components/titleContainer/TitleContainer";
import api from "../../api";
import { useAuth } from "../../contexts/AuthProvider";
import { useSection } from "../../contexts/SectionProvider";

// Chess piece icons mapping
const getRankIcon = (rankName) => {
  const iconMap = {
    "Pijun": "♟",
    "Lovac": "♗", 
    "Skakač": "♘",
    "Top": "♖",
    "Kraljica": "♕",
    "Kralj": "♔"
  };
  return iconMap[rankName] || "♟";
};

const getRankColor = (rankName) => {
  const colorMap = {
    "Pijun": "#9E9E9E",
    "Lovac": "#795548", 
    "Skakač": "#607D8B",
    "Top": "#FF9800",
    "Kraljica": "#E91E63",
    "Kralj": "#FFD700"
  };
  return colorMap[rankName] || "#9E9E9E";
};

const Profile = () => {
  const { user } = useAuth();
  const { sectionId } = useSection();
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`sections/${sectionId}/members/${user.id}/profile/general`);
        setMember(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sectionId && user?.id) {
      fetchData();
    }
  }, [sectionId, user?.id]);

  const calculateProgress = () => {
    const needed = member.additionalPointsNeeded || 0;
    const current = member.pointsSemester || 0;
    const total = current + needed;
    return total > 0 ? (current / total) * 100 : 0;
  };

  const getProgressColor = () => {
    const progress = calculateProgress();
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <TitleContainer title="Profil" description="Učitavanje..." />
        <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Učitavanje profila...
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TitleContainer 
        title={`${member.section} Profil`} 
        description={`${member.firstName} ${member.lastName}`} 
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header Card */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
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
              top: -50,
              right: -50,
              width: 200,
              height: 200,
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
                  fontSize: '3rem',
                  fontWeight: 'bold'
                }}
              >
                {getRankIcon(member.rankName)}
              </Avatar>
              
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  {member.firstName} {member.lastName}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ mb: 2 }}>
                  <Chip
                    icon={<School />}
                    label={member.jmbag}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      '& .MuiChip-icon': { color: 'white' }
                    }}
                  />
                  <Chip
                    label={member.rankName}
                    sx={{ 
                      bgcolor: getRankColor(member.rankName), 
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </Stack>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Član sekcije: {member.section}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Points Cards */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* Semester Points */}
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                    color: 'white'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Bodovi u semestru
                        </Typography>
                        <TrendingUp sx={{ fontSize: 32, opacity: 0.8 }} />
                      </Box>
                      
                      <Typography variant="h2" component="div" sx={{ fontWeight: 700 }}>
                        {member.pointsSemester || 0}
                      </Typography>
                      
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Do prolaza
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {member.additionalPointsNeeded || 0} bodova
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={calculateProgress()}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.3)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'white',
                              borderRadius: 4
                            }
                          }}
                        />
                      </Box>
                      
                      {member.additionalPointsNeeded <= 0 && (
                        <Chip
                          icon={<CheckCircle />}
                          label="Položeno!"
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(255, 255, 255, 0.2)', 
                            color: 'white',
                            '& .MuiChip-icon': { color: 'white' }
                          }}
                        />
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Total Points */}
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)',
                    color: 'white'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Ukupni bodovi
                        </Typography>
                        <EmojiEvents sx={{ fontSize: 32, opacity: 0.8 }} />
                      </Box>
                      
                      <Typography variant="h2" component="div" sx={{ fontWeight: 700 }}>
                        {member.pointsTotal || 0}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Svi bodovi ikad prikupljeni
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star sx={{ fontSize: 20, opacity: 0.8 }} />
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Rang: {member.rankName}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Activity Button */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to="/profile/activity"
                    sx={{ p: 3 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 56,
                          height: 56
                        }}
                      >
                        <Timeline sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                          Pregled aktivnosti
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Pogledajte detaljnu listu svih vaših događanja i bodova
                        </Typography>
                      </Box>
                      <Assessment sx={{ fontSize: 32, color: 'primary.main' }} />
                    </Stack>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
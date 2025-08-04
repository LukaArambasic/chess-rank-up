import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Paper,
  Chip,
  Stack
} from '@mui/material';
import {
  Groups,
  School,
  TrendingUp,
  EmojiEvents,
  Notifications,
  CalendarToday
} from '@mui/icons-material';
import TitleContainer from '../../components/titleContainer/TitleContainer';
import api from '../../api';

const HomePage = () => {
  const navigate = useNavigate();
  const [recentNews, setRecentNews] = useState([]);
  const [stats, setStats] = useState({
    totalSections: 0,
    totalMembers: 0,
    activeEvents: 0
  });

  useEffect(() => {
    // Fetch recent news and stats
    const fetchData = async () => {
      try {
        // Fetch recent news (limit to 3)
        const newsResponse = await api.get('/news/section/1');
        setRecentNews(newsResponse.data.slice(0, 3));
        
        // Fetch sections for stats
        const sectionsResponse = await api.get('/sections');
        setStats(prev => ({ ...prev, totalSections: sectionsResponse.data.length }));
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const navigationCards = [
    {
      id: 1,
      title: 'Moje sekcije',
      description: 'Pristupite sekcijama u kojima ste već prijavljeni',
      icon: <Groups sx={{ fontSize: 40 }} />,
      to: '/my-sections',
      color: 'primary.main',
      gradient: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)'
    },
    {
      id: 2,
      title: 'Sve sekcije',
      description: 'Istražite i pridružite se novim sekcijama na FER-u',
      icon: <School sx={{ fontSize: 40 }} />,
      to: '/join',
      color: 'secondary.main',
      gradient: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)'
    }
  ];

  const handleNavigationClick = (path) => {
    navigate(path);
  };

  const handleNewsClick = (newsItem) => {
    navigate(`/post/${newsItem.id}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TitleContainer title="Dobrodošli!" description="Vaš portal za sportske sekcije na FER-u" />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Main Navigation Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {navigationCards.map((card) => (
            <Grid item xs={12} md={6} key={card.id}>
              <Card
                sx={{
                  height: '100%',
                  background: card.gradient,
                  color: 'white',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardActionArea
                  onClick={() => handleNavigationClick(card.to)}
                  sx={{ height: '100%', p: 3 }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box sx={{ mb: 2 }}>
                      {card.icon}
                    </Box>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
            border: '1px solid',
            borderColor: 'grey.200'
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}>
            Statistike platforme
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <School sx={{ fontSize: 48, color: 'primary.main' }} />
                </Box>
                <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {stats.totalSections}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Aktivnih sekcija
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <Groups sx={{ fontSize: 48, color: 'secondary.main' }} />
                </Box>
                <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  500+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Registriranih studenata
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <EmojiEvents sx={{ fontSize: 48, color: 'warning.main' }} />
                </Box>
                <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'warning.main' }}>
                  25+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Događanja ovaj mjesec
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Recent News Section */}
        {recentNews.length > 0 && (
          <Box>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              <Notifications sx={{ mr: 1, verticalAlign: 'middle' }} />
              Najnovije vijesti
            </Typography>
            <Grid container spacing={3}>
              {recentNews.map((news) => (
                <Grid item xs={12} md={4} key={news.id}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                      }
                    }}
                  >
                    <CardActionArea onClick={() => handleNewsClick(news)} sx={{ height: '100%' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Stack spacing={2}>
                          <Box>
                            <Chip
                              icon={<CalendarToday />}
                              label={new Date(news.dateCreated).toLocaleDateString('hr-HR')}
                              size="small"
                              variant="outlined"
                              sx={{ mb: 1 }}
                            />
                          </Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                            {news.title}
                          </Typography>
                          <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6, opacity: 0.8 }}>
                            {news.content ? news.content.substring(0, 120) + '...' : 'Kliknite za više detalja...'}
                          </Typography>
                          <Box sx={{ pt: 1 }}>
                            <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                              {news.author?.firstName} {news.author?.lastName}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
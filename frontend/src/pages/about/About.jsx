import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
  Divider
} from '@mui/material';
import {
  School,
  EmojiEvents,
  Groups,
  Code,
  Timeline,
  Star
} from '@mui/icons-material';
import TitleContainer from "../../components/titleContainer/TitleContainer";

const About = () => {
  const teamMembers = [
    { name: "Luka Arambašić", role: "Lead Developer", avatar: "LA" },
    { name: "Petar Štika", role: "Backend Developer", avatar: "PŠ" },
    { name: "Marija Bilješko", role: "Frontend Developer", avatar: "MB" },
    { name: "Marin Čičak", role: "Full Stack Developer", avatar: "MČ" },
    { name: "Elma Vuran", role: "UI/UX Designer", avatar: "EV" },
    { name: "Marin Denić", role: "Database Architect", avatar: "MD" }
  ];

  const features = [
    {
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      title: "Praćenje bodova",
      description: "Detaljno praćenje svih prikupljenih bodova kroz semestre i godine"
    },
    {
      icon: <Groups sx={{ fontSize: 40 }} />,
      title: "Upravljanje sekcijama",
      description: "Jednostavno upravljanje članovima, događanjima i aktivnostima"
    },
    {
      icon: <Timeline sx={{ fontSize: 40 }} />,
      title: "Rangiranje",
      description: "Napredni sistem rangiranja s chess-inspired hijerarhijom"
    },
    {
      icon: <Code sx={{ fontSize: 40 }} />,
      title: "Moderna tehnologija",
      description: "Izgrađeno s najnovijim web tehnologijama za najbolju performansu"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TitleContainer title="O aplikaciji" description="Upoznajte RankUp platformu i naš tim" />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            mb: 6,
            background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)',
            color: 'white',
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          <School sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            RankUp
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Moderna platforma za praćenje sportskih aktivnosti i bodova studenata 
            Fakulteta elektrotehnike i računarstva
          </Typography>
        </Paper>

        {/* Sport at FER Section */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            <EmojiEvents sx={{ mr: 2, verticalAlign: 'middle' }} />
            Sport na FER-u
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.primary' }}>
            FER je najbolji fakultet u Hrvatskoj po uspjesima u raznim sportovima, i uprava FER-a jako potiče 
            svoje studente da nastave aktivno napredovati u sportu te razvijati sportski duh.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.primary' }}>
            Predmet Tjelesna i zdravstvena kultura (1, 2, 3 i 4) na Fakultetu elektrotehnike i računarstva, 
            koji vodi prof. Nera Žigić, je obavezan predmet za sve studente preddiplomskog studija.
          </Typography>
        </Paper>

        {/* FER Sections Section */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            <Groups sx={{ mr: 2, verticalAlign: 'middle' }} />
            FER sekcije i kako funkcioniraju
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.primary' }}>
            Jedan od načina promicanja sporta na FER-u su sportske sekcije. Sekcije su poput studentskih udruga, 
            operiraju samostalno, a voditelji su studenti koji su već položili tjelesni.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.primary' }}>
            Na FER-u, sekcije su osmišljene za sve studente zainteresirane za određeni sport, ali također imaju 
            mogućnost oslobađanja studenata od tjelesnog.
          </Typography>
        </Paper>

        {/* How RankUp Started Section */}
        <Paper elevation={0} sx={{ p: 4, mb: 6, border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            <Star sx={{ mr: 2, verticalAlign: 'middle' }} />
            Kako je nastao RankUp?
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.primary' }}>
            Studenti koji pohađaju predmet Tjelesna i zdravstvena kultura mogu vidjeti koliko su prikupili bodova 
            na FER Intranet stranici.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.primary' }}>
            Problem je da studenti oslobođeni tjelesnog preko sekcija ne mogu vidjeti broj bodova, odnosno, 
            pisat će im 0 prikupljenih bodova. Razlog je što voditelji sekcija nemaju pravo dodavanja bodova 
            na Intranet stranici.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.primary' }}>
            Da bi studenti oslobođeni tjelesnog preko sekcija znali koliko imaju bodova, šahovska sekcija je 
            osmislila aplikaciju RankUp.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.primary' }}>
            Aplikacija služi praćenju broja bodova, ali i mnogo toga više. Sekcije mogu objaviti buduća događanja 
            i obavijesti o prethodnim, napravljen je sistem rangiranja unutar sekcije, i mnogo toga drugog.
          </Typography>
        </Paper>

        {/* Features Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600, 
            color: 'primary.main', 
            textAlign: 'center',
            mb: 4 
          }}>
            Ključne funkcionalnosti
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
            border: '1px solid',
            borderColor: 'grey.200'
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600, 
            color: 'primary.main', 
            textAlign: 'center',
            mb: 4 
          }}>
            Naš tim
          </Typography>
          <Grid container spacing={3}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    textAlign: 'center',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: 'primary.main',
                        mx: 'auto',
                        mb: 2,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Chip
                      label={member.role}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
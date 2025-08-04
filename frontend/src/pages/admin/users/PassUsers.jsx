import React, {useEffect, useState} from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Paper,
    TextField,
    Button,
    Avatar,
    Stack,
    Chip,
    Alert,
    Fade,
    Zoom,
    Autocomplete,
    FormControl,
    InputLabel,
    Input,
    FormHelperText
} from '@mui/material';
import {
    Assessment,
    Download as DownloadIcon,
    CheckCircle,
    Calculate as CalculateIcon,
    Speed,
    LocalFireDepartment,
    Timeline,
    EmojiEvents
} from '@mui/icons-material';
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";

const PassUsers = () => {
    const { sectionId } = useSection();

    const [members, setMembers] = useState([]);
    const [threshold, setThreshold] = useState(1000);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [loading, setLoading] = useState(false);
    const [calculated, setCalculated] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('semesters');
                response.data.sort((a,b)=>b.dateTo-a.dateTo);
                const semesters = response.data.map(semester => ({
                    ...semester,
                    label: semester.name,
                }));
                setSemesters(semesters);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData();
    }, []);

    const handleCalculate = async () => {
        if (!selectedSemester) {
            alert('Molimo odaberite semestar');
            return;
        }
        
        try {
            setLoading(true);
            const response = await api.get(`sections/${sectionId}/participations/pass/${threshold}/semester/${selectedSemester.id}`);
            setMembers(response.data);
            setCalculated(true);
        } catch (error) {
            console.error("Error calculating data: ", error);
        } finally {
            setLoading(false);
        }
    };

    const saveExcel = () => {
        const plainText = members.map(member => "'"+member.jmbag).join('\n');
        const blob = new Blob([plainText], {type: 'text/csv;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "Prolaz.xlsx";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <TitleContainer title="✅ PRAG ZA PROLAZ" description="Generiraj listu studenata s dovoljno bodova!" />
            
            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* Header Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        mb: 4,
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
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
                        <Avatar sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)', 
                            width: 80, 
                            height: 80, 
                            mx: 'auto', 
                            mb: 2,
                            border: '3px solid rgba(255,255,255,0.3)'
                        }}>
                            <CheckCircle sx={{ fontSize: 40 }} />
                        </Avatar>
                        
                        <Typography variant="h3" component="h1" gutterBottom sx={{ 
                            fontWeight: 700,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            mb: 2
                        }}>
                            PROLAZ KALKULATOR
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            Generiraj listu studenata koji su položili! 🎯
                        </Typography>
                    </Box>
                </Paper>

                {/* Info Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 4,
                        background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
                        border: '1px solid',
                        borderColor: 'info.light',
                        borderRadius: 2
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.main', mb: 2 }}>
                        📋 Upute za korištenje
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
                        • Ovdje dobivate popis svih studenata koji su skupili dovoljno bodova u odabranom semestru
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        • Prag birate sami i potpuno je proizvoljan - preporučuje se 1000 bodova
                    </Typography>
                </Paper>

                {/* Main Form */}
                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ 
                        p: 3, 
                        background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
                        color: 'white'
                    }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Assessment sx={{ fontSize: 32 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Parametri Izračuna
                            </Typography>
                        </Stack>
                    </Box>
                    
                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={4}>
                            {/* Semester Selection */}
                            <Grid item xs={12}>
                                <Zoom in timeout={600}>
                                    <Card sx={{ 
                                        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
                                        border: '1px solid',
                                        borderColor: 'grey.200'
                                    }}>
                                        <CardContent sx={{ p: 3 }}>
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                                                    <EmojiEvents />
                                                </Avatar>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    Odaberi Semestar
                                                </Typography>
                                            </Stack>
                                            <Autocomplete
                                                slotProps={{
                                                    popper: {
                                                        sx: {
                                                            '& .MuiAutocomplete-option': { fontSize: 16, minHeight: 'unset' },
                                                        },
                                                    },
                                                }}
                                                value={selectedSemester}
                                                onChange={(e, newValue) => setSelectedSemester(newValue)}
                                                options={semesters}
                                                renderInput={(params) => <TextField {...params} label="Odaberi semestar" />}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        bgcolor: 'white'
                                                    }
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>

                            {/* Threshold Input */}
                            <Grid item xs={12}>
                                <Zoom in timeout={800}>
                                    <Card sx={{ 
                                        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
                                        border: '1px solid',
                                        borderColor: 'grey.200'
                                    }}>
                                        <CardContent sx={{ p: 3 }}>
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                                <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
                                                    <CalculateIcon />
                                                </Avatar>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    Prag Bodova
                                                </Typography>
                                            </Stack>
                                            <FormControl fullWidth>
                                                <InputLabel id="threshold-label">Odaberi prag</InputLabel>
                                                <Input 
                                                    id="threshold-input" 
                                                    variant="outlined" 
                                                    value={threshold} 
                                                    onChange={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        setThreshold(isNaN(val) ? 0 : val);
                                                    }}
                                                    sx={{
                                                        bgcolor: 'white',
                                                        p: 1,
                                                        borderRadius: 1,
                                                        fontSize: '1.1rem'
                                                    }}
                                                />
                                                <FormHelperText>Broj bodova potrebnih za prolaz</FormHelperText>
                                            </FormControl>
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>

                            {/* Calculate Button */}
                            <Grid item xs={12}>
                                <Zoom in timeout={1000}>
                                    <Card sx={{ 
                                        background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                                        color: 'white'
                                    }}>
                                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                onClick={handleCalculate}
                                                disabled={loading}
                                                startIcon={loading ? <Speed sx={{ animation: 'spin 1s linear infinite' }} /> : <CalculateIcon />}
                                                sx={{
                                                    py: 2,
                                                    px: 6,
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
                                                {loading ? 'Izračunavam...' : 'Izračunaj Prolaz'}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

                {/* Results Section */}
                {calculated && (
                    <Fade in timeout={500}>
                        <Paper
                            elevation={0}
                            sx={{
                                mt: 4,
                                p: 4,
                                background: 'linear-gradient(135deg, #E6FFFA 0%, #B2F5EA 100%)',
                                border: '1px solid',
                                borderColor: 'success.light',
                                borderRadius: 3
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                                <Avatar sx={{ bgcolor: 'success.main', width: 50, height: 50 }}>
                                    <CheckCircle sx={{ fontSize: 28 }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.dark' }}>
                                        Rezultati Izračuna
                                    </Typography>
                                    <Typography variant="body1" color="success.dark">
                                        Broj osoba koje su prošle: <strong>{members.length}</strong>
                                    </Typography>
                                </Box>
                            </Stack>

                            {members.length > 0 && (
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<DownloadIcon />}
                                    onClick={saveExcel}
                                    sx={{
                                        bgcolor: 'success.main',
                                        color: 'white',
                                        fontWeight: 600,
                                        py: 1.5,
                                        px: 4,
                                        '&:hover': {
                                            bgcolor: 'success.dark',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 25px rgba(56, 161, 105, 0.3)'
                                        }
                                    }}
                                >
                                    Preuzmi Excel Tablicu
                                </Button>
                            )}
                        </Paper>
                    </Fade>
                )}

                {/* Bottom Section */}
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
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        Precizna analiza uspjeha! 💪
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Svaki student zaslužuje fer ocjenu svojeg rada! 🔥
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

export default PassUsers;
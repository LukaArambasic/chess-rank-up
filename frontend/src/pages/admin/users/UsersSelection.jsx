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
    FormControl
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Assessment,
    Description,
    Save as SaveIcon,
    Speed,
    CheckCircle,
    LocalFireDepartment,
    Timeline,
    Info
} from '@mui/icons-material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import {useSection} from "../../../contexts/SectionProvider";
import api from "../../../api";

const UsersSelection = () => {
    const {sectionId} = useSection();
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`semesters`);
                const newSemesters = response.data.map(semester => ({
                    ...semester,
                    label: `Semestar ${semester.name}`
                }));
                setSemesters(newSemesters);
            } catch (error) {
                console.log("Error fetching data ", error);
            }
        }
        fetchData();
    }, []);

    const handleSemesterChange = (e, newValue) => {
        setSelectedSemester(newValue);
        setUploadError('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setUploadError('');
        }
    };

    const handleSubmit = async () => {
        if (!selectedSemester) {
            setUploadError('Molimo odaberite semestar.');
            return;
        }
        if (!selectedFile) {
            setUploadError('Molimo uploadajte CSV ili TXT file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('semesterId', selectedSemester.id);

        try {
            setLoading(true);
            setUploadError('');
            
            await api.post(
                `sections/${sectionId}/semesters/selection`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setSelectedFile(null);
                setFileName('');
                setSelectedSemester('');
            }, 3000);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadError('Došlo je do pogreške pri uploadu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <TitleContainer title="🎯 SELEKCIJA STUDENATA" description="Odaberi studente koji su prošli selekciju!" />
            
            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* Header Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        mb: 4,
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
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
                            <Assessment sx={{ fontSize: 40 }} />
                        </Avatar>
                        
                        <Typography variant="h3" component="h1" gutterBottom sx={{ 
                            fontWeight: 700,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            mb: 2
                        }}>
                            SELEKCIJA KONTROLA
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            Odaberi studente koji imaju priliku za prolaz! 🚀
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
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                        <Info sx={{ color: 'info.main', mt: 0.5 }} />
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.main', mb: 1 }}>
                                Upute za selekciju
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
                                • Ovdje birate studente koji imaju pravo pokušati položiti tjelesni preko sekcije za određeni semestar
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
                                • Odabirom studenti ne polažu predmet automatski, već dobivaju priliku
                            </Typography>
                            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                • Potrebno je priložiti .txt ili .csv datoteku s JMBAG-om studenata koji su prošli selekciju
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>

                {/* Success Message */}
                {success && (
                    <Fade in timeout={500}>
                        <Alert 
                            severity="success" 
                            sx={{ mb: 3, borderRadius: 2 }}
                            icon={<CheckCircle />}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                🎉 Selekcija uspješno obrađena!
                            </Typography>
                            <Typography variant="body2">
                                Studenti su dodani u selekciju za odabrani semestar.
                            </Typography>
                        </Alert>
                    </Fade>
                )}

                {/* Error Message */}
                {uploadError && (
                    <Fade in timeout={500}>
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {uploadError}
                        </Alert>
                    </Fade>
                )}

                {/* Main Form */}
                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ 
                        p: 3, 
                        background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
                        color: 'white'
                    }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Timeline sx={{ fontSize: 32 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                📊 PARAMETRI SELEKCIJE
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
                                                    <Assessment />
                                                </Avatar>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    Odaberi Semestar
                                                </Typography>
                                            </Stack>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    slotProps={{
                                                        popper: {
                                                            sx: {
                                                                '& .MuiAutocomplete-option': { fontSize: 16, minHeight: 'unset' },
                                                            },
                                                        },
                                                    }}
                                                    value={selectedSemester}
                                                    onChange={handleSemesterChange}
                                                    options={semesters}
                                                    renderInput={(params) => <TextField {...params} label="Odaberi semestar" />}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            bgcolor: 'white'
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>

                            {/* File Upload */}
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
                                                    <Description />
                                                </Avatar>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    Upload Datoteku
                                                </Typography>
                                            </Stack>
                                            <Button 
                                                variant="outlined" 
                                                component="label"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{
                                                    width: '100%',
                                                    py: 2,
                                                    borderStyle: 'dashed',
                                                    borderWidth: 2,
                                                    bgcolor: 'white',
                                                    '&:hover': {
                                                        bgcolor: 'grey.50',
                                                        borderColor: 'primary.main'
                                                    }
                                                }}
                                            >
                                                Odaberite CSV ili TXT datoteku
                                                <input type="file" hidden onChange={handleFileChange} accept=".csv,.txt" />
                                            </Button>
                                            {fileName && (
                                                <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                                                    <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 500 }}>
                                                        ✓ Datoteka učitana: "{fileName}"
                                                    </Typography>
                                                </Box>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Zoom in timeout={1000}>
                                    <Card sx={{ 
                                        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                                        color: 'white'
                                    }}>
                                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                onClick={handleSubmit}
                                                disabled={loading || success}
                                                startIcon={loading ? <Speed sx={{ animation: 'spin 1s linear infinite' }} /> : <SaveIcon />}
                                                sx={{
                                                    py: 2,
                                                    px: 6,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600,
                                                    bgcolor: 'white',
                                                    color: 'secondary.main',
                                                    '&:hover': {
                                                        bgcolor: 'grey.100',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                                                    },
                                                    '&:disabled': {
                                                        bgcolor: 'rgba(255,255,255,0.7)',
                                                        color: 'secondary.main'
                                                    }
                                                }}
                                            >
                                                {loading ? 'Obrađujem selekciju...' : success ? 'Uspješno obrađeno!' : 'Obradi Selekciju'}
                                            </Button>
                                            
                                            <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
                                                🎯 Precizno odaberi buduće prvake!
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

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
                        Svaki odabir oblikuje budućnost! 💪
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Pametno biraj - stvaraj legende! 🔥
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

export default UsersSelection;
import React from "react";
import {Box, TextField, Button, Typography, Paper, Container} from "@mui/material";
import TitleContainer from "../../components/titleContainer/TitleContainer";

const Reset = () => {
    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <TitleContainer title={"Resetiraj lozinku"} description={"Postavi svoju novu lozinku"} />

                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 4, 
                        mt: -2, 
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                    }}
                >
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Unesite novu lozinku"
                            type="password"
                            required
                        />
                        
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Potvrdite novu lozinku"
                            type="password"
                            required
                        />
                        
                        <Button 
                            type="submit" 
                            variant="contained" 
                            size="large"
                            sx={{ py: 1.5, mt: 2 }}
                            onClick={() => {}}
                        >
                            Resetiraj lozinku
                        </Button>
                    </Box>
                </Paper>
        </Container>
    );
}

export default Reset;
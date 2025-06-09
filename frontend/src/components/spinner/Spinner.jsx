// components/Spinner.tsx
import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const Spinner = () => (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"  // ili '100%' ako ga koristiš unutar elementa koji već ima visinu
    >
        <CircularProgress />
    </Box>
)

export default Spinner
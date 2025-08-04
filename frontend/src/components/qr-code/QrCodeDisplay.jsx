import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import {
  Close as CloseIcon,
  QrCode as QrCodeIcon
} from '@mui/icons-material';
import QRCode from 'qrcode';

const QrCodeDisplay = ({ open, onClose, jmbag, userName }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && jmbag) {
      generateQrCode();
    }
  }, [open, jmbag]);

  const generateQrCode = async () => {
    try {
      setLoading(true);
      const qrUrl = await QRCode.toDataURL(jmbag, { 
        width: 300, 
        margin: 2,
        color: {
          dark: '#2D3748',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F7FAFC 100%)',
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        m: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <QrCodeIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            QR Kod za identifikaciju
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Stack spacing={3} alignItems="center">
          {userName && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                JMBAG: {jmbag}
              </Typography>
            </Box>
          )}
          
          <Divider sx={{ width: '100%' }} />
          
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Generiranje QR koda...
              </Typography>
            </Box>
          ) : qrCodeUrl ? (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: 'white',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <img 
                src={qrCodeUrl} 
                alt="JMBAG QR Code" 
                style={{ 
                  width: '250px', 
                  height: '250px',
                  display: 'block'
                }} 
              />
            </Paper>
          ) : (
            <Typography variant="body2" color="error">
              Greška pri generiranju QR koda
            </Typography>
          )}
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ textAlign: 'center', maxWidth: '300px' }}
          >
            Skenirajte ovaj kod za brzu identifikaciju na događanjima sekcije
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeDisplay;
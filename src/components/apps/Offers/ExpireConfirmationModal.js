import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ExpireConfirmationModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper', 
        boxShadow: 24, 
        p: 4 
      }}>
        <Typography variant="h6" component="h2">
          Confirmation
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Are you sure you want to expire this offer?
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ mr: 2 }}>
            Yes
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ExpireConfirmationModal;

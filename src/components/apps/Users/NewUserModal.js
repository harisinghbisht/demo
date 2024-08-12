import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import CustomTextField from '../../forms/theme-elements/CustomTextField';


const brandsList = ['Tango Energy', 'Aurora Energy', 'AGL', 'Origin Energy', 'Ergon Energy'];

const NewUserModal = ({ open, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    userType: 'Admin',
    sellingBrands: [],
    avatar: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleUserTypeChange = (e) => {
    setFormData({ ...formData, userType: e.target.value, sellingBrands: [] });
  };

  const handleBrandsChange = (event, value) => {
    setFormData({ ...formData, sellingBrands: value });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <Typography>Email</Typography>
          <CustomTextField
            required
            margin="dense"
            type="email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
          />
          <Typography>First Name</Typography>
          <CustomTextField
            required
            margin="dense"
            type="text"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
          />
          <Typography>Last Name</Typography>
          <CustomTextField
            required
            margin="dense"
            type="text"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
          />
          <Typography>Mobile</Typography>
          <CustomTextField
            margin="dense"
            type="text"
            fullWidth
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
          />
          <RadioGroup
            row
            name="userType"
            value={formData.userType}
            onChange={handleUserTypeChange}
            sx={{ marginBottom: '16px' }}
          >
            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="Agent" control={<Radio />} label="Agent" />
          </RadioGroup>
          {formData.userType === 'Agent' && (
            <Autocomplete
              multiple
              options={brandsList}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData.sellingBrands}
              onChange={handleBrandsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Select Brands"
                  margin="dense"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      padding: 0, 
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid #ccc', 
                    },
                    '& .MuiInputBase-input': {
                      border: 'none', 
                      padding: '8px 14px', 
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid #3f51b5', 
                    },
                  }}
                />
              )}
              sx={{ marginBottom: '16px' }}
            />
          )}
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload Avatar
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </Button>
          {formData.avatar && (
            <Avatar
              src={URL.createObjectURL(formData.avatar)}
              sx={{ width: 56, height: 56, mt: 2 }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewUserModal;

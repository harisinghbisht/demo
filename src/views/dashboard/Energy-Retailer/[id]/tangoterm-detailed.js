import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Backdrop,
  Fade,
  IconButton,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import BlankCard from '../../../../components/shared/BlankCard';
import EnhancedCard from '../../../brands/compare-your-bill/EnhancedCard';
import ParentCard from '../../../../components/shared/ParentCard';

const states = ["VIC", "NSW", "SA", "QLD"];
const fuels = ["Gas", "Electricity", "Dual Fuel"];
const brands = ["Brand A", "Brand B", "Brand C"]; // Placeholder brands
const logicOptions = ["If Residential", "If Small Business", "If Solar"];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const closeButtonStyle = {
  position: 'absolute',
  top: 8,
  right: 8,
};

const TangoTermsDetail = () => {
  const { scriptId } = useParams(); // Get script ID from the URL
  const [buttonLabel, setButtonLabel] = useState('Tango Terms');
  const [selectedStates, setSelectedStates] = useState(["VIC"]);
  const [selectedFuels, setSelectedFuels] = useState(["Gas"]);
  const [scriptCopy, setScriptCopy] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedLogic, setSelectedLogic] = useState('');
  const [versions, setVersions] = useState([
    { version: "v3_TAN_V_G_2024-05-05_11-04-20", validFrom: "5th May 2024, 12:04 PM", validTo: "Current", updatedBy: "Sam Jones" },
    { version: "v2_TAN_V_G_2024-05-05_11-04-20", validFrom: "1st Feb 2024, 12:04 PM", validTo: "1st March 2024, 12:04 PM", updatedBy: "Sam Jones" },
    { version: "v1_TAN_V_G_2024-05-05_11-04-20", validFrom: "1st Jan 2024, 12:04 PM", validTo: "1st Feb 2024, 12:04 PM", updatedBy: "Sam Jones" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVersion, setEditingVersion] = useState(null);

  const handleVersionClick = (version) => {
    if (version.validTo === "Current") {
      setEditingVersion(version);
      setButtonLabel(version.version);
      setSelectedStates(["VIC"]); 
      setSelectedFuels(["Gas"]);  
      setScriptCopy('');          
      setSelectedBrand('');    
      setSelectedLogic(''); 
      setIsModalOpen(true);
    }
  };

  const handleSave = () => {
    const currentDate = new Date();
  
    const day = currentDate.getDate();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    const formattedDate = `${day}${daySuffix(day)} ${currentDate.toLocaleString('en-US', { month: 'long' })} ${currentDate.getFullYear()}`;
  
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  
    const formattedCurrentDate = `${formattedDate}, ${formattedTime}`;
  
    const versionDate = currentDate.toISOString().replace(/[-T:]/g, '-').split('.')[0];
  
    const updatedVersions = versions.map((version, index) => {
      if (index === 0) {
        return { ...version, validTo: formattedCurrentDate };
      }
      return version;
    });
  
    const newVersionId = `v${updatedVersions.length + 1}_TAN_V_${selectedStates.join('_')}_${versionDate}`;
  
    const newVersion = {
      version: newVersionId,
      validFrom: formattedCurrentDate,
      validTo: "Current",
      updatedBy: "Current User", 
    };
  
    setVersions([newVersion, ...updatedVersions]);
    setIsModalOpen(false);
    setEditingVersion(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVersion(null);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <ParentCard title={`Edit ${scriptId}`}>
        <Box sx={{ mt: 3 }}>
          <EnhancedCard title="Versions" >
            <BlankCard>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Version</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Valid From</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Valid To</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Updated by</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {versions.map((version, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleVersionClick(version)}
                      sx={{
                        cursor: version.validTo === "Current" ? 'pointer' : 'default',
                        backgroundColor: version.validTo === "Current" ? '#f0f0f0' : 'transparent',
                      }}
                    >
                      <TableCell>{version.version}</TableCell>
                      <TableCell>{version.validFrom}</TableCell>
                      <TableCell>{version.validTo}</TableCell>
                      <TableCell>{version.updatedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </BlankCard>
          </EnhancedCard>
        </Box>

        {/* Modal for editing the current version */}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isModalOpen}>
            <Box sx={modalStyle}>
              {/* Close Button */}
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={closeButtonStyle}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Edit {editingVersion?.version}
              </Typography>
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Button Label"
                  value={buttonLabel}
                  onChange={(e) => setButtonLabel(e.target.value)}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>States</InputLabel>
                  <Select
                    multiple
                    value={selectedStates}
                    onChange={(e) => setSelectedStates(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {states.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Fuel</InputLabel>
                  <Select
                    multiple
                    value={selectedFuels}
                    onChange={(e) => setSelectedFuels(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {fuels.map((fuel) => (
                      <MenuItem key={fuel} value={fuel}>
                        {fuel}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Brand Placeholder</InputLabel>
                  <Select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    {brands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Logic</InputLabel>
                  <Select
                    value={selectedLogic}
                    onChange={(e) => setSelectedLogic(e.target.value)}
                  >
                    {logicOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <ReactQuill
                  theme="snow"
                  value={scriptCopy}
                  onChange={setScriptCopy}
                  style={{ height: '150px', marginBottom: '40px' }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 ,mt:3 }}>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </ParentCard>
    </Box>
  );
};

export default TangoTermsDetail;

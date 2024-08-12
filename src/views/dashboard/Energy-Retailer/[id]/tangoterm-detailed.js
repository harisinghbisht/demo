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
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

const states = ["VIC", "NSW", "SA", "QLD"];
const fuels = ["Gas", "Electricity", "Dual Fuel"];
const brands = ["Brand A", "Brand B", "Brand C"]; // Placeholder brands
const logicOptions = ["If Residential", "If Small Business", "If Solar"];

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

  const handleSave = () => {
    // Logic to save changes and generate a new version ID
    const newVersionId = `v${versions.length + 1}_TAN_V_${selectedStates.join(',')}_${new Date().toISOString()}`;
    
    // Create a new version entry
    const newVersion = {
      version: newVersionId,
      validFrom: new Date().toLocaleString(),
      validTo: "Current",
      updatedBy: "Current User" // Replace with actual user information
    };

    // Add the new version to the versions array
    setVersions([newVersion, ...versions]); // Add new version at the top
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Edit {scriptId}</Typography>
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

        {/* Dropdown for Brand Placeholder */}
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

        {/* Dropdown for Logic Options */}
        <FormControl fullWidth>
          <InputLabel>Logic Options</InputLabel>
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

        {/* WYSIWYG Editor for Script Copy */}
        <Typography variant="h6">Script Copy</Typography>
        <ReactQuill
          value={scriptCopy}
          onChange={setScriptCopy}
          theme="snow"
          modules={{
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['link', 'image'],
              ['clean']
            ],
          }}
        />

        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>Save Changes</Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Versions</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Version</TableCell>
              <TableCell>Valid From</TableCell>
              <TableCell>Valid To</TableCell>
              <TableCell>Updated by</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {versions.map((version, index) => (
              <TableRow key={index}>
                <TableCell>{version.version}</TableCell>
                <TableCell>{version.validFrom}</TableCell>
                <TableCell>{version.validTo}</TableCell>
                <TableCell>{version.updatedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default TangoTermsDetail;

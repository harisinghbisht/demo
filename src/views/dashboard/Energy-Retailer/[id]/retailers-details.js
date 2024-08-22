import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  InputAdornment,
  Toolbar,
  Modal,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert
} from '@mui/material';
import { IconSearch } from '@tabler/icons';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import EnhancedCard from '../../../brands/compare-your-bill/EnhancedCard';
import { Link } from 'react-router-dom';

// Define the states and fuels to check
const STATES = ['VIC', 'NSW', 'SA', 'QLD', 'ACT'];
const FUELS = ['Electricity', 'Gas', 'Dual Fuel'];

const EnhancedTableToolbar = ({ handleSearch, search }) => (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
    }}
  >
    <Box>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch size="1.1rem" />
            </InputAdornment>
          ),
        }}
        placeholder="Search Previous version ID"
        size="small"
        onChange={handleSearch}
        value={search}
      />
    </Box>
  </Toolbar>
);

const initialCurrentVersions = [
  { script: "Tango Terms", state: "VIC", fuel: "Gas", effective: "5th May 2024, 12:04 PM", updatedBy: "Sam Jones" },
  { script: "Tango Terms", state: "VIC", fuel: "Electricity", effective: "5th May 2024, 12:04 PM", updatedBy: "Sam Jones" },
  { script: "Tango Terms", state: "VIC", fuel: "Dual Fuel", effective: "5th May 2024, 12:04 PM", updatedBy: "Sam Jones" },
  { script: "Tango Terms", state: "NSW", fuel: "Electricity", effective: "5th May 2024, 12:04 PM", updatedBy: "Sam Jones" },
];

const initialPastVersionsData = [
  { version: "v3_TAN_V_G_2024-05-05_11-04-20", state: "VIC", fuel: "Gas", validFrom: "5th May 2024, 12:04 PM", validTo: "6th May 2024, 12:04 PM", updatedBy: "Sam Jones" },
  { version: "v2_TAN_V_G_2024-05-05_11-04-20", state: "VIC", fuel: "Electricity", validFrom: "1st Feb 2024, 12:04 PM", validTo: "1st March 2024, 12:04 PM", updatedBy: "Sam Jones" },
  { version: "v1_TAN_V_G_2024-05-05_11-04-20", state: "VIC", fuel: "Dual Fuel", validFrom: "1st Jan 2024, 12:04 PM", validTo: "1st Feb 2024, 12:04 PM", updatedBy: "Sam Jones" },
];

const RetailerDetails = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [versionToExpire, setVersionToExpire] = useState(null);
  const [completenessCheck, setCompletenessCheck] = useState({});
  const [currentVersions, setCurrentVersions] = useState(initialCurrentVersions);
  const [pastVersionsData, setPastVersionsData] = useState(initialPastVersionsData);

  useEffect(() => {
    checkCompleteness();
  }, [currentVersions]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRowClick = (version) => {
    setSelectedVersion(version);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleNewScript = () => {
    // Add your logic for creating a new script here
    console.log("New Script button clicked");
  };

  const handleExpire = (version) => {
    setVersionToExpire(version);
    setConfirmationOpen(true);
  };

  const handleConfirmExpire = () => {
    setConfirmationOpen(false);
    setCurrentVersions((prevVersions) =>
      prevVersions.filter(v => v.script !== versionToExpire.script)
    );
    setPastVersionsData((prevVersions) => [
      ...prevVersions,
      {
        version: `${versionToExpire.script}_EXPIRED`,
        state: versionToExpire.state,
        fuel: versionToExpire.fuel,
        validFrom: versionToExpire.effective,
        validTo: "N/A",
        updatedBy: versionToExpire.updatedBy
      }
    ]);
    setVersionToExpire(null);
  };

  const handleCancelExpire = () => {
    setConfirmationOpen(false);
    setVersionToExpire(null);
  };

  const checkCompleteness = () => {
    const missingScripts = {};

    STATES.forEach((state) => {
      FUELS.forEach((fuel) => {
        const exists = currentVersions.some(
          (version) => version.state.includes(state) && version.fuel === fuel
        );

        if (!exists) {
          if (!missingScripts[state]) {
            missingScripts[state] = [];
          }
          missingScripts[state].push(fuel);
        }
      });
    });

    setCompletenessCheck(missingScripts);
  };

  const validateScriptLabel = (newScript) => {
    return currentVersions.some(
      (version) =>
        version.script === newScript.script &&
        version.state === newScript.state &&
        version.fuel === newScript.fuel
    );
  };

  const handleSaveNewScript = (newScript) => {
    if (validateScriptLabel(newScript)) {
      alert(`'${newScript.script}' already exists for ${newScript.state} - ${newScript.fuel}`);
    } else {
      // Proceed with saving the new script
      console.log("New script saved:", newScript);
    }
  };

  const filteredPastVersions = pastVersionsData.filter(version =>
    version.version.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <PageContainer title="Tango Energy" description="This is Energy Retailers" />
      <Breadcrumb title="Energy Retailers" subtitle="This page allows you to manage selling brands, terms and conditions, and agent scripting." />

      <Box sx={{ mt: 4 }}>
        {Object.keys(completenessCheck).length > 0 && (
          <Alert
            severity="warning"
            sx={{ mb: 2, backgroundColor: '#FFA500', color: '#000' }}
          >
            <Typography variant="body2">
              The following scripts are not configured:
              <ul>
                {Object.entries(completenessCheck).map(([state, fuels]) => (
                  <li key={state}>
                    {state} - {fuels.join(', ')}
                  </li>
                ))}
              </ul>
            </Typography>
          </Alert>
        )}

        <EnhancedTableToolbar search={searchTerm} handleSearch={handleSearch} />

        <EnhancedCard title="Agent Scripting">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Current Version" />
              <Tab label="Past Versions" />
            </Tabs>
            <Button variant="contained" color="primary" onClick={handleNewScript}>
              New Script
            </Button>
          </Box>

          {tabValue === 0 && (
            <Box sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Script</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">State</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Fuel</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Effective</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Updated by</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentVersions.map((version, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Link to={`/tango-terms/${version.script}`}>{version.script}</Link>
                      </TableCell>
                      <TableCell>{version.state}</TableCell>
                      <TableCell>{version.fuel}</TableCell>
                      <TableCell>{version.effective}</TableCell>
                      <TableCell>{version.updatedBy}</TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => handleExpire(version)}
                        >
                          Expire
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}

          {tabValue === 1 && (
            <Box sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Version</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">State</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Fuel</Typography>
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
                  {filteredPastVersions.map((version, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography
                          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                          onClick={() => handleRowClick(version)}
                        >
                          {version.version}
                        </Typography>
                      </TableCell>
                      <TableCell>{version.state}</TableCell>
                      <TableCell>{version.fuel}</TableCell>
                      <TableCell>{version.validFrom}</TableCell>
                      <TableCell>{version.validTo}</TableCell>
                      <TableCell>{version.updatedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </EnhancedCard>

        <Modal open={modalOpen} onClose={handleClose}>
          <Paper sx={{ padding: 4, margin: 'auto', maxWidth: 600 }}>
            {selectedVersion && (
              <>
                <Typography variant="h5" gutterBottom>
                  {selectedVersion.version}
                </Typography>
                <Typography variant="body1">
                  State: {selectedVersion.state}
                </Typography>
                <Typography variant="body1">
                  Fuel: {selectedVersion.fuel}
                </Typography>
                <Typography variant="body1">
                  Valid From: {selectedVersion.validFrom}
                </Typography>
                <Typography variant="body1">
                  Valid To: {selectedVersion.validTo}
                </Typography>
                <Typography variant="body1">
                  Updated By: {selectedVersion.updatedBy}
                </Typography>
              </>
            )}
          </Paper>
        </Modal>

        <Dialog open={confirmationOpen} onClose={handleCancelExpire}>
          <DialogTitle>Expire Script</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to mark this script as expired?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelExpire} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmExpire} color="error">
              Expire
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default RetailerDetails;

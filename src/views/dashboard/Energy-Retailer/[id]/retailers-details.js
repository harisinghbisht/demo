import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PageContainer from '../../../../components/container/PageContainer';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import EnhancedCard from '../../../brands/compare-your-bill/EnhancedCard';
import BlankCard from '../../../../components/shared/BlankCard';

const currentVersions = [
  { script: "Tango Terms", state: "VIC", fuel: "Gas", effective: "5th May 2024, 12:04 PM", updatedBy: "Sam Jones" },
  { script: "Tango Terms", state: "VIC", fuel: "Electricity", effective: "5th May 2024, 12:04 PM", updatedBy: "Sam Jones" },
  { script: "Tango Terms", state: "VIC", fuel: "Dual Fuel", effective: "5th May 2024, 12:04 PM", updatedBy: "Sam Jones" },
  { script: "Tango Terms", state: "NSW, SA, QLD", fuel: "All", effective: "5th May 2024, 12:04 PM", updatedBy: "Sam Jones" },
];

const pastVersionsData = [
  { version: "v3_TAN_V_G_2024-05-05_11-04-20", state: "VIC", fuel: "Gas", validFrom: "5th May 2024, 12:04 PM", validTo: "6th May 2024, 12:04 PM", updatedBy: "Sam Jones" },
  { version: "v2_TAN_V_G_2024-05-05_11-04-20", state: "VIC", fuel: "Electricity", validFrom: "1st Feb 2024, 12:04 PM", validTo: "1st March 2024, 12:04 PM", updatedBy: "Sam Jones" },
  { version: "v1_TAN_V_G_2024-05-05_11-04-20", state: "VIC", fuel: "Dual Fuel", validFrom: "1st Jan 2024, 12:04 PM", validTo: "1st Feb 2024, 12:04 PM", updatedBy: "Sam Jones" },
];

const RetailerDetails = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredPastVersions = pastVersionsData.filter(version =>
    version.version.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <PageContainer title="Tango Energy" description="this is Energy Retailers" />
      <Breadcrumb title="Energy Retailers" subtitle="This page allows you to manage selling brands, terms and conditions, and agent scripting." />

      <Box sx={{ mt: 4 }}>
        <EnhancedCard title="Agent Scripting">
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Current Version" />
            <Tab label="Past Versions" />
          </Tabs>

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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}

          {tabValue === 1 && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Search Version ID"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
              />
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
                      <TableCell>{version.version}</TableCell>
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
      </Box>
    </Box>
  );
};

export default RetailerDetails;

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, IconButton, Checkbox, Popover, Typography,
  Stack,
  Avatar,
  Box,
  Chip,
  Toolbar,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { mockData } from "./Energydata.js";
import PageContainer from '../../../components/container/PageContainer.js';
import BlankCard from '../../../components/shared/BlankCard.js';
import { Link } from 'react-router-dom';
import { IconSearch } from '@tabler/icons';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb.js';

const EnhancedTableToolbar = (props) => {
  const { numSelected, handleSearch, search } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Box sx={{ flex: '1 1 100%' }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size="1.1rem" />
              </InputAdornment>
            ),
          }}
          placeholder="Search Retailers"
          size="small"
          onChange={handleSearch}
          value={search}
        />
      </Box>
    </Toolbar>
  );
};

const EnergyRetailer = () => {
  const [retailers, setRetailers] = useState(mockData);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = useState(mockData);

  useEffect(() => {
    fetchRetailers();
  }, []);

  const fetchRetailers = async () => {
    try {
      setIsLoading(true);
      // Simulate an API call
      setTimeout(() => {
        setRetailers(mockData);
        setRows(mockData); // Ensure rows are updated with the initial data
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching retailers:', error);
    }
  };

  const handlePopoverOpen = (event, retailer) => {
    setAnchorEl(event.currentTarget);
    setSelectedRetailer(retailer);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRetailer(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const handleSearch = (event) => {
    const filteredRows = mockData.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setSearch(event.target.value);
    setRows(filteredRows);
  };

  return (
    <PageContainer title="Energy Retailers" description="this is Energy Retailers">
      <Breadcrumb title="Energy Retailers" subtitle="This page allows you to manage which brands can sell for Energy Retailers" />

      <EnhancedTableToolbar
        search={search}
        handleSearch={handleSearch}
      />
      <BlankCard>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Energy Retailer</Typography>
                </TableCell>
                <TableCell><Typography variant="h6">Sales - 30 Days</Typography></TableCell>
                <TableCell> <Typography variant="h6">Sellable Brands</Typography></TableCell>
                <TableCell> <Typography variant="h6">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((retailer) => (
                <TableRow key={retailer.id}>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Avatar src="/images/deal4.jpeg" alt={retailer.name} sx={{ width: 40, height: 40 }} />
                      <Box style={{ marginTop: "10px" }}>
                        <Link style={{ color: "black", fontSize: "medium" }} to={`/energy-retailers/${retailer.id}`}>
                          {retailer.name}
                        </Link>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{retailer.sales30Days}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {retailer.brands.map((team, i) => (
                        <Chip
                          label={team.name}
                          sx={{ backgroundColor: team.bgcolor, color: 'white', fontSize: '13px' }}
                          key={i}
                          size="small"
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handlePopoverOpen(event, retailer)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: "center", marginTop: '10px' }}>
              <CircularProgress size={30} />
            </div>
          )}
        </TableContainer>
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>
            {selectedRetailer && (
              <div>
                <h3>{selectedRetailer.name}</h3>
                {Object.keys(brandColors).map((brandName) => (
                  <div key={brandName}>
                    <Checkbox
                      checked={selectedRetailer.brands.some(brand => brand.name === brandName)}
                    /> {brandName}
                  </div>
                ))}
              </div>
            )}
          </Typography>
        </Popover>
      </BlankCard>
    </PageContainer>
  );
};

export default EnergyRetailer;

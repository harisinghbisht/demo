import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Typography, Box, Toolbar, TextField, InputAdornment,
  TableFooter, TablePagination, IconButton
} from '@mui/material';
import { postcodeDatas } from "./PostCodeData.js";
import PageContainer from '../../../components/container/PageContainer.js';
import BlankCard from '../../../components/shared/BlankCard.js';
import { IconSearch } from '@tabler/icons';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb.js';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import sellableLocationimage from '../../../assets/images/sellablelocation.png';



function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

const EnhancedTableToolbar = ({ search, handleSearch }) => {
  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Box sx={{ flex: '1 1 100%' }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size="1.1rem" />
              </InputAdornment>
            ),
          }}
          placeholder="Search Locations"
          size="small"
          onChange={handleSearch}
          value={search}
          sx={{ marginRight: 2 }}
        />
      </Box>
    </Toolbar>
  );
};

const SellableLocation = () => {
  const [postcodeData, setPostCodeData] = useState(postcodeDatas);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchPostcodes();
  }, []);

  const fetchPostcodes = async () => {
    try {
      setIsLoading(true);
      // Simulate an API call
      setTimeout(() => {
        const initialFilteredData = postcodeDatas.filter(row => row.postcode.toString().startsWith('3'));
        setPostCodeData(initialFilteredData);
        setRows(initialFilteredData);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching postcodes:', error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    applyFilters(searchTerm);
  };

  const applyFilters = (searchTerm) => {
    let filteredRows = postcodeData;

    if (searchTerm) {
      filteredRows = filteredRows.filter(row =>
        row.postcode.toString().includes(searchTerm) ||
        row.suburb.toLowerCase().includes(searchTerm)
      );
    }

    setRows(filteredRows);
  };

  return (
    <PageContainer title="Sellable Locations" description="This is the Sellable Locations page">
      <Breadcrumb title="Sellable Locations" subtitle="This page allows you to view, create, and update sellable suburb/postcode locations." breadcrumCustomImg={sellableLocationimage} />

      <EnhancedTableToolbar
        search={search}
        handleSearch={handleSearch}
      />
      <BlankCard>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Postcode</Typography></TableCell>
                <TableCell><Typography variant="h6">Suburb</Typography></TableCell>
                <TableCell><Typography variant="h6">State</Typography></TableCell>
                <TableCell><Typography variant="h6">Climate Zone</Typography></TableCell>
                <TableCell><Typography variant="h6">Electricity Distributor</Typography></TableCell>
                <TableCell><Typography variant="h6">Gas Distributor</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.postcode}</TableCell>
                  <TableCell>{item.suburb}</TableCell>
                  <TableCell>{item.State}</TableCell>
                  <TableCell>{item.CZ}</TableCell>
                  <TableCell>{item["Electricity Distributor"]}</TableCell>
                  <TableCell>{item["Gas Distributor"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[20, 35, 50]}
                  colSpan={6}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        {isLoading && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <CircularProgress />
          </Box>
        )}
      </BlankCard>
    </PageContainer>
  );
};

export default SellableLocation;

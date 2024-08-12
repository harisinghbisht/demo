import * as React from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material'
import { IconAlertTriangle, IconTag, IconEraser } from '@tabler/icons'
import CustomCheckbox from '../../components/forms/theme-elements/CustomCheckbox'
import PageContainer from '../../components/container/PageContainer'
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { offersData } from './OfferData'
import OffersEnhancedTableToolbar from '../../components/apps/Offers/EnhancedTableToolbar'
import OffersEnhancedTableHead from '../../components/apps/Offers/EnhancedTableHead'
import OfferCollapsibleTableRow from '../../components/apps/Offers/OfferCollapsibleTableRow'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import sellableLocationimage from '../../assets/images/sellablelocation.png';
import { height, width } from '@mui/system'
function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const checkForMissingData = offer => {
  const requiredFields = [
    { key: 'productCode', message: 'Product Code is Missing' },
    { key: 'state', message: 'State is Missing' },
    { key: 'retailer', message: 'Retailer is Missing' },
    { key: 'additionalDetails', message: 'VEFS Missing', isArray: true },
  ]

  const missingDetails = []

  requiredFields.forEach(field => {
    if (!offer?.[field.key]) {
      missingDetails.push(field.message)
    }
  })
  if (offer?.additionalDetails) {
    const hasIncompleteDetails = offer.additionalDetails.some(
      detail => !detail.label || !detail.value,
    )

    if (hasIncompleteDetails) {
      missingDetails.push('VEFS field is Missing')
    }
  } else {
    missingDetails.push('VEFS is Missing')
  }

  return missingDetails
}

const Offers = () => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('planId')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [openRows, setOpenRows] = React.useState('')
  const [tab, setTab] = React.useState('Sellable')
  const [selectedOption, setSelectedOption] = React.useState('')
  const [modalOpen, setModalOpen] = React.useState(false)
  const [searchPlanId, setSearchPlanId] = React.useState('')
  const [searchOffer, setSearchOffer] = React.useState('')
  const [selectedRetailer, setSelectedRetailer] = React.useState('')
  const [selectedState, setSelectedState] = React.useState('')
  const [selectedMarket, setSelectedMarket] = React.useState('')
  const [selectedFuel, setSelectedFuel] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState(null)
  const [searchCode, setSearchCode] = React.useState('')

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const BCrumb = [
    {
      title: ' This page allows you to manage sellable offers across retailers',
    },
  ]

  const handleClick = (event, planId) => {
    const selectedIndex = selected.indexOf(planId)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, planId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  const handleSearchPlanIdChange = event => {
    setSearchPlanId(event.target.value)
  }

  const handleSearchOfferChange = event => {
    setSearchOffer(event.target.value)
  }

  const handleRetailerChange = event => {
    setSelectedRetailer(event.target.value)
  }

  const handleStateChange = event => {
    setSelectedState(event.target.value)
  }

  const handleMarketChange = event => {
    setSelectedMarket(event.target.value)
  }

  const handleFuelChange = event => {
    setSelectedFuel(event.target.value)
  }

  const handleDateChange = date => {
    setSelectedDate(date)
  }

  const handleSearchCode = event => {
    setSearchCode(event.target.value)
  }

  const filteredData = offersData.filter(offer => {
    const effectiveDate = new Date(offer.effective)
    const isDateMatch = selectedDate
      ? effectiveDate.toDateString() === selectedDate.toDateString()
      : true

    return (
      offer.status === tab &&
      (selectedOption === '' || offer.retailer === selectedOption) &&
      (searchPlanId === '' || offer.planId.toLowerCase().includes(searchPlanId.toLowerCase())) &&
      (searchOffer === '' || offer.offerName.toLowerCase().includes(searchOffer.toLowerCase())) &&
      (selectedState === '' || offer.state === selectedState) &&
      (selectedRetailer === '' || offer.retailer === selectedRetailer) &&
      (selectedMarket === '' || offer.market === selectedMarket) &&
      (selectedFuel === '' || offer.fuel === selectedFuel) &&
      (searchCode === '' ||
        offer.productCode.toLowerCase().includes(searchCode.toLowerCase()) ||
        offer.offerCode.toLowerCase().includes(searchCode.toLowerCase())) &&
      isDateMatch
    )
  })

  const handleResetFilters = () => {
    setSearchPlanId('')
    setSearchOffer('')
    setSelectedRetailer('')
    setSelectedState('')
    setSelectedMarket('')
    setSelectedFuel('')
    setSelectedDate(null)
    setSearchCode('')
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = filteredData.map(n => n.planId)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleCollapseClick = planId => {
    setOpenRows(openRows === planId ? '' : planId)
  }
  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - offersData.length) : 0

  const formatDate = dateString => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const uniqueSellableRetailers = Array.from(
    new Set(offersData.filter(offer => offer.status === 'Sellable').map(offer => offer.retailer)),
  )

  const totalSellableOffers = offersData.filter(offer => offer.status === 'Sellable').length
  return (
    <PageContainer title='Offers' description='this is Offers page'>
      <Breadcrumb title='Offers' items={BCrumb}  breadcrumCustomImg={sellableLocationimage}/>

      <OffersEnhancedTableToolbar
        numSelected={selected.length}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <Paper variant='outlined'>
        <Box sx={{ px: 2, py: 2 }}>
          <Tabs value={tab} onChange={handleTabChange} indicatorColor='primary' textColor='primary'>
            <Tab
              value='Sellable'
              label={
                <Box display='flex' alignItems='center'>
                  <IconTag />
                  <Box ml={1}>
                    Sellable
                    <span
                      style={{
                        marginLeft: '5px',
                        color: 'green',
                        background: '#cdf0cd',
                        padding: '5px 10px',
                        borderRadius: '50%',
                        boxSizing: 'border-box',
                        fontWeight: '500',
                      }}
                    >
                      {totalSellableOffers}
                    </span>
                  </Box>
                </Box>
              }
            />
            <Tab
              value='Expired'
              label={
                <Box display='flex' alignItems='center'>
                  <IconEraser />
                  <Box ml={1}>Expired</Box>
                </Box>
              }
            />
          </Tabs>
        </Box>
        <Box mb={2} sx={{ mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='medium'>
              <OffersEnhancedTableHead
                order={order}
                orderBy={orderBy}
                handleResetFilters={handleResetFilters}
                onRequestSort={handleRequestSort}
                tab={tab}
              />
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <TextField
                      placeholder='Search'
                      value={searchPlanId}
                      onChange={handleSearchPlanIdChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder='Search'
                      value={searchOffer}
                      onChange={handleSearchOfferChange}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      displayEmpty
                      value={selectedRetailer}
                      onChange={handleRetailerChange}
                      fullWidth
                    >
                      <MenuItem value=''>
                        All
                      </MenuItem>
                      {uniqueSellableRetailers.map((el, index) => (
                        <MenuItem key={index} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell>
                    <FormControl fullWidth>
                      <Select value={selectedState} onChange={handleStateChange} displayEmpty>
                        <MenuItem value=''>
                          All 
                        </MenuItem>
                        <MenuItem value='ACT'>ACT</MenuItem>
                        <MenuItem value='NSW'>NSW</MenuItem>
                        <MenuItem value='OLD'>OLD</MenuItem>
                        <MenuItem value='SA'>SA</MenuItem>
                        <MenuItem value='TAS'>TAS</MenuItem>
                        <MenuItem value='VIC'>VIC</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell>
                    <FormControl fullWidth>
                      <Select value={selectedMarket} onChange={handleMarketChange} displayEmpty>
                        <MenuItem value=''>All 
                        </MenuItem>
                        <MenuItem value='Small Business'>Small Business</MenuItem>
                        <MenuItem value='Residential'>Residential</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <Select value={selectedFuel} onChange={handleFuelChange} displayEmpty>
                        <MenuItem value=''>All
                        </MenuItem>
                        <MenuItem value='Electricity'>Electricity</MenuItem>
                        <MenuItem value='Gas'>Gas</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={selectedDate}
                        label="Select" 
                        onChange={handleDateChange}
                        renderInput={params => <TextField  {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder='Search'
                      value={searchCode}
                      onChange={handleSearchCode}
                    />
                  </TableCell>
                  <TableCell colSpan={2} sx={{ textAlign: 'center' }}>
                    <Button
                      variant='contained'
                      color='primary'
                      sx={{ width: '100%' }}
                      onClick={handleResetFilters}
                    >
                      Reset
                    </Button>
                  </TableCell>
                  <TableCell padding='checkbox'>
                    <CustomCheckbox
                      color='primary'
                      checked={filteredData.length > 0 && selected.length === filteredData.length}
                      onChange={handleSelectAllClick}
                      inputprops={{
                        'aria-label': 'select all desserts',
                      }}
                    />
                  </TableCell>
                </TableRow>

                {stableSort(filteredData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                  .map((row, index) => {
                    const isItemSelected = isSelected(row.planId)
                    const labelId = `enhanced-table-checkbox-${index}`
                    const isOpen = openRows === row.planId
                    const missingDetails = checkForMissingData(row)
                    return (
                      <React.Fragment key={index}>
                        <TableRow
                          hover
                          // onClick={event => handleClick(event, row.planId)}
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                        >
                          <TableCell sx={{ padding: '0' }}>
                            {row.state === 'VIC' && (
                              <IconButton
                                aria-label='expand row'
                                size='small'
                                onClick={() => handleCollapseClick(row.planId)}
                              >
                                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography
                              color={row.state === 'VIC' ? '#5c88fc' : 'textSecondary'}
                              
                              fontWeight='400'
                              sx={{ display: 'flex', alignItems: 'center' }}
                            >
                              {row.planId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color='textSecondary'  fontWeight='400'>
                              {row.offerName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color='textSecondary'  fontWeight='400'>
                              {row.retailer}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color='textSecondary'  fontWeight='400'>
                              {row.state}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color='textSecondary'  fontWeight='400'>
                              {row.market}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color='textSecondary'  fontWeight='400'>
                              {row.fuel}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color='textSecondary'  fontWeight='400'>
                              {formatDate(row.effective)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color='textSecondary'  fontWeight='400'>
                              {row?.productCode}
                              <p>{row.offerCode}</p>
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color='#5c88fc'  fontWeight='400'>
                              {row.sales}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {missingDetails.length > 0 && (
                              <Tooltip
                                title={
                                  <div style={{ whiteSpace: 'pre-line' }}>
                                    {missingDetails.join('\n')}
                                  </div>
                                }
                              >
                                <IconButton
                                  style={{
                                    backgroundColor: '#ffeecf',
                                    color: 'orange',padding:'6px'
                                  }}
                                >
                                  <IconAlertTriangle style={{ height: '22px', width: '22px' }}/>
                                </IconButton>
                              </Tooltip>
                            )}
                          </TableCell>
                          {tab === 'Sellable' ? (
                            <TableCell padding='checkbox'>
                              <CustomCheckbox
                                color='primary'
                                onClick={event => handleClick(event, row.planId)}
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                          ) : null}
                        </TableRow>
                        <OfferCollapsibleTableRow row={row} isOpen={isOpen} />
                      </React.Fragment>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={10} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </PageContainer>
  )
}

export default Offers

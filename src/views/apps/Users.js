import React, { useState } from 'react'
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  TableHead,
  Chip,
  Box,
  AvatarGroup,
  Card,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Stack,
  Paper,
  InputAdornment,
  TextField,
  Toolbar,
} from '@mui/material'

import user1 from '../../assets/images/profile/user-1.jpg'
import user2 from '../../assets/images/profile/user-2.jpg'
import user3 from '../../assets/images/profile/user-3.jpg'
import user4 from '../../assets/images/profile/user-4.jpg'
import user5 from '../../assets/images/profile/user-5.jpg'
import PageContainer from '../../components/container/PageContainer'
import ParentCard from '../../components/shared/ParentCard'
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb'
import { IconDotsVertical, IconSearch } from '@tabler/icons'
import NewUserModal from '../../components/apps/Users/NewUserModal'

const basicsTableData = [
  {
    id: '1',
    imgsrc: user1,
    firstName: 'Sunil',
    lastName: 'Joshi',
    post: 'Web Designer',
    pname: 'Elite Admin',
    userType: 'Admin',
    sellingBrands: [
      { brand: 'Deal Expert', bg: '#040E8A' },
      { brand: 'Check Your Bill', bg: '#0ea800' },
    ],
    sales30Days: '-',
    status: 'Active',
    budget: '3.9',
  },
  {
    id: '2',
    imgsrc: user2,
    firstName: 'Andrew',
    lastName: 'McDownland',
    post: 'Project Manager',
    pname: 'Real Homes WP Theme',
    userType: 'Agent',
    sellingBrands: [{ brand: 'Check Your Bill', bg: '#0ea800' }],
    sales30Days: '5',
    status: 'InActive',
    budget: '24.5',
  },
  {
    id: '3',
    imgsrc: user3,
    firstName: 'Christopher',
    lastName: 'Jamil',
    post: 'Project Manager',
    pname: 'MedicalPro WP Theme',
    userType: 'Admin',
    sellingBrands: [
      { brand: 'Compare Your Bills', bg: '#00afef' },
      { brand: 'Deal Expert', bg: '#040E8A' },
    ],
    sales30Days: '-',
    status: 'InActive',
    budget: '12.8',
  },
  {
    id: '4',
    imgsrc: user4,
    firstName: 'Nirav',
    lastName: 'Joshi',
    post: 'Frontend Engineer',
    pname: 'Hosting Press HTML',
    userType: 'Admin',
    sellingBrands: [{ brand: 'Deal Expert', bg: '#040E8A' }],
    sales30Days: '-',
    status: 'InActive',
    budget: '2.4',
  },
  {
    id: '5',
    imgsrc: user5,
    firstName: 'Micheal',
    lastName: 'Doe',
    post: 'Content Writer',
    pname: 'Helping Hands WP Theme',
    userType: 'Agent',
    sellingBrands: [
      { brand: 'Check Your Bill', bg: '#0ea800' },
      { brand: 'Compare Your Bills', bg: '#00afef' },
      { brand: 'Deal Expert', bg: '#040E8A' },
    ],
    sales30Days: '10',
    status: 'Active',
    budget: '9.3',
  },
]

const BCrumb = [
  {
    title: ' This page allows you to manage admin and agent users',
  },
]

const Users = () => {
  const [tabValue, setTabValue] = useState(0)
  const [actionAnchorEl, setActionAnchorEl] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState('')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleActionClick = (event, user) => {
    setActionAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleActionClose = () => {
    setActionAnchorEl(null)
    setSelectedUser(null)
  }

  const handleDeactivate = () => {
    handleActionClose()
  }

  const handleActivate = () => {
    handleActionClose()
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSaveUser = newUser => {
    console.log(newUser)
  }

  const handleSearch = event => {
    setSearch(event.target.value)
  }

  const filteredData = basicsTableData.filter(
    user =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.userType.toLowerCase().includes(search.toLowerCase()) ||
      user.sellingBrands.some(brand => brand.brand.toLowerCase().includes(search.toLowerCase())),
  )
  return (
    <>
      <PageContainer title='Users' description='this is Users Table page'>
        <Breadcrumb title='Users' items={BCrumb} />

        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
            <Box sx={{ flex: '1 1 100%' }}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <IconSearch size='1.1rem' />
                    </InputAdornment>
                  ),
                }}
                placeholder='Search Users'
                size='small'
                onChange={handleSearch}
                value={search}
              />
            </Box>
          </Typography>

          <Button
            variant='contained'
            color='primary'
            sx={{ float: 'right', height: '40px', width: '100%', maxWidth: 'fit-content' }}
            onClick={handleOpenModal}
          >
            New User
          </Button>
        </Toolbar>
        <Paper variant='outlined'>
          <Box sx={{ px: 2, py: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label='Active Users' />
              <Tab label='Inactive Users' />
            </Tabs>
          </Box>
          <TableContainer sx={{ px: 2 }}>
            <Table
              aria-label='simple table'
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant='h6'>User</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h6'>User Type</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h6'>Selling Brands</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h6'>Sales - 30 Days</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h6'>Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map(basic =>
                  (tabValue === 0 && basic.status === 'Active') ||
                  (tabValue === 1 && basic.status !== 'Active') ? (
                    <TableRow key={basic.id}>
                      <TableCell>
                        <Stack
                          direction='row'
                          sx={{ display: 'flex', alignItems: 'center' }}
                          spacing={2}
                        >
                          <Avatar
                            src={basic.imgsrc}
                            alt={basic.imgsrc}
                            sx={{ width: 40, height: 40, mr: 1 }}
                          />
                          <Box>
                            <Typography variant='h6' fontWeight='600'>
                              {`${basic.firstName} ${basic.lastName}`}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Typography color='textSecondary' variant='h6' fontWeight='400'>
                          {basic.userType}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction='row' spacing={1}>
                          {basic.sellingBrands.map((team, i) => (
                            <Chip
                              label={team.brand}
                              sx={{ backgroundColor: team.bg, color: 'white', fontSize: '13px' }}
                              key={i}
                              size='small'
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography color='textSecondary' variant='h6' fontWeight='400'>
                          {basic.sales30Days}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton size='small' onClick={e => handleActionClick(e, basic)}>
                          <IconDotsVertical size='1.1rem' />
                        </IconButton>
                        <Menu
                          anchorEl={actionAnchorEl}
                          open={Boolean(
                            actionAnchorEl && selectedUser && selectedUser.id === basic.id,
                          )}
                          onClose={handleActionClose}
                        >
                          {basic.status === 'Active' ? (
                            <MenuItem onClick={handleDeactivate}>Deactivate</MenuItem>
                          ) : (
                            <MenuItem onClick={handleActivate}>Activate</MenuItem>
                          )}
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ) : null,
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <NewUserModal
            open={openModal}
            handleClose={handleCloseModal}
            handleSave={handleSaveUser}
          />
        </Paper>
      </PageContainer>
    </>
  )
}

export default Users
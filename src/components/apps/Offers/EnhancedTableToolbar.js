import { alpha, Box, Button, InputAdornment, MenuItem, Select, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { IconArrowUp } from '@tabler/icons'
import React from 'react'
import ExpireConfirmationModal from './ExpireConfirmationModal'

const OffersEnhancedTableToolbar = props => {
    const {
      numSelected,
      setSelectedOption,
      selectedOption,
      modalOpen,
      setModalOpen,
    } = props
  
    const handleSelectChange = event => {
      setSelectedOption(event.target.value)
      if (event.target.value === 'Expire') {
        setModalOpen(true)
      }
    }
  
    const handleCloseModal = () => {
      setModalOpen(false)
      setSelectedOption('')
    }
  
    const handleConfirmExpire = () => {
      console.log('Offer expired')
      setModalOpen(false)
      setSelectedOption('')
    }
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: theme =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle2' component='div'>
            {numSelected} selected
          </Typography>
        ) : (
          <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
          
        </Typography>
        )}
  
        {numSelected > 0 ? (
          <>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value='' disabled>
                Actions
              </MenuItem>
              <MenuItem value='Expire'>Expire</MenuItem>
              <MenuItem value='Edit'>Edit</MenuItem>
            </Select>
  
            <ExpireConfirmationModal
              open={modalOpen}
              handleClose={handleCloseModal}
              handleConfirm={handleConfirmExpire}
            />
          </>
        ) : (
          <Tooltip title='Import Offers'>
            <Button
              variant='contained'
              color='primary'
              sx={{ float: 'right', height: '40px', width: '100%', maxWidth: 'fit-content' }}
              startIcon={<IconArrowUp />}
            >
              Import Offers
            </Button>
          </Tooltip>
        )}
      </Toolbar>
    )
  }


export default OffersEnhancedTableToolbar
import React from 'react'
import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox'
import { Button, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { visuallyHidden } from '@mui/utils'

export const headCells = [
    {
      id: 'planId',
      numeric: false,
      label: 'Plan ID',
    },
    {
      id: 'offerName',
      numeric: false,
      label: 'Offer',
    },
    {
      id: 'retailer',
      numeric: false,
      label: 'Retailer',
    },
    {
      id: 'state',
      numeric: false,
      label: 'State',
    },
    {
      id: 'market',
      numeric: false,
      label: 'Market',
    },
    {
      id: 'fuel',
      numeric: false,
      label: 'Fuel',
    },
    {
      id: 'effective',
      numeric: false,
      label: 'Effective',
    },
    {
      id: 'priceTags',
      numeric: false,
      label: 'Price Tags',
    },
    {
      id: 'sales',
      numeric: false,
      label: 'Sales',
    },
  ]

function OffersEnhancedTableHead (props) {
    const {  order, orderBy, onRequestSort, tab } = props
    const createSortHandler = property => event => {
      onRequestSort(event, property)
    }
  
    return (
      <TableHead>
        <TableRow>
          <TableCell sx={{padding:'0'}}></TableCell>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding='normal'
              sortDirection={orderBy === headCell.id ? order : false}
            >
             {headCell.label!=="Price Tags"? <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography sx={{fontWeight:'600'}}>{headCell.label}</Typography>
                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>: <Typography sx={{fontWeight:'600'}}>{headCell.label}</Typography>}
            </TableCell>
          ))}
         <TableCell></TableCell>
         <TableCell></TableCell>
          
        </TableRow>
      </TableHead>
    )
  }

export default OffersEnhancedTableHead
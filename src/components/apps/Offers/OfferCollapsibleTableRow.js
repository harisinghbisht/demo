import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { IconEdit, IconUpload } from '@tabler/icons'
import React from 'react'

const OfferCollapsibleTableRow = ({ row, isOpen }) => {
  return (
    <TableRow>
      <TableCell sx={{ paddingBottom: 0, paddingTop: 0, border: 'none' }} colSpan={10}>
        <Collapse in={isOpen} timeout='auto' unmountOnExit>
          <Box width={'100%'} padding={3} bgcolor={'#f6f6f6'}>
            <Table size='small' aria-label='purchases'>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <Typography  fontWeight='500'>CZ</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography  fontWeight='500'>VEFS URL</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.state === 'VIC' &&
                  row.additionalDetails.length > 0 &&
                  row.additionalDetails.map((el, i) => (
                    <TableRow key={i}>
                      <TableCell style={{ borderBottom: 'none' }}></TableCell>
                      <TableCell style={{ borderBottom: 'none' }}>
                        <Typography color='textSecondary'  fontWeight='400'>
                          {el.label}
                        </Typography>
                      </TableCell>
                      <TableCell style={{ borderBottom: 'none' }}>
                        <Typography
                          color='#5c88fc'
                          sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center',
                          }}
                          
                          fontWeight='400'
                        >
                          {el?.value ? (
                            <>
                              <a
                                href={el.value}
                                target='_blank'
                                rel='noopener noreferrer'
                                style={{
                                  textDecoration: 'none',
                                  color: '#5c88fc',
                                }}
                              >
                                {el.value}
                              </a>
                              <IconButton width={18}>
                                <IconEdit />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton width={18}>
                                <IconUpload />
                              </IconButton>
                              Upload url
                            </>
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default OfferCollapsibleTableRow

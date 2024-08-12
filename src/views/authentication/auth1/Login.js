import React from 'react'
import { Grid, Box, Stack, Typography } from '@mui/material';
import AuthLogin from '../authForms/AuthLogin';
const Login = () => {
  return (
 <>
    <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={7}
        xl={8}
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Box position="relative">
          <Box pt={1} px={2}>
            <img src='https://mindlabz.com.au/wp-content/uploads/2023/08/man-logo.svg' style={{width: '100%',
                maxWidth: '240px'
                }}/>
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height={'calc(100vh - 75px)'}
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
              },
            }}
          >
            <img src="https://mindlabz.com.au/wp-content/uploads/2023/08/38514810-header-vector.png" style={{
                width: '100%',
                maxWidth: '500px',
                maxHeight: '500px',
              }}/>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box p={4}>
          <AuthLogin
            title="Welcome to MindLabz"
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                Your Admin Dashboard
              </Typography>
            }
        
          />
        </Box>
      </Grid>
    </Grid>
    </>
)};

export default Login
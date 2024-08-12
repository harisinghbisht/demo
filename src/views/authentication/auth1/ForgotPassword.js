import React, { useState } from 'react'
import { Box, Typography, Button, TextField, Grid, Card, Alert, AlertTitle } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const LogoImg = styled('img')({
  height: 60,
  marginBottom: 20,
})

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(true)

  const handleForgotPassword = () => {
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }

  return (
    <Box
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
      <Grid container spacing={0} justifyContent='center' sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          width='100%'
          maxWidth='500px'
          // border='2px solid red'
        >
          {showAlert && (
            <Alert
              variant='filled'
              onClose={() => setShowAlert(false)}
              severity='success'
              sx={{ width: '100%', maxWidth: '500px', mb: 2 }}
            >
              A password reset email has been sent to jim@bob.com
            </Alert>
          )}

          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}
          >
            <Box display='flex' alignItems='center' justifyContent='center'>
              <LogoImg
                src='https://mindlabz.com.au/wp-content/uploads/2023/08/man-logo.svg'
                alt='Logo'
              />
            </Box>
            <Typography
              color='textSecondary'
              textAlign='center'
              variant='subtitle2'
              fontWeight='400'
            >
              Please enter the email address associated with your account and We will email you a
              link to reset your password.
            </Typography>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '16px',
                gap: '16px',
              }}
            >
              <label
                style={{
                  textAlign: 'start',
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  lineHeight: '1.75',
                }}
              >
                Email Address
              </label>

              <TextField id='email' variant='outlined' fullWidth />
              <Button
                color='primary'
                variant='contained'
                size='large'
                fullWidth
                onClick={handleForgotPassword}
              >
                Forgot Password
              </Button>
              <Button
                color='primary'
                size='large'
                fullWidth
                onClick={() => navigate('/auth/login')}
              >
                Back to Login
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ForgotPasswordPage

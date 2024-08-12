import React from 'react'
import { Box, Typography, FormGroup, FormControlLabel, Button, Stack, Divider } from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField'
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel'
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox'

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate()

  return (
    <>
      {title ? (
        <Typography fontWeight='700' variant='h3' mb={1} fontSize={'24px'}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <CustomFormLabel htmlFor='username'>Username</CustomFormLabel>
          <CustomTextField id='username' variant='outlined' fullWidth />
        </Box>
        <Box>
          <CustomFormLabel htmlFor='password'>Password</CustomFormLabel>
          <CustomTextField id='password' type='password' variant='outlined' fullWidth />
        </Box>
        <Stack justifyContent='space-between' direction='row' alignItems='center' my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label='Remember this Device'
            />
          </FormGroup>

          <Typography
            fontWeight='500'
            sx={{
              color: 'rgb(93, 135, 255)',
              cursor: 'pointer',
            }}
            component={Link}
            to='/auth/forgot-password'
          >
            Forgot Password?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color='primary'
          variant='contained'
          size='large'
          fullWidth
          type='submit'
          component={Link}
          to='/'
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  )
}

export default AuthLogin

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Divider, Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';


const EnhancedCardHeader = ({ title, subtitle }) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="h6" >
        {title}
      </Typography>
      {subtitle && (
        <Button sx={{ width:"10px" ,paddingY:0 }}>
        {subtitle}
      </Button>
      )}
    </Box>
  );
};

const EnhancedCard = ({ title, subtitle, children, footer }) => {
  const customizer = useSelector((state) => state.customizer);
  return (
    <Card
      sx={{ padding: 0 }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      <CardHeader
        title={<EnhancedCardHeader title={title} subtitle={subtitle} />}
      />
      <Divider /> 
      <CardContent>{children}</CardContent>
      {footer && (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      )}
    </Card>
  );
};

EnhancedCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

EnhancedCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
};

export default EnhancedCard;

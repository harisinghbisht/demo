import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  overflowY: 'auto',
};

const TermsAndConditionsModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h2" component="h2" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="h6" component="h2" mt={2} gutterBottom>
          AGL Value Saver - NSW, QLD and SA
        </Typography>
        <Typography paragraph>
          This plan is available as part of an ongoing market contract with no exit fees.
        </Typography>
        <Typography paragraph>
          Your rates under this plan are variable and may differ from AGL's published variable rates and other rates that AGL offers from time to time, including under the same plan.
        </Typography>
        <Typography paragraph>
          If AGL varies your rates, they will give you at least five business days prior notice of the variation.
        </Typography>
        <Typography paragraph>
          <strong>At the end of the (XX Month) Energy Plan Period</strong>, AGL may contact you to advise you of the new rates and/or benefits that will subsequently apply to you. If AGL doesn't contact you, this plan will continue for a further (XX Month) Energy Plan Period. Your solar inverter capacity is less than or equal to 10kW in NSW
        </Typography>
        <Typography paragraph>
          • 10kVa per phase in South Australia
        </Typography>
        <Typography paragraph>
          • 30kW in Queensland
        </Typography>
        <Typography paragraph>
          • You are not receiving a solar feed-in tariff under a government scheme, including the Distributor Feed-in Tariff in South Australia, or the Solar Bonus Scheme in Queensland.
        </Typography>
        <Typography paragraph>
          <strong>FOR NSW, QLD and SA ELECTRICITY (MOVERS AND INSITU ONLY)</strong> – You will also receive a once off ($XX) sign up credit which will be applied on the first electricity bill under this plan. This credit amount reduces the price for supply of electricity and is not transferable.
        </Typography>
        <Typography paragraph>
          <strong>If Applicable (Read for all solar customers who are eligible to receive a Retailer Feed in Tariff)</strong> - The solar feed-in tariff available under this plan is (AGL retailer FIT). This solar feed-in tariff is variable and can change with notice to you at any time.
        </Typography>
        <Typography paragraph>
          You will only be eligible to receive this solar feed-in tariff if:
        </Typography>
        <Typography paragraph>
          If we become aware that your solar system is ineligible, or you do not meet the eligibility criteria to receive a Retailer Feed-In Tariff from AGL, AGL reserves the right to stop Retailer Feed-in Tariff payments. AGL will let you know before they stop crediting it to your account.
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default TermsAndConditionsModal;
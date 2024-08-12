import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Link,
  Typography,
  Paper,
} from '@mui/material';
import ParentCard from '../../components/shared/ParentCard';
import PageContainer from '../../components/container/PageContainer';
import BlankCard from '../../components/shared/BlankCard';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';

// Sample data for leads
const leadsData = [
  {
    reference: 'REF12345',
    name: 'John Doe',
    marketSegment: 'Residential',
    location: '123 Main St, Springfield, 12345, IL',
    createdOn: '2024-07-15',
    type: 'Agent',
    agentUsername: 'agent007',
    status: 'New',
    externalLink: 'https://example.com/plans/REF12345'
  },
  {
    reference: 'REF67890',
    name: 'Jane Smith',
    marketSegment: 'Small Business',
    location: '456 Elm St, Shelbyville, 54321, IN',
    createdOn: '2024-07-10',
    type: 'Customer',
    status: 'Call back',
    externalLink: 'https://example.com/plans/REF67890'
  },

];

const LeadsTable = () => {
  return (
    <PageContainer title="Create Leads" description="this is Create Leads page">
    <Breadcrumb title="Leads" subtitle="This page Shows you all the Leads" />

    <Paper variant="outlined">
      <ParentCard title="Leads" >
      <BlankCard>
      <TableContainer >
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>
            <Typography variant='h6'>Reference</Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>Name</Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>Market Segment</Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>Location</Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>Created On</Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>Type</Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>Status</Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>External Link</Typography>
          </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leadsData.map((lead) => (
            <TableRow key={lead.reference}>
              <TableCell>
                <Link href={`/customer-details/${lead.reference}`} underline="hover">
                  {lead.reference}
                </Link>
              </TableCell>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.marketSegment}</TableCell>
              <TableCell>
                <Typography variant="body2" component="span" style={{ fontWeight: 'bold' }}>
                  {lead.location.split(',')[0]}
                </Typography>
                <br />
                {lead.location.split(',').slice(1).join(',')}
              </TableCell>
              <TableCell>{lead.createdOn}</TableCell>
              <TableCell>
                {lead.type === 'Agent' ? `Agent (${lead.agentUsername})` : 'Customer'}
              </TableCell>
              <TableCell>{lead.status}</TableCell>
              <TableCell>
                <Link href={lead.externalLink} target="_blank" underline="hover">
                  Open Plans Page
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </BlankCard>


      </ParentCard>
      </Paper>
      </PageContainer >

  );
};

export default LeadsTable;

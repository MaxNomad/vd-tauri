import NextLink from 'next/link';

// material-ui
import { Chip, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from '@components/MainCard';

// table data
const createData = (badgeText, badgeType, subject, dept, date) => ({
    badgeText,
    badgeType,
    subject,
    dept,
    date
});

const rows = [
    createData('Open', 'default', 'Website down for one week', 'Support', 'Today 2:00'),
    createData('Progress', 'primary', 'Loosing control on server', 'Support', 'Yesterday'),
    createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug'),
    createData('Open', 'default', 'Restoring default settings', 'Support', 'Today 9:00'),
    createData('Progress', 'primary', 'Loosing control on server', 'Support', 'Yesterday'),
    createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug'),
    createData('Open', 'default', 'Restoring default settings', 'Support', 'Today 9:00'),
    createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug')
];

// ==========================|| DATA WIDGET - RECENT TICKETS CARD ||========================== //

const RecentTickets = () => (
    <MainCard
        title="Recent Tickets"
        content={false}
        secondary={
            <NextLink href="#" passHref>
                <Link color="primary">View all</Link>
            </NextLink>
        }
    >
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>Subject</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="right" sx={{ pr: 3 }}>
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow hover key={index}>
                            <TableCell sx={{ pl: 3 }}>{row.subject}</TableCell>
                            <TableCell>{row.dept}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell align="right" sx={{ pr: 3 }}>
                                <Chip variant="outlined" color="secondary" label={row.badgeText} size="small" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </MainCard>
);

export default RecentTickets;

import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

// next
//import Head from 'next/head';

// material-ui
import { Box } from '@mui/material';

// ==============================|| Page - SET TITLE & META TAGS ||============================== //

// eslint-disable-next-line react/display-name
const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
    <>
        <Box ref={ref} {...other}>
            {children}
        </Box>
    </>
));

Page.propTypes = {
    title: PropTypes.string,
    meta: PropTypes.node,
    children: PropTypes.node
};

export default Page;

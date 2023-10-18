import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Grid, Skeleton, Stack, Typography, Divider, Box } from '@mui/material';

// project import
import MainCard from '@components/MainCard';

// ===============================|| COMPONENT - SKELETON ||=============================== //

const ComponentSkeletonKns = ({ children, renderContent }) => {
    const skeletonCard = (
        <MainCard>
            <Stack spacing={0.7}>
                <Skeleton sx={{ height: 16, width: 50 }} />
                <Skeleton sx={{ height: 24, width: 80 }} animation="wave" variant="rectangular" />
                <Skeleton sx={{ height: 16, width: 100 }} />
            </Stack>
        </MainCard>
    );
    const knsItem = (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4} UWHD={3}>
            <MainCard contentSX={{ p: 2.25 }}>
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    <Grid item xs={9} sm={6} md={6} lg={6}>
                        <Skeleton sx={{ height: 24, width: 180 }} animation="wave" variant="rectangular" />
                    </Grid>
                    <Grid item xs={3} sm={6} md={6} lg={6} display="flex" justifyContent="flex-end">
                        <Skeleton sx={{ height: 20, width: 60 }} animation="wave" variant="rectangular" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.75 }}>
                        <Skeleton sx={{ height: 24, width: 120 }} />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: -3.25 }}>
                        <Skeleton sx={{ height: 14, width: 70 }} />
                        <Divider sx={{ mt: 1 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton sx={{ mt: -8.25, mb: -2.25, height: 200 }} />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: -4.25, mb: -2.25 }}>
                        <Skeleton sx={{ height: 14, width: 70 }} />
                        <Divider sx={{ mt: 1 }} />
                        <Skeleton sx={{ height: 141, mt: -1.25 }} />
                    </Grid>
                </Grid>
            </MainCard>
        </Grid>
    );
    const headerPage = (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Skeleton sx={{ height: 20, width: 100 }} animation="wave" variant="rectangular" />
            </Grid>
            {knsItem}
            {knsItem}
            {knsItem}
            {knsItem}
            {knsItem}
            {knsItem}
        </Grid>
    );

    return <>{!renderContent ? headerPage : children}</>;
};

ComponentSkeletonKns.propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool
};

export default ComponentSkeletonKns;

import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Grid, Skeleton, Stack } from '@mui/material';

// project import
import MainCard from '@components/MainCard';

// ===============================|| COMPONENT - SKELETON ||=============================== //

const ComponentSkeleton = ({ children, renderContent }) => {
    const skeletonCard = (
        <MainCard
            title={<Skeleton sx={{ width: { xs: 120, md: 180 } }} />}
            secondary={<Skeleton animation="wave" variant="circular" width={24} height={24} />}
        >
            <Stack spacing={1}>
                <Skeleton />
                <Skeleton sx={{ height: 64 }} animation="wave" variant="rectangular" />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton sx={{ height: 64 }} animation="wave" variant="rectangular" />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton sx={{ height: 64 }} animation="wave" variant="rectangular" />
                <Skeleton />
                <Skeleton />
            </Stack>
        </MainCard>
    );

    return (
        <>
            {!renderContent ? (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        {skeletonCard}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {skeletonCard}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {skeletonCard}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {skeletonCard}
                    </Grid>
                </Grid>
            ) : (
                children
            )}
        </>
    );
};

ComponentSkeleton.propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool
};

export default ComponentSkeleton;

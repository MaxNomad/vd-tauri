import TimeAgo from '@pages/counters/components/timeAgo';
import React from 'react';
import { Typography } from '@mui/material';
import MainCard from './MainCard';
import { useSelector } from 'react-redux';

const GitHubStats = () => {
    
    const {data}  = useSelector((state) => state.rootGithub);

    return (
        <MainCard>
            <Typography variant="h4" color="textSecondary" sx={{ mb: 1 }}>
                Git commit data
            </Typography>
            <Typography variant="h6" noWrap sx={{ mb: 1 }}>
               Commit hash: {data?.shortCommit}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Commited date: <TimeAgo targetTime={new Date(data?.date)}/>
            </Typography>
            <Typography variant="h6" noWrap sx={{ mb: 1 }}>
               Comment: {data?.message}
            </Typography>
        </MainCard>
    );
};

export default React.memo(GitHubStats);

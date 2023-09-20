import { Grid, Box } from '@mui/material';
import { useMemo } from 'react';
import React from 'react';
import PumpSingleSmall from './PumpSingleSmall';

const SmallWellsList = ({ data = [] }) => {
    const renderPumps = useMemo(
        () =>
            data?.map((pump) => {
                return pump?.visible ? <PumpSingleSmall data={pump} lastUpdate={pump?.timeStamp} key={pump.pumpID} /> : '';
            }),
        [data]
    );
    return (
        <>
            <Box sx={{ width: '100%', overflowX: 'auto', pb: 2, mb: { md: -1, sm: 2 }, mt: -1 }}>
                <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ display: 'inline-flex!important', width: 80 * data.length }}>
                    {renderPumps}
                </Grid>
            </Box>
        </>
    );
};
export default React.memo(SmallWellsList);

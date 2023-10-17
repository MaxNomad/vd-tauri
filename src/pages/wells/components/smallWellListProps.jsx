import { Grid, Box } from '@mui/material';
import { useMemo } from 'react';
import React from 'react';
import PumpSingleSmall from './PumpSingleSmall';

const SmallWellsList = ({ data }) => {
    const renderPumps = useMemo(
        () =>
            data?.map((pump) => {
                return pump?.visible ? <PumpSingleSmall data={pump} lastUpdate={pump?.timeStamp} key={pump.pumpID} /> : '';
            }),
        [data]
    );
    return (
        <>
            <Box sx={{  pb: 2, mb: { md: -1, sm: 2 }, mt: -5 }}>
                <Grid container rowSpacing={2.75} columnSpacing={2.75} >
                    {renderPumps}
                </Grid>
            </Box>
        </>
    );
};
export default React.memo(SmallWellsList);

import PropTypes from 'prop-types';
import MainCard from '@components/MainCard';
import { Grid, Typography, Box, Divider } from '@mui/material';
import FillCircle from '@pages/kns/items/GetLvlCircle';
import FillStatus from '@pages/kns/items/GetLvl';
import LvlList from '@pages/kns/components/LvlList';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const TankItem = ({ levels }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));

    const CircleStyle = {
        width: matchDownMD ? `10.9em` : `8.5em`,
        padding: 5
    };
    return (
        <>
            {' '}
            <MainCard sx={{ mt: 2, pb: 0.7 }}>
                <Grid container>
                    <Grid item xs={4} md={5} lg={3}>
                        <Box style={CircleStyle}>
                            <FillCircle levels={levels} />
                        </Box>
                    </Grid>
                    <Grid item xs={7} md={5} lg={8} sx={{ ml: { lg: 4, xs: 2 }, mt: { xl: 2, lg: 1.5, xs: 1 } }}>
                        <Typography variant="h5" color="textSecondary">
                            Поточні показники:{' '}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            <p style={{ marginTop: 15 }} />
                            Поточний рівень: <b>{levels?.current ? levels?.current : '0'} см.</b>
                            <p />
                            Макс. рівень: <b>{levels?.max ? levels?.max : '0'} см.</b>
                            <p />
                            Стоп рівень: <b>{levels?.min || 0} см.</b>
                            <p style={{ marginTop: 10 }} />
                            Рівень: &nbsp;
                            <FillStatus levels={levels} />
                        </Typography>
                    </Grid>
                    <Grid item lg={12} sx={{ mt: 2 }}>
                        <Divider />
                    </Grid>
                    <LvlList levels={levels} />
                </Grid>
            </MainCard>
        </>
    );
};

TankItem.propTypes = {
    levels: PropTypes.object
};
export default TankItem;

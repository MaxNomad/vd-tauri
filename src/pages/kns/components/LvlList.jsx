import PropTypes from 'prop-types';
import { Chip, Grid, Typography } from '@mui/material';
import React from 'react';

const LvlList = ({ levels }) => {
    const padding = {
        paddingTop: 7
    };
    const paddingLvl = {
        paddingTop: 7
    };
    return (
        <>
            <Grid item xs={12} md={12} lg={8} sx={{ mt: 1.8 }}>
                <Typography variant="h5" color="textSecondary">
                    Умовні позначення:
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    <p style={padding} />
                    {levels?.first ? (
                        <>
                            Нижче {levels?.first - 1} см. : &nbsp;
                            <Chip
                                label={levels?.first ? 'Низький' : 'Не визначено'}
                                size="small"
                                color={levels?.first ? 'primary' : 'error'}
                            />
                        </>
                    ) : (
                        ''
                    )}
                    <p style={padding} />
                    {levels?.first ? (
                        <>
                            Від {levels?.first} см. до {levels?.second - 1} см. : &nbsp;
                            <Chip
                                label={levels?.first ? 'Середній' : 'Не визначено'}
                                size="small"
                                color={levels?.first ? 'success' : 'error'}
                            />
                        </>
                    ) : (
                        ''
                    )}
                    <p style={padding} />
                    {levels?.second ? (
                        <>
                            Від {levels?.second} см. до {levels?.third - 1} см. : &nbsp;
                            <Chip
                                label={levels?.first ? 'Вище середнього' : 'Не визначено'}
                                size="small"
                                color={levels?.second ? 'warning' : 'error'}
                            />
                        </>
                    ) : (
                        ''
                    )}
                    <p style={padding} />
                    {levels?.third ? (
                        <>
                            Від {levels?.third} см. до {levels?.max - 10} см. : &nbsp;
                            <Chip
                                label={levels?.first ? 'Високий' : 'Не визначено'}
                                size="small"
                                color={levels?.third ? 'error' : 'error'}
                            />
                        </>
                    ) : (
                        ''
                    )}
                    <p style={padding} />
                    {levels?.max ? (
                        <>
                            Вище {levels?.max} см. : &nbsp;
                            <Chip
                                label={levels?.first ? 'Критичний' : 'Не визначено'}
                                size="small"
                                color={levels?.max ? 'secondary' : 'error'}
                            />
                        </>
                    ) : (
                        ''
                    )}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={4} sx={{ mt: 1.8 }}>
                <Typography variant="h5" color="textSecondary">
                    Рівні включення насосів:
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ pt: 0 }}>
                    <p style={paddingLvl} />
                    Перший рівень: <b>{levels?.first} см.</b>
                    <p style={paddingLvl} />
                    Другий рівень: <b>{levels?.second} см.</b>
                    <p style={paddingLvl} />
                    Третій рівень: <b>{levels?.third} см.</b>
                </Typography>
                <Typography variant="h5" color="textSecondary" sx={{ mt: 0.8 }}>
                    Рівень відключення:
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ pt: 0 }}>
                    <p style={paddingLvl} />
                    Стоп рівень: <b>{levels?.min} см.</b>
                </Typography>
            </Grid>
        </>
    );
};

LvlList.propTypes = {
    levels: PropTypes.object
};

export default LvlList;

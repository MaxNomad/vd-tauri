import PropTypes from 'prop-types';
import MainCard from '@components/MainCard';
import { Grid, Typography, Chip, Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const CounterItemScada = ({ props }) => {
    return (
        <>
            <Grid item xs={12} md={4} lg={2.4} sm={6}>
                <MainCard>
                    <Grid container>
                        <Grid item lg={8} xs={8} md={8}>
                            <Typography variant="h5" color="textSecondary">
                                Лічильник №{props?.number}
                            </Typography>
                        </Grid>
                        <Grid item lg={4} xs={4} md={4} display="flex" justifyContent="flex-end">
                            <Chip label={props?.provider} size="small" color="secondary" />
                        </Grid>
                        <Grid item lg={12}>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Оновлено:&nbsp;&nbsp;{new Date(props?.requestUpdate).toLocaleString()}
                            </Typography>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Об`єкт: <Link to={props?.link}> {props?.name}</Link>
                            </Typography>
                            <p />

                            <Typography variant="h5" color="textSecondary" sx={{ mt: 1 }}>
                                Показник:&nbsp;&nbsp;
                                <b>
                                    {props?.counterValue ?? 'NaN'}
                                    <b> м³</b>
                                    <Tooltip title="Зміна показника за добу в м³" placement="bottom-end">
                                        <Chip
                                            variant="combined"
                                            color={props?.counterValueOld === 0 ? 'warning' : 'success'}
                                            label={`+${props?.counterValueOld ?? 0}`}
                                            sx={{ ml: 0.8, mt: -0.3 }}
                                            size="small"
                                        />
                                    </Tooltip>
                                </b>
                            </Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </>
    );
};

CounterItemScada.propTypes = {
    props: PropTypes.object,
    number: PropTypes.number,
    counterValue: PropTypes.number,
    counterValueOld: PropTypes.number,
    requestUpdate: PropTypes.string,
    name: PropTypes.string,
    link: PropTypes.string,
    provider: PropTypes.string
};
export default React.memo(CounterItemScada);

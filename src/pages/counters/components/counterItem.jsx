import React from 'react';
import PropTypes from 'prop-types';
import MainCard from '@components/MainCard';
import NetworkStatus from './networkStatus';
import IconButton from '@components/@extended/IconButton';

import { Grid, Typography, Divider, Chip, Tooltip } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined, RedoOutlined, AppstoreOutlined } from '@ant-design/icons';
import { toastSuccess } from '@pages/components-overview/toasts';
import TimeAgo from './timeAgo';

const CounterItem = ({ props }) => {
    const subtractHours = (date, hours) => {
        date.setHours(date.getHours() - hours);

        return date;
    };
    const requestSotaTime = new Date(props?.requestSotaTime);
    const requestDataTime = subtractHours(new Date(props?.writeTime), 3);
    return (
        <>
            <Grid item xs={12} md={4} lg={2.4} sm={6}>
                <MainCard>
                    <Grid container>
                        <Grid item lg={8} xs={8} md={8}>
                            <Typography variant="h5" color="textSecondary">
                                Лічильник №{props?.number}&nbsp;&nbsp;
                                <NetworkStatus props={props?.signal} />
                            </Typography>
                        </Grid>
                        <Grid item lg={4} xs={4} md={4} display="flex" justifyContent="flex-end">
                            <Chip label={props?.provider} size="small" color="primary" />
                        </Grid>
                        <Grid item lg={12}>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Модель:&nbsp;&nbsp;
                                {props?.deviceModel}
                            </Typography>
                            <p />
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Об`єкт:&nbsp;&nbsp;
                                {props?.object}
                            </Typography>
                            <p />
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Тип:&nbsp;&nbsp;
                                {props?.counterType}
                            </Typography>
                            <p />
                            <Grid item lg={12} sx={{ mt: 0.6 }}>
                                <Divider />
                            </Grid>
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                ID:&nbsp;&nbsp;
                                <Chip label={props?.deviceId} size="small" />
                                &nbsp;&nbsp;
                                <CopyToClipboard text={props?.deviceId} onCopy={() => toastSuccess('ID лічильника скопійовано')}>
                                    <Tooltip title="Скопіювати ID" placement="top-end">
                                        <IconButton color="secondary" size="small" sx={{ fontSize: '0.875rem' }}>
                                            <CopyOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </CopyToClipboard>
                            </Typography>
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Serial:&nbsp;&nbsp;
                                <Chip label={props?.serial} size="small" />
                                &nbsp;&nbsp;
                                <CopyToClipboard text={props?.serial} onCopy={() => toastSuccess('Серійний номер лічильника скопійовано')}>
                                    <Tooltip title="Скопіювати серійний номер" placement="top-end">
                                        <IconButton color="secondary" size="small" sx={{ fontSize: '0.875rem' }}>
                                            <CopyOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </CopyToClipboard>
                            </Typography>
                            <Grid item lg={12} sx={{ mt: 0.6 }}>
                                <Divider />
                            </Grid>
                            <Typography variant="h5" color="textSecondary" sx={{ mt: 1 }}>
                                Показник:&nbsp;&nbsp;
                                <b>
                                    {(props?.counterValue ?? 0).toFixed(2)}
                                    <b> м³</b>
                                </b>
                            </Typography>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                <TimeAgo text="Оновлено " targetTime={requestSotaTime} /> &nbsp;
                                <Tooltip title={<TimeAgo text="Записано" targetTime={requestDataTime} />} placement="top">
                                    <AppstoreOutlined />
                                </Tooltip>
                            </Typography>
                            <p />
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </>
    );
};

CounterItem.propTypes = {
    props: PropTypes.object,
    number: PropTypes.number,
    deviceId: PropTypes.string,
    writeTime: PropTypes.string,
    counterValue: PropTypes.number,
    requestSotaTime: PropTypes.string,
    provider: PropTypes.string,
    signal: PropTypes.number
};
export default React.memo(CounterItem);

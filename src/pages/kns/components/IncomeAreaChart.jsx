import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { getChartData } from '@pages/kns/redux/knsDataChartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import config from '../../../config';
// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        zoom: {
            autoScaleYaxis: true
        },
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ props }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { data, loading } = useSelector((state) => state.knsChartData);
    const { primary, secondary, error } = theme.palette.text;
    const line = theme.palette.divider;
    const [searchParams] = useSearchParams();

    const [options, setOptions] = useState(areaChartOptions);
    const [storeSlot, setStoreSlot] = useState(4);

    const [timer, setTimer] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(
            () => setTimer(Date.now()),
            localStorage.apiChartUpdateTime ? localStorage.apiChartUpdateTime : config.defaultChartUpdateTime
        );
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setStoreSlot(props?.slot ? props.slot : 4);
    }, [props, searchParams]);

    const [series, setSeries] = useState([
        {
            name: '',
            data: []
        },
        {
            name: '',
            data: []
        },
        {
            name: '',
            data: []
        },
        {
            name: '',
            data: []
        }
    ]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [
                '#52c41a',
                theme.palette.warning.main,
                theme.palette.primary[700],
                theme.palette.primary[400],
                theme.palette.primary.light
            ],
            xaxis: {
                categories: data.date,
                axisBorder: {
                    show: true,
                    color: line
                },
                tickAmount: data.date.length / 4
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            grid: {
                borderColor: line
            },

            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return '12312';
                    }
                }
            }
        }));
    }, [primary, secondary, line, theme, error, storeSlot, loading]);

    useEffect(() => {
        dispatch(getChartData({ knsID: searchParams.get('id'), timeline: storeSlot }));
    }, [searchParams, storeSlot, timer]);

    useEffect(() => {
        if (loading === 'idle') {
            setSeries([
                {
                    name: 'Рівень резервуару',
                    data: data.level
                },
                {
                    name: 'Активні аварії',
                    data: data.alerts
                },
                {
                    name: 'Робота насосу №1',
                    data: data.m1Status
                },
                {
                    name: 'Робота насосу №2',
                    data: data.m2Status
                },
                {
                    name: 'Робота насосу №3',
                    data: data.m3Status
                }
            ]);
        }
    }, [loading]);

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

IncomeAreaChart.propTypes = {
    props: PropTypes.object
};

export default IncomeAreaChart;

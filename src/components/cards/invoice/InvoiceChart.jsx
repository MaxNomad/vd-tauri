//next
import dynamic from 'next/dynamic';

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import useConfig from 'hooks/useConfig';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ==============================|| INVOICE - CHART ||============================== //

const InvoiceChart = ({ color, data }) => {
    const theme = useTheme();
    const { mode } = useConfig();

    // chart options
    const areaChartOptions = {
        chart: {
            id: 'new-stack-chart',
            height: 100,
            type: 'area',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                type: 'vertical',
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 0
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            },
            tooltip: {
                enabled: false
            }
        },
        stroke: {
            width: 1,
            curve: 'smooth'
        },
        grid: {
            show: false
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            }
        },
        tooltip: {
            theme: mode === 'dark' ? 'dark' : 'light',
            x: {
                show: false
            },
            y: {
                formatter(val) {
                    return `$ ${val}`;
                }
            }
        }
    };

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [color.main],
            tooltip: {
                theme: mode === 'dark' ? 'dark' : 'light'
            }
        }));
    }, [mode, primary, secondary, line, theme, color]);

    const [series] = useState([
        {
            name: 'Sales',
            data: data
        }
    ]);

    return <ReactApexChart options={options} series={series} type="area" height={80} />;
};

InvoiceChart.propTypes = {
    color: PropTypes.object,
    data: PropTypes.array
};

export default InvoiceChart;

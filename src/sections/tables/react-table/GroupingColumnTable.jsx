import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Box, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import { useTable, useGroupBy, useExpanded } from 'react-table';

// project import
import MainCard from '@components/MainCard';
import ScrollX from '@components/ScrollX';
import { CSVExport } from '@components/third-party/ReactTable';
import LinearWithLabel from '@components/@extended/progress/LinearWithLabel';
import { roundedMedian, useControlledState } from '@utils/react-table';

// assets
import { DownOutlined, GroupOutlined, RightOutlined, UngroupOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data,
            initialState: { groupBy: ['status'] }
        },
        useGroupBy,
        useExpanded,
        (hooks) => {
            hooks.useControlledState.push(useControlledState);
            hooks.visibleColumns.push((cols, { instance }) => {
                if (!instance.state.groupBy.length) {
                    return cols;
                }
                return [
                    {
                        id: 'expander',
                        Header: SelectionHeader,
                        Cell: SelectionCell
                    },
                    ...cols
                ];
            });
        }
    );

    const firstPageRows = rows.slice(0, 15);
    let groupedData = rows.map((d) => d.original);
    Object.keys(groupedData).forEach((key) => groupedData[Number(key)] === undefined && delete groupedData[Number(key)]);

    return (
        <MainCard
            content={false}
            title="Grouping With Single Column"
            secondary={
                <Stack direction="row" spacing={2}>
                    <Legend /> <CSVExport data={groupedData} filename={'grouping-single-column-table.csv'} />
                </Stack>
            }
        >
            <ScrollX>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup, i) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
                                {headerGroup.headers.map((column, index) => {
                                    const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;
                                    return (
                                        <TableCell {...column.getHeaderProps([{ className: column.className }])} key={index}>
                                            <Stack direction="row" spacing={1.15} alignItems="center" sx={{ display: 'inline-flex' }}>
                                                {column.canGroupBy ? (
                                                    <Box
                                                        sx={{ color: column.isGrouped ? 'error.main' : 'primary.main', fontSize: '1rem' }}
                                                        {...column.getGroupByToggleProps()}
                                                    >
                                                        {groupIcon}
                                                    </Box>
                                                ) : null}
                                                <Box>{column.render('Header')}</Box>
                                            </Stack>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {firstPageRows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()} key={i}>
                                    {row.cells.map((cell, index) => {
                                        let bgcolor = 'background.paper';
                                        if (cell.isAggregated) bgcolor = 'warning.lighter';
                                        if (cell.isGrouped) bgcolor = 'success.lighter';
                                        if (cell.isPlaceholder) bgcolor = 'error.lighter';

                                        return (
                                            <TableCell
                                                {...cell.getCellProps([{ className: cell.column.className }])}
                                                sx={{ bgcolor }}
                                                key={index}
                                            >
                                                {cell.isAggregated
                                                    ? cell.render('Aggregated')
                                                    : cell.isPlaceholder
                                                    ? null
                                                    : cell.render('Cell')}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </ScrollX>
        </MainCard>
    );
}

ReactTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
};

// ==============================|| LEGEND ||============================== //

function Legend() {
    return (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
            <Chip color="warning" variant="light" label="Aggregated" />
        </Stack>
    );
}

// ==============================|| REACT TABLE - EXPANDING DETAILS ||============================== //

const StatusCell = ({ value }) => {
    switch (value) {
        case 'Complicated':
            return <Chip color="error" label="Complicated" size="small" variant="light" />;
        case 'Relationship':
            return <Chip color="success" label="Relationship" size="small" variant="light" />;
        case 'Single':
        default:
            return <Chip color="info" label="Single" size="small" variant="light" />;
    }
};

StatusCell.propTypes = {
    value: PropTypes.string
};

const ProgressCell = ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />;

ProgressCell.propTypes = {
    value: PropTypes.number
};

function GroupingColumnTable({ data }) {
    const columns = useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'firstName',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Person`,
                disableGroupBy: true
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
                disableGroupBy: true
            },
            {
                Header: 'Email',
                accessor: 'email',
                disableGroupBy: true
            },
            {
                Header: 'Age',
                accessor: 'age',
                className: 'cell-right',
                aggregate: 'average',
                Aggregated: ({ value }) => `${value} (avg)`
            },
            {
                Header: 'Visits',
                accessor: 'visits',
                className: 'cell-right',
                aggregate: 'sum',
                Aggregated: ({ value }) => `${value} (total)`,
                disableGroupBy: true
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: StatusCell
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress',
                aggregate: roundedMedian,
                Aggregated: ({ value }) => `${value} (med)`,
                disableGroupBy: true,
                Cell: ProgressCell
            }
        ],
        []
    );

    return <ReactTable columns={columns} data={data} />;
}

GroupingColumnTable.propTypes = {
    data: PropTypes.array
};

const SelectionHeader = ({ allColumns, state: { groupBy } }) =>
    groupBy.map((columnId, index) => {
        const column = allColumns.find((d) => d.id === columnId);
        const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;

        return (
            <Stack
                key={index}
                direction="row"
                spacing={1.25}
                alignItems="center"
                {...column.getHeaderProps()}
                sx={{ display: 'inline-flex', '&:not(:last-of-type)': { mr: 1.5 } }}
            >
                {column.canGroupBy ? (
                    <Box
                        sx={{ color: column.isGrouped ? 'error.main' : 'primary.main', fontSize: '1rem' }}
                        {...column.getGroupByToggleProps()}
                    >
                        {groupIcon}
                    </Box>
                ) : null}
                <Typography variant="subtitle1">{column.render('Header')}</Typography>
            </Stack>
        );
    });

SelectionHeader.propTypes = {
    allColumns: PropTypes.array,
    state: PropTypes.array
};

const SelectionCell = ({ row }) => {
    if (row.canExpand) {
        const groupedCell = row.allCells.find((d) => d.isGrouped);
        const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;

        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <Box
                    sx={{ pl: row.depth * 2, pr: 1.25, fontSize: '0.75rem', color: 'text.secondary' }}
                    {...row.getToggleRowExpandedProps()}
                >
                    {collapseIcon}
                </Box>
                {/* eslint-disable-next-line */}
                {groupedCell.render('Cell')} ({row.subRows.length})
            </Stack>
        );
    }
    return null;
};

SelectionCell.propTypes = {
    row: PropTypes.object
};

export default GroupingColumnTable;

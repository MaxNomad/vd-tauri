import { Box, Collapse, Grid, ListItem, ListItemIcon, Typography } from '@mui/material';
import Pressure from './Pressure';
import React from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const PressureList = () => {
    const padding = {
        paddingTop: 7
    };
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItem onClick={handleClick} disablePadding sx={{ pt: 1, pb: 1, pr: 2, pl: 0,mt: {xs: 2, md: 0}, cursor: "pointer" }} disableGutters>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                <Typography variant="h5" color="textSecondary"sx={{}}>
                Умовні позначення:
                    </Typography>
                    <div style={{ marginLeft: 'auto' }}>
                        <Typography variant="h5" color="textSecondary">
                            {!open ? <UpOutlined /> : <DownOutlined />}
                        </Typography>
                       
                    </div>
                </Box>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ width: '100%', mt: 0 }}>
                <Grid container>
                    <Grid item xs={12} md={12} lg={8} sx={{ mt: 1.8 }}>
                        <Typography variant="h6" color="textSecondary">
                            <p style={padding} />
                            Від 1 bar до 1.9 bar:&nbsp;&nbsp;
                            <Pressure num={1.1} title={'стартовий'} />
                            <p style={padding} />
                            Від 2 bar до 3.9 bar: &nbsp;&nbsp;
                            <Pressure num={3} title={'нормальний'} />
                            <p style={padding} />
                            Від 4 bar до 5.9 bar: &nbsp;&nbsp;
                            <Pressure num={5} title={'підвищений'} />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} sx={{ mt: 1.8 }}>
                        <Typography variant="h6" color="textSecondary" sx={{ pt: 0 }}>
                            <p style={padding} />
                            Нижче 1 bar: &nbsp;&nbsp;
                            <Pressure num={0.5} title={'занижений'} />
                            <p style={padding} />
                            Вище 6 bar: &nbsp;&nbsp;
                            <Pressure num={6} title={'не в нормі'} />
                            <p style={padding} />
                            Вище 7 bar: &nbsp;&nbsp;
                            <Pressure num={10} title={'критичний'} />
                        </Typography>
                    </Grid>
                </Grid>
            </Collapse>
        </>
    );
};

export default PressureList;

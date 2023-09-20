import { Grid, Typography } from '@mui/material';
import Pressure from './Pressure';

const PressureList = () => {
    const padding = {
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
            <Grid item xs={12} md={12} lg={4} sx={{ mt: { lg: 4.5 } }}>
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
        </>
    );
};

export default PressureList;

// material-ui
import { Grid, Typography, Button, Stack, Box, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
// project import
import MainCard from '@components/MainCard';
import WelcomeImage from '@assets/images/analytics/reader.svg';
import React from 'react';
// ==============================|| ANALYTICS - WELCOME ||============================== //

const WelcomeBanner = () => {
  const theme = useTheme();
  const { userData } = useSelector((state) => state.user);
  return (
    <MainCard
      border={false}
      sx={{
        background:
          theme.direction === 'rtl'
            ? `linear-gradient(60.38deg, ${theme.palette.primary.lighter} 114%, ${theme.palette.primary.light} 34.42%, ${theme.palette.primary.main} 60.95%, ${theme.palette.primary.dark} 84.83%, ${theme.palette.primary.darker} 104.37%)`
            : `linear-gradient(250.38deg, ${theme.palette.primary.lighter} 2.39%, ${theme.palette.primary.light} 34.42%, ${theme.palette.primary.main} 60.95%, ${theme.palette.primary.dark} 84.83%, ${theme.palette.primary.darker} 104.37%)`
      }}
    >
      <Grid container>
        <Grid item md={6} sm={6} xs={12}>
          <Stack spacing={2} sx={{ padding: 3.4 }}>
            <Typography variant="h2" color={theme.palette.background.paper}>
              Вітаємо, {`${userData?.first_name} ${userData?.last_name}`}!
            </Typography>
            <Typography variant="h6" color={theme.palette.background.paper}>
              Всі об&apos;єкти в нормі
            </Typography>
          </Stack>
        </Grid>
        <Grid item sm={6} xs={12} sx={{ display: { xs: 'none', sm: 'initial' } }}>
          <Stack sx={{ position: 'relative', pr: { sm: 3, md: 8 } }} justifyContent="center" alignItems="flex-end">
            <CardMedia sx={{ width: 'inherit' }} component="img" src={WelcomeImage} alt="Welcome" />
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default WelcomeBanner;

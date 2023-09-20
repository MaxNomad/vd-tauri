// material-ui
import React from 'react';
import {
    useMediaQuery,
    Chip,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    Stack,
    Typography
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import MainCard from '@components/MainCard';
import Avatar from '@components/@extended/Avatar';

// assets
import { AimOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const TabProfile = () => {
    const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const theme = useTheme();
    const { userData } = useSelector((state) => state.user);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={5} md={4} xl={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MainCard>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack direction="row" justifyContent="flex-end">
                                        <Chip
                                            label={userData?.wp_user_level === 10 ? 'Admin' : 'Member'}
                                            size="small"
                                            color={userData?.wp_user_level === 10 ? 'warning' : 'primary'}
                                        />
                                    </Stack>
                                    <Stack spacing={2.5} alignItems="center">
                                        <Avatar
                                            alt={userData?.user_login}
                                            sx={{ width: 128, height: 128 }}
                                            src={userData?.wp_user_avatars}
                                        />

                                        <Stack spacing={0.5} alignItems="center">
                                            <Typography variant="h5">{`${userData?.first_name} ${userData?.last_name}`}</Typography>
                                            <Typography color="secondary">Project Manager</Typography>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" justifyContent="space-around" alignItems="center">
                                        <Stack spacing={0.5} alignItems="center">
                                            <Typography variant="h5">
                                                {userData?.wp_user_level ?? 0}{' '}
                                                <span style={{ color: theme.palette.warning.main, fontSize: 10 }}>LvL</span>
                                            </Typography>
                                            <Typography color="secondary">Рівень доступу</Typography>
                                        </Stack>
                                        <Divider orientation="vertical" flexItem />
                                        <Stack spacing={0.5} alignItems="center">
                                            <Typography variant="h5">
                                                {new Date(userData?.user_registered).toLocaleDateString() ?? 'Невідомо'}
                                            </Typography>
                                            <Typography color="secondary">Зареєстрований</Typography>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <List
                                        component="nav"
                                        aria-label="main mailbox folders"
                                        sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}
                                    >
                                        <ListItem>
                                            <ListItemIcon>
                                                <MailOutlined />
                                            </ListItemIcon>
                                            <ListItemSecondaryAction>
                                                <Typography align="right">{userData?.user_email}</Typography>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PhoneOutlined />
                                            </ListItemIcon>
                                            <ListItemSecondaryAction>
                                                <Typography align="right">(+1-876) 8654 239 581</Typography>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <AimOutlined />
                                            </ListItemIcon>
                                            <ListItemSecondaryAction>
                                                <Typography align="right">New York</Typography>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <EnvironmentOutlined />
                                            </ListItemIcon>
                                            <ListItemSecondaryAction>
                                                <Link align="right" href={userData?.user_url} target="_blank">
                                                    {userData?.user_url}
                                                </Link>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={7} md={8} xl={9}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MainCard title="Personal Details">
                            <List sx={{ py: 0 }}>
                                <ListItem divider={!matchDownMD}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={0.5}>
                                                <Typography color="secondary">Full Name</Typography>
                                                <Typography>{`${userData?.first_name} ${userData?.last_name}`}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={0.5}>
                                                <Typography color="secondary">NickName</Typography>
                                                <Typography>{userData?.user_login}</Typography>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem divider={!matchDownMD}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={0.5}>
                                                <Typography color="secondary">Email</Typography>
                                                <Typography>{userData?.user_email}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={0.5}>
                                                <Typography color="secondary">Phone</Typography>
                                                <Typography>
                                                    (+1-876){' '}
                                                    <NumberFormat value={8654239581} displayType="text" type="text" format="#### ### ###" />
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem divider={!matchDownMD}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={0.5}>
                                                <Typography color="secondary">Country</Typography>
                                                <Typography>New York</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={0.5}>
                                                <Typography color="secondary">Zip Code</Typography>
                                                <Typography>956 754</Typography>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Stack spacing={0.5}>
                                        <Typography color="secondary">Address</Typography>
                                        <Typography>Street 110-B Kalians Bag, Dewan, M.P. New York</Typography>
                                    </Stack>
                                </ListItem>
                            </List>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TabProfile;

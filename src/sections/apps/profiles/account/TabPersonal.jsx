import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormLabel, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Avatar from '@components/@extended/Avatar';
import MainCard from '@components/MainCard';
import { facebookColor, linkedInColor, twitterColor } from '@config';

// assets
import { CameraOutlined } from '@ant-design/icons';

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

const TabPersonal = () => {
    const theme = useTheme();
    const [selectedImage, setSelectedImage] = useState(undefined);
    const [avatar, setAvatar] = useState('/assets/images/users/default.png');

    useEffect(() => {
        if (selectedImage) {
            setAvatar(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const [experience, setExperience] = useState('0');

    const handleChange = (event) => {
        setExperience(event.target.value);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <MainCard title="Personal Information">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                                <FormLabel
                                    htmlFor="change-avtar"
                                    sx={{
                                        position: 'relative',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        '&:hover .MuiBox-root': { opacity: 1 },
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Avatar alt="Avatar 1" src={avatar} sx={{ width: 76, height: 76 }} />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Stack spacing={0.5} alignItems="center">
                                            <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '1.5rem' }} />
                                            <Typography sx={{ color: 'secondary.lighter' }} variant="caption">
                                                Upload
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </FormLabel>
                                <TextField
                                    type="file"
                                    id="change-avtar"
                                    placeholder="Outlined"
                                    variant="outlined"
                                    sx={{ display: 'none' }}
                                    onChange={(e) => setSelectedImage(e.target.files?.[0])}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={1.25}>
                                <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                                <TextField fullWidth defaultValue="Anshan" id="personal-first-name" placeholder="First Name" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={1.25}>
                                <InputLabel htmlFor="personal-first-name">Last Name</InputLabel>
                                <TextField fullWidth defaultValue="Handgun" id="personal-first-name" placeholder="Last Name" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={1.25}>
                                <InputLabel htmlFor="personal-location">Country</InputLabel>
                                <TextField fullWidth defaultValue="New York" id="personal-location" placeholder="Location" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={1.25}>
                                <InputLabel htmlFor="personal-zipcode">Zipcode</InputLabel>
                                <TextField fullWidth defaultValue="956754" id="personal-zipcode" placeholder="Zipcode" />
                            </Stack>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MainCard title="Contact Information">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                            <Select defaultValue="1-876">
                                                <MenuItem value="91">+91</MenuItem>
                                                <MenuItem value="1-671">1-671</MenuItem>
                                                <MenuItem value="36">+36</MenuItem>
                                                <MenuItem value="225">(255)</MenuItem>
                                                <MenuItem value="39">+39</MenuItem>
                                                <MenuItem value="1-876">1-876</MenuItem>
                                                <MenuItem value="7">+7</MenuItem>
                                                <MenuItem value="254">(254)</MenuItem>
                                                <MenuItem value="373">(373)</MenuItem>
                                                <MenuItem value="1-664">1-664</MenuItem>
                                                <MenuItem value="95">+95</MenuItem>
                                                <MenuItem value="264">(264)</MenuItem>
                                            </Select>
                                            <NumberFormat
                                                format="+1 (###) ###-####"
                                                mask="_"
                                                fullWidth
                                                customInput={TextField}
                                                placeholder="Phone Number"
                                                defaultValue="8654239581"
                                                onBlur={() => {}}
                                                onChange={() => {}}
                                            />
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                                        <TextField
                                            type="email"
                                            fullWidth
                                            defaultValue="stebin.ben@gmail.com"
                                            id="personal-email"
                                            placeholder="Email Address"
                                            disabled
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="personal-email">Portfolio URL</InputLabel>
                                        <TextField
                                            fullWidth
                                            defaultValue="https://anshan.dh.url"
                                            id="personal-url"
                                            placeholder="Portfolio URL"
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="personal-address">Address</InputLabel>
                                        <TextField
                                            fullWidth
                                            defaultValue="Street 110-B Kalians Bag, Dewan, M.P. New York"
                                            id="personal-address"
                                            placeholder="Address"
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                    <Button variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button variant="contained">Update Profile</Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default TabPersonal;

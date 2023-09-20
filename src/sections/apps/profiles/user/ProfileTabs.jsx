import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// next
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, FormLabel, Grid, TextField, Menu, MenuItem, Stack, Typography } from '@mui/material';

// project import
import MainCard from '@components/MainCard';
import Avatar from '@components/@extended/Avatar';
import IconButton from '@components/@extended/IconButton';
import ProfileTab from './ProfileTab';
import { facebookColor, linkedInColor, twitterColor } from '@config';

// assets
import { FacebookFilled, LinkedinFilled, MoreOutlined, TwitterSquareFilled, CameraOutlined } from '@ant-design/icons';

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = () => {
    const theme = useTheme();

    const [selectedImage, setSelectedImage] = useState(undefined);
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (selectedImage) {
            setAvatar(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid item xs={12}>
            <ProfileTab />
        </Grid>
    );
};

ProfileTabs.propTypes = {
    focusInput: PropTypes.func
};

export default ProfileTabs;

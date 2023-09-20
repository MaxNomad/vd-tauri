import { ToastContainer, Flip } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
// ==============================|| OVERRIDES - Toast ||============================== //
import React from 'react';

export default function ToastInit() {
    const theme = useTheme();
    return (
        <ToastContainer limit={2} transition={Flip} theme={theme?.palette?.mode} position={"bottom-center"} autoClose={1500}/>
    )
  }
  
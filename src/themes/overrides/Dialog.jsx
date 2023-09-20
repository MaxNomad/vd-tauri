// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - DIALOG ||============================== //

export default function Dialog(theme) {
    return {
        MuiDialog: {
            styleOverrides: {
                root: {
                    '& .MuiBackdrop-root': {
                        backgroundColor: alpha('#000', 0.7),
                        backgroundImage: 'linear-gradient(rgb(255 255 255 / 0%), rgb(255 255 255 / 0%))'
                    },
                    '& .MuiDialog-paper': {
                        backgroundColor: theme.palette.grey[100],
                        backgroundImage: 'linear-gradient(rgb(255 255 255 / 0%), rgb(255 255 255 / 0%))'
                    }
                }
            }
        }
    };
}

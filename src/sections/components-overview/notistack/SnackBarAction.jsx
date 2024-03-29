// material-ul
import { Button } from '@mui/material';

// third-path
import { useSnackbar } from 'notistack';

// project import
import toast from '@utils/ToastNotistack';
import MainCard from '@components/MainCard';

// ==============================|| NOTISTACK - ACTION BUTTONS ||============================== //

export default function SnackBarAction() {
    const { closeSnackbar } = useSnackbar();
    const actionTask = (snackbarId) => (
        <>
            <Button
                variant="text"
                onClick={() => {
                    alert(`I belong to snackbar with id ${snackbarId}`);
                }}
            >
                Undo
            </Button>
            <Button variant="text" onClick={() => closeSnackbar(snackbarId)}>
                Dismiss
            </Button>
        </>
    );

    return (
        <MainCard title="With Action">
            <Button
                variant="contained"
                fullWidth
                sx={{ marginBlockStart: 2 }}
                onClick={() => toast('Your notification here', { action: (key) => actionTask(key) })}
            >
                Show Snackbar
            </Button>
        </MainCard>
    );
}

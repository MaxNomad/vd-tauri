import React, { useContext, useState, useEffect } from 'react';
import Google from '@assets/images/icons/google.svg';
import { Turnstile } from '@marsidev/react-turnstile';
// material-ui
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    Box,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LinearProgress from '@mui/material/LinearProgress';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '@components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AuthContext from '../context/AuthContext';
import { toastAlert, toastError, toastSuccess, toastWarn } from '@pages/components-overview/toasts';
import { useSelector } from 'react-redux';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { useTheme } from '@mui/material/styles';
import { isTauri } from '@utils/Tauri';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const [checked, setChecked] = useState(false);
    const { error, loading } = useSelector((state) => state.auth);
    const data = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState(null);
    const [enableForm, setEnableForm] = useState(isTauri);
    const theme = useTheme();
    const ref = React.useRef();
    useEffect(() => {
        setTimeout(() => {
            if (status === 'solved') {
                setTimeout(() => setEnableForm(true), 700);
            }
        }, 400);
    }, [status]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { loginContext, loginContextGoogle } = useContext(AuthContext);
    const loginSubmit = async (values) => {
        await loginContext(values);
    };

    const googleHandler = useGoogleLogin({
        onSuccess: (tokenResponse) => loginContextGoogle({ token: tokenResponse.access_token }),
        flow: 'implicit',
        onError: () => toastError('Google auth failed')
    });

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null,
                    persist: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        await loginSubmit(values);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors(err);
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {enableForm ? (
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Електронна адреса</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            value={values.email}
                                            name="email"
                                            disabled={isSubmitting || loading}
                                            onChange={handleChange}
                                            placeholder="Введіть електронну адресу"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-login">Пароль</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            id="-password-login"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            name="password"
                                            onChange={handleChange}
                                            disabled={isSubmitting || loading}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            placeholder="Введіть пароль"
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sx={{ mt: -1 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={checked}
                                                    disabled={isSubmitting || loading}
                                                    onChange={(event) => setChecked(event.target.checked)}
                                                    name="checked"
                                                    color="primary"
                                                    size="small"
                                                />
                                            }
                                            label={<Typography variant="h6">Залишатись у системі</Typography>}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <LoadingButton
                                            disableElevation
                                            loading={isSubmitting || loading}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Вхід
                                        </LoadingButton>
                                    </AnimateButton>
                                </Grid>
                                {!isTauri ? (
                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <LoadingButton
                                                variant="outlined"
                                                color="secondary"
                                                size="large"
                                                fullWidth
                                                disabled={isSubmitting || loading}
                                                onClick={() => googleHandler()}
                                            >
                                                <img src={Google} alt="Google" /> &nbsp;Google
                                            </LoadingButton>
                                        </AnimateButton>
                                    </Grid>
                                ) : null}
                            </Grid>
                        ) : (
                            <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center">
                                <Grid item xs={12} sx={{ mt: 3, mb: 4.2 }}>
                                    <Typography variant="h6" color="secondary">
                                        Перевірка браузера та клієнта
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 1, mb: 2, width: '100%' }}>
                                    <LinearProgress />
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2, mb: 4 }}>
                                    <Turnstile
                                        siteKey="0x4AAAAAAAFqQ6v1_VQczuvY"
                                        options={{
                                            action: 'submit-form',
                                            theme: theme.palette.mode,
                                            language: 'en'
                                        }}
                                        ref={ref}
                                        scriptOptions={{
                                            appendTo: 'body'
                                        }}
                                        onError={() => {
                                            setStatus('error');
                                            toastError('Captcha failed');
                                        }}
                                        onExpire={() => {
                                            setStatus('expired');
                                            toastWarn('Captcha expired');
                                            ref.current?.reset();
                                        }}
                                        onSuccess={() => {
                                            setStatus('solved');
                                            toastSuccess('Browser check completed');
                                            setTimeout(() => ref.current?.remove(), 1500);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                                    <Typography variant="h6" color="secondary">
                                        Powered by <span style={{ color: '#f59926' }}>CloudFlare</span>
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;

// material-ui

// ==============================|| OVERRIDES - TAB ||============================== //

export default function Scroll(theme) {
    return {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: `${theme.palette.secondary.A100} ${theme.palette.secondary.A200}`,
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: theme.palette.secondary.A100,
                        width: '0.5em',
                        height: '0.5em',
                        transition: 'color .3s ease'
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.A200 : theme.palette.secondary.main,
                        minHeight: 24,
                        transition: 'color .3s ease'
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.A200 : theme.palette.secondary.main
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.A200 : theme.palette.secondary.main
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.A200 : theme.palette.secondary.main
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.A200 : theme.palette.secondary.main
                    }
                }
            }
        }
    };
}

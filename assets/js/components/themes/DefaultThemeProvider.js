import React from 'react'
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core'
import { amber, lightGreen } from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
     type: 'dark',
     primary: {
         main: amber['900']
     }
    }
});

export default function DefaultThemeProvider(props) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    )
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../../assets/logo.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: '7%',
        boxShadow: 'none'
        // width: '70%'
    },
    logo: {
        marginLeft: '7vw'
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar>
                <img className={classes.logo} src={Logo} alt="Logo" />
            </Toolbar>
        </AppBar>
    );
}

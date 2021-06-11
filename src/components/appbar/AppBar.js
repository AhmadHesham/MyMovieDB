import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Button, InputAdornment } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Logo from '../../assets/logo.svg'
import Search from '../../assets/search.svg'
import {signout} from '../../actions/AuthActions'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: '5vw',
        boxShadow: 'none'
    },
    logo: {
        marginLeft: '7vw'
    },
    search: {
        color: 'white',
        backgroundColor: '#4d504d',
        borderRadius: 20,
        width: '30vw'
    },
    searchProps: {
        color: 'white',
        borderRadius: 20
    },
    userProps: {
        display: 'flex',
        flexGrow: 2,
        flexDirection: 'row',
    },
    divider: {
        backgroundColor: '#3d403d',
        width: '98vw',
        marginTop: '1vw'
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        flexGrow: 1
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    btn: {
        color: 'white',
        textTransform: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const isLogged = useSelector(state => state.isLogged);
    const userInfo = useSelector(state => state.userInfo);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(signout(history));
    }

    const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar style={{ display: 'flex', marginTop: '1vw' }}>
                <div style={{ flexGrow: 1 }}>
                    <img className={classes.logo} src={Logo} alt="Logo" />
                </div>
                {isLogged ?
                    <div className={classes.userProps}>
                        <div className={classes.searchContainer}>
                            <TextField InputProps={{
                                className: classes.searchProps,
                                endAdornment: <InputAdornment> <img src={Search} alt="search icon" /> </InputAdornment>
                            }}
                                variant="outlined" className={classes.search} placeholder="Search for a movie...">
                            </TextField>
                        </div>
                        <div className={classes.avatarContainer}>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.btn}>
                                <Avatar style={{ marginRight: '0.5vw' }}>{userInfo.username.charAt(0)}</Avatar>
                                {userInfo.username}
                                {Boolean(anchorEl) ? <ExpandLess /> : <ExpandMore />}
                            </Button>
                            <Menu
                                id="simple-menu"
                                keepMounted
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                style={{marginTop: '3vw', marginLeft: '5vw'}}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    : ''}
            </Toolbar>
            {isLogged ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Divider className={classes.divider} />
            </div> : ''}
        </AppBar>
    );
}

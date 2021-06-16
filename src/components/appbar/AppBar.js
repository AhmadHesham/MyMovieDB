import React from 'react';
import { useHistory } from 'react-router';
import debounce from 'lodash.debounce'
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
import axios from 'axios'
import Logo from '../../assets/logo.svg'
import Search from '../../assets/search.svg'
import { signout } from '../../actions/AuthActions'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        height: '5vw',
        boxShadow: 'none'
    },
    rootLoggedOut: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: '5vw',
        boxShadow: 'none'
    },
    toolbarLoggedIn: {
        position:'relative', 
        display: 'flex', 
        marginTop: '1vw', 
        flexDirection: 'column', 
        backgroundColor: 'rgba(0, 0, 0, 1)',
        justifyContent: 'center'
    },
    toolbarLoggedOut: {
        position:'relative', 
        display: 'flex', 
        marginTop: '1vw', 
        flexDirection: 'column', 
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'center'
    },
    logo: {
        marginLeft: '7vw',
        cursor: 'pointer',
        // width: '7vw',
        // minWidth: '3vw'
        minWidth: '5vw',
        minHeight: '2.5vw'
    },
    search: {
        color: 'white',
        backgroundColor: '#4d504d',
        borderRadius: 20,
        width: '30vw'
    },
    searchProps: {
        color: 'white',
        borderRadius: 20,
        minHeight: '2vw'
    },
    userProps: {
        display: 'flex',
        flexGrow: 2,
        flexDirection: 'row',
    },
    divider: {
        backgroundColor: '#3d403d',
        width: '98vw',
        // marginTop: '1vw',
        position: 'absolute',
        bottom: 0
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
    const apiKey = '6355f15310ac756b161ac38dda6299f7';

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

    const handleSearch = (event) => {
        if(event.target.value === ''){
            history.push('/home');
        }
        else{
            axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${event.target.value}`
            })
            .then(res => {
                // console.log(res);
                history.push(`/search?q=${event.target.value}`, res.data);
            })
            .catch(err => {
                // console.log(err);
            })
        }
    }

    return (
        <AppBar position="fixed" className={isLogged ? classes.root : classes.rootLoggedOut}>
            <Toolbar className={isLogged ? classes.toolbarLoggedIn : classes.toolbarLoggedOut}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '1vw' }}>
                    <div style={{ flexGrow: 1 }}>
                        <img onClick={() => history.push('/home')} className={classes.logo} src={Logo} alt="Logo" />
                    </div>
                    {isLogged ?
                        <div className={classes.userProps}>
                            <div className={classes.searchContainer}>
                                <TextField InputProps={{
                                    className: classes.searchProps,
                                    endAdornment: <InputAdornment> <img src={Search} alt="search icon" /> </InputAdornment>
                                }}
                                    variant="outlined" className={classes.search} placeholder="Search for a movie..." onChange={debounce(handleSearch, 1000)}>
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
                                    style={{ marginTop: '3vw', marginLeft: '5vw' }}
                                >
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </div>
                        : ''}
                </div>
                {isLogged ? 
                    <Divider className={classes.divider} /> : ''}
            </Toolbar>
        </AppBar>
    );
}

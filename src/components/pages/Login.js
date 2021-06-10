import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FilmReel from '../../assets/login-shape.svg';
import {signin} from '../../actions/AuthActions';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    root: {
        height: '100vh',
        backgroundColor: 'black'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'right',
        width: '30%',
        height: '100%',
    },
    form: {
        flexDirection: 'column',
        width: '70%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        color: 'white',
        width: '30vw',
        fontSize: 25
    },
    password: {
        color: 'white',
        width: '30vw',
        fontSize: 25
    },
    btn: {
        borderColor: 'orange',
        color: 'white',
        width: '10vw',
        textTransform: 'none',
        fontSize: 20
    }
});

export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [state, setState] = React.useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(signin(state, history));
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.form}>
                    <TextField name="username" style={{ marginBottom: '1vw' }} InputProps={{ className: classes.username }} placeholder="Username" onChange={handleChange} />
                    <TextField name="password" style={{ marginBottom: '1vw' }} inputProps={{ className: classes.password }} type="password" placeholder="Password" onChange={handleChange} />
                    <Button className={classes.btn} variant="outlined" onClick={handleLogin}>Log In</Button>
                </div>
                <div className={classes.imageContainer}>
                    <img style={{ height: '100%', position: 'absolute', right: 0 }} src={FilmReel} alt="Film Reel" />
                </div>
            </div>
        </div>
    )
};

import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions'
import TrailerModal from '../Modals/TrailerModal';
import Rating from '@material-ui/lab/Rating';
import HeartIcon from '../../assets/heart.svg'
import { CardMedia } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import {addToFavorites} from '../../actions/UserActions'

const useStyles = makeStyles({
    mediaContainer: {
        height: '80%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flexDirection: 'column'
    },
    desc: {
        color: 'white',
        marginLeft: '0.5vw',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '7vw'
    }
})

export default function Poster(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(true);
    const [src, setSrc] = React.useState('');
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleMouseEnter = (event) => {
        setHidden(false);
    }

    const handleMouseLeave = (event) => {
        setHidden(true);
    }

    const handleAddFavorites = () => {
        dispatch(addToFavorites(props.movie.title));
    }

    React.useEffect(() => {
        const imageLoader = new Image();
        imageLoader.src = `https://image.tmdb.org/t/p/original${props.movie.poster_path}`;
        imageLoader.onload = () => {
            setSrc(`https://image.tmdb.org/t/p/original${props.movie.poster_path}`);
        }
    })

    return (
        <Card
            id={`poster${props.index}`}
            style={{
                backgroundColor:
                    'black', width: '9vw',
                backgroundImage: `url(${src || 'https://upload.wikimedia.org/wikipedia/commons/8/86/Solid_grey.svg'})`,
                marginLeft: (props.index && props.search === 0 ? 0 : '1vw'), height: '13vw', backgroundSize: '100% 100%', backgroundPosition: 'center', cursor: 'pointer'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {hidden ? '' : <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <img onClick={handleAddFavorites} style={{cursor: 'pointer'}} src={HeartIcon} alt="Favorite Button"></img>
            </CardActions>}
            <div onClick={handleOpen} className={classes.mediaContainer}>
                {hidden ? '' : <div style={{width: '7vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Rating style={{ marginLeft: '0.5vw' }} readOnly value={props.movie.vote_average / 2} />
                    <Typography gutterBottom className={classes.desc} variant="caption">{props.movie.overview}</Typography>
                </div>}
            </div>
            <TrailerModal movieID={props.movie.id} open={open} handleClose={handleClose} />
        </Card>
    )
}

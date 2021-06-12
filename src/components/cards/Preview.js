import React from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Typography } from '@material-ui/core';
import TrailerModal from '../Modals/TrailerModal'

export default function Poster(props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Card>
            <CardMedia style={{
                height: '15vw', width: '70vw',
                padding: 0,
                backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movie.backdrop_path})`,
                backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', cursor: 'pointer'
            }} onClick={handleOpen}>
                <div style={{marginLeft: '3vw'}}>
                    <Typography variant="h6" style={{color: 'white'}}>Popular</Typography>
                    <Typography variant="h4" style={{color: 'white', wordWrap: 'break-word', width: '35vw'}}>{props.movie.title}</Typography>
                    <Button onClick={handleOpen} style={{ backgroundColor: 'rgba(0, 0, 0, 0)', color: 'orange', textTransform: 'none', fontWeight: 'bold'}}>
                        <PlayCircleOutlineIcon />
                        View Trailer
                    </Button>
                </div>
            </CardMedia>
            <TrailerModal open={open} handleClose={handleClose} movieTitle={props.movie.title} movieID={props.movie.id}/>
        </Card>
    )
}

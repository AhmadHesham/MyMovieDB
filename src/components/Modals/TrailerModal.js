import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { DialogContent } from '@material-ui/core';

export default function TrailerModal(props) {
    const [videoKey, setVideoKey] = React.useState('');
    const [load, setLoad] = React.useState(false);
    const apiKey = "6355f15310ac756b161ac38dda6299f7";
    const language = "en-US";

    React.useEffect(() => {
        const loadVideoKey = async () => {
            await axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${props.movieID}/videos?api_key=${apiKey}&language=${language}`
            })
                .then(res => {
                    setVideoKey(res.data.results[0]["key"])
                    setLoad(true);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        if (props.open) {
            loadVideoKey();
        }
    })

    return (
        <Dialog maxWidth="lg" onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <DialogContent style={{padding: 0, overflow: 'hidden'}}>
                {load ? <ReactPlayer playing controls width="50vw" height="30vw" url={`https://youtube.com/watch?v=${videoKey}`} /> : ''}
            </DialogContent>
        </Dialog>
    )
}

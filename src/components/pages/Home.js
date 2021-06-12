import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios'
import Preview from '../cards/Preview';
import Poster from '../cards/Poster'

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        overflowY: 'scroll'
    },
    carouselContainer: {
        height: '40%',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        // backgroundColor: 'blue'
    }
});

export default function Home() {
    const classes = useStyles();
    const [movies, setMovies] = React.useState([]);
    const [imageHeight, setImageHeight] = React.useState();
    const apiKey = '6355f15310ac756b161ac38dda6299f7';

    const carouselObserver = new ResizeObserver((entries) => {
        const rect = entries[0].contentRect;
        setImageHeight(rect.height);
        console.log(rect.height)
    });

    React.useEffect(() => {
        const loadMovies = async () => {
            axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
            }).then(res => {
                console.log(res.data.results)
                setMovies(res.data.results);
            }).catch(err => {
                console.log(err);
            })
        }
        loadMovies();
        carouselObserver.observe(document.querySelector("#carouselContainer"));
    }, []);

    return (
        <div className={classes.root}>
            <div style={{ width: '100%', height: '92vw', marginTop: '8vw' }}>
                <div id="carouselContainer" className={classes.carouselContainer}>
                    <Carousel>
                        {
                            movies.map((movie, key) => <Preview key={key} movie={movie} height={imageHeight} />)
                        }
                    </Carousel>
                </div>
                <div style={{ height: '50%', width: '100%' }}>
                </div>
            </div>
        </div>
    )
}

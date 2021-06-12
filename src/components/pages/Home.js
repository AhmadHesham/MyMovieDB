import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios'
import Preview from '../cards/Preview';
import Poster from '../cards/Poster';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // overflowY: 'scroll'
    },
    carouselContainer: {
        height: '40%',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: '10vw'
        // backgroundColor: 'blue'
    },
    listContainer: {
        height: '60%',
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2vw'
    },
    pagination: {
        '& .MuiPaginationItem-root': {
            color: 'white'
        },
        '& .Mui-selected': {
            backgroundColor: 'grey'
        }
    }
});

export default function Home() {
    const classes = useStyles();
    const [movies, setMovies] = React.useState([]);
    const [topRated, setTopRated] = React.useState([]);
    const [pageCounter1, setPageCounter1] = React.useState(0);
    const [pageCounter2, setPageCounter2] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    // const [imageHeight, setImageHeight] = React.useState();
    const apiKey = '6355f15310ac756b161ac38dda6299f7';

    // const carouselObserver = new ResizeObserver((entries) => {
    //     const rect = entries[0].contentRect;
    //     setImageHeight(rect.height);
    //     console.log(rect.height)
    // });

    const handlePageCounter1 = (event) => {
        setPageCounter1((pageCounter1 + 1) % (movies.length / 10));
    }
    const handlePageCounter2 = (event) => {
        setPageCounter2((pageCounter2 + 1) % (topRated.length / 10));
    }

    React.useEffect(() => {
        const loadMoviesPopular = async () => {
            axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
            }).then(res => {
                setMovies(res.data.results);

            }).catch(err => {
                console.log(err);
            })
        }
        const loadMoviesTop = async () => {
            axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
            }).then(res => {
                console.log(res)
                setTopRated(res.data.results);

            }).catch(err => {
                console.log(err);
            })
        }

        loadMoviesTop();
        loadMoviesPopular();
        // carouselObserver.observe(document.querySelector("#carouselContainer"));
    }, []);

    return (
        <div className={classes.root}>
            <div style={{ width: '100%', height: '92vw', marginTop: '8vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'black'}}>
                <div id="carouselContainer" className={classes.carouselContainer}>
                    <Carousel>
                        {
                            movies.map((movie, key) => <Preview key={key} movie={movie} />)
                        }
                    </Carousel>
                </div>
                <div className={classes.listContainer}>
                    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                        <Typography style={{ color: 'white', fontWeight: 'bold', position: 'absolute', left: 0, fontSize: '1.5vw' }}>Most Popular</Typography>
                        <Pagination onChange={handlePageCounter1} variant="outlined" shape="rounded" classes={{ ul: classes.pagination }} count={movies.length / 10} style={{ position: 'absolute', right: 0 }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3vw', height: '13vw' }}>
                        {
                            movies.slice(pageCounter1 * 10, (pageCounter1 + 1) * 10).map((movie, index) => <Poster index={index} movie={movie} setLoading={setLoading} />)
                        }
                    </div>
                </div>

                <div className={classes.listContainer}>
                    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                        <Typography style={{ color: 'white', fontWeight: 'bold', position: 'absolute', left: 0, fontSize: '1.5vw' }}>Top Rated</Typography>
                        <Pagination onChange={handlePageCounter2} variant="outlined" shape="rounded" classes={{ ul: classes.pagination }} count={movies.length / 10} style={{ position: 'absolute', right: 0 }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3vw', height: '13vw' }}>
                        {
                            topRated.slice(pageCounter2 * 10, (pageCounter2 + 1) * 10).map((movie, index) => <Poster index={index} movie={movie} setLoading={setLoading} />)
                        }
                    </div>
                </div>
                <div style={{marginTop: '3vw'}}></div>
            </div>
        </div>
    )
}

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
        minHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    carouselContainer: {
        height: '20%',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: '7vw'
        // backgroundColor: 'blue'
    },
    listContainer: {
        height: '20%',
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
        },
    }
});

export default function Home() {
    const classes = useStyles();
    const [movies, setMovies] = React.useState([]);
    const [topRated, setTopRated] = React.useState([]);
    const [pageCounter1, setPageCounter1] = React.useState(0);
    const [pageCounter2, setPageCounter2] = React.useState(0);
    const apiKey = '6355f15310ac756b161ac38dda6299f7';

    const handlePageCounter1 = (event, pageNumber) => {
        setPageCounter1(pageNumber - 1);
    }
    const handlePageCounter2 = (event, pageNumber) => {
        setPageCounter2(pageNumber - 1);
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
    }, []);

    return (
        <div className={classes.root}>
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
                        movies.slice(pageCounter1 * 10, (pageCounter1 + 1) * 10).map((movie, index) => <Poster key={index} index={index} movie={movie} />)
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
                        topRated.slice(pageCounter2 * 10, (pageCounter2 + 1) * 10).map((movie, index) => <Poster key={index} index={index} movie={movie}/>)
                    }
                </div>
            </div>
            <div style={{ marginTop: '3vw' }}></div>
        </div>
    )
}

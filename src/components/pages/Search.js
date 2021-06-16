import React from 'react'
import { useLocation } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Poster from '../cards/Poster';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll'
    },
    rowContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '2vw'
    },
    pagination: {
        '& .MuiPaginationItem-root': {
            color: 'white'
        },
        '& .Mui-selected': {
            backgroundColor: 'grey'
        },
        "& > p:nth-of-type(2)": {
            fontSize: "1.25rem",
            color: "red",
            fontWeight: 600
          }
    },
    loading: {
        color: 'orange'
    }
})

export default function Search() {
    const classes = useStyles();
    const location = useLocation();
    const [results, setResults] = React.useState([]);
    const apiKey = "6355f15310ac756b161ac38dda6299f7";
    
    const handlePagination = (event, pageNumber) => {
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${pageNumber}&query=${location.search.split("=")[1]}`
        })
        .then(res => {
            setResults(res.data.results);
        })
        .catch(err => {
            console.log(err);
        })
    }

    React.useEffect(() => {
        setResults(location.state.results);
    }, [location.state.results])

    return (
        <div className={classes.root}>
            <div style={{ marginTop: '7vw', display: 'flex', flexDirection: 'column' }}>
                {
                    Array.from(Array(Math.floor(results.length / 6)).keys()).map((elem, index) => {
                        return (
                            <div key={index} className={classes.rowContainer}>
                                {
                                    results.slice(elem * 6, (elem + 1) * 6).map((movie, index) =>
                                        <Poster key={index} movie={movie} index={index} search={true} />)
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div style={{marginBottom: '1vw'}}>
                <Pagination variant="outlined" shape="rounded" className={classes.pagination} count={location.state.total_pages} onChange={handlePagination} />
            </div>
        </div>
    )
}

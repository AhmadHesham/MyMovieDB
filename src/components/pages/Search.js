import React from 'react'
import { useLocation, useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
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
        }
    }
})

export default function Search() {
    const classes = useStyles();
    const location = useLocation();
    const [loading, setLoading] = React.useState(true);

    const handleLoading = (value) => {
        setLoading(value);
    }

    return (
        <div className={classes.root}>
            <div style={{ marginTop: '7vw', display: 'flex', flexDirection: 'column' }}>
                {
                    Array.from(Array(Math.floor(location.state.length / 5)).keys()).map((elem, index) => {
                        return (
                            <div key={index} className={classes.rowContainer}>
                                {
                                    location.state.slice(elem * 5, (elem + 1) * 5).map((movie, index) =>
                                        <Poster key={index} movie={movie} index={index} setLoading={handleLoading} search={true} />)
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div style={{marginBottom: '1vw'}}>
                <Pagination className={classes.pagination} count={10} />
            </div>
        </div>
    )
}

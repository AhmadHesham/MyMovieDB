import React from 'react'
import { useLocation, useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Poster from '../cards/Poster';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll'
    },
    rowContainer: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column', 
        marginBottom: '3vw'
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
            <div style={{marginTop: '15vw', display: 'flex', flexDirection: 'row'}}>
                {
                    Array.from(Array(location.state.length / 4).keys()).map((elem, index) => {
                        return (
                            <div key={index} className={classes.rowContainer}>
                                {
                                    location.state.slice(elem * 4, (elem + 1) * 4).map((movie, index) =>
                                        <Poster key={index} movie={movie} index={index} setLoading={handleLoading} />)
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

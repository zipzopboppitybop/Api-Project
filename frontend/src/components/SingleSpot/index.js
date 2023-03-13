import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import { getOneSpot } from '../../store/spots';
import { useEffect } from 'react';


const SingleSpot = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector(state => state.spots[id]);

    useEffect(() => {
        dispatch(getOneSpot(id));
    }, [dispatch]);

    if (!spot) return null;
    return (
        <div className='singleSpot'>
            <h1>{spot.name}</h1>

        </div>
    );
};

export default SingleSpot;

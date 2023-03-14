import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import { getOneSpot } from '../../store/spots';
import { useEffect } from 'react';


const SingleSpot = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);

    useEffect(() => {
        dispatch(getOneSpot(id));
    }, [dispatch]);

    if (!spot) return null;
    return (
        <div className='singleSpot'>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country} </h3>

            <div className='image-container'>
                <img className='first-image' src={spot.SpotImages[0].url} />
            </div>

        </div>
    );
};

export default SingleSpot;

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
                <ul className='grid'>
                    {spot.SpotImages?.map(({ url, id }) => (
                        <li key={id}>
                            <img src={url} ></img>
                        </li>
                    ))}
                </ul>

            </div>

        </div>
    );
};

export default SingleSpot;

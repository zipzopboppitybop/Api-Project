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
    console.log("owner: ", spot.Owner)

    const reserve = (e) => {
        e.preventDefault();
        alert('Feature Coming Soon...');
    };

    useEffect(() => {
        dispatch(getOneSpot(id));
    }, [dispatch]);

    if (!spot) return null;
    return (
        <div className='singleSpot'>
            <h1 className='content'>{spot.name}</h1>
            <h3 className='content'>{spot.city}, {spot.state}, {spot.country} </h3>

            <div className='image-container'>
                <ul className='images'>
                    {spot.SpotImages?.map(({ url, id }) => (
                        <li key={id}>
                            <img src={url} ></img>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='flex-container'>
                <h1 className='content'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
                <div className='reserve'>
                    <p className='description'>${spot.price} night </p>
                    <p className='description'>
                        <i className='fas fa-star' />
                        {spot.avgStarRating}  &middot;  {spot.numReviews} reviews
                    </p>
                    <button onClick={reserve} className='reserve-button'>Reserve</button>
                </div>
            </div>
            <p className='content description move-up'>
                {spot.description}
            </p>

            <h1 className='content review-title'><i className='fas fa-star' />
                {spot.avgStarRating} &nbsp; &middot; &nbsp; {spot.numReviews}  reviews</h1>

        </div>
    );
};

export default SingleSpot;

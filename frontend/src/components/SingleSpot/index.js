import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import { useEffect } from 'react';
import { getReviewsSpot } from '../../store/reviews';

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => state.reviews.spot.Reviews)
    const sessionUser = useSelector(state => state.session.user);
    const createReviewClassName = "create-review" + (sessionUser ? "" : " hidden");

    const reserve = (e) => {
        e.preventDefault();
        alert('Feature Coming Soon...');
    };

    useEffect(() => {
        dispatch(getOneSpot(id));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getReviewsSpot(id));
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
                <h1 className='content'>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h1>
                <div className='reserve'>
                    <p className='description'>${spot.price} night </p>
                    <p className='description'>
                        <i className='fas fa-star' />
                        {spot.avgStarRating?.toFixed(2)}  &middot;  {spot.numReviews} reviews
                    </p>
                    <button onClick={reserve} className='reserve-button'>Reserve</button>
                </div>
            </div>
            <p className='content description move-up'>
                {spot.description}
            </p>

            <h1 className='content review-title'><i className='fas fa-star' />
                {spot.avgStarRating?.toFixed(2)} &nbsp; &middot; &nbsp; {spot.numReviews}  reviews
                <button className={createReviewClassName} onClick={reserve} >Post your review</button>
            </h1>

            <ul className='reviews'>
                {reviews?.map(({ review, id, User, createdAt }) => (
                    <li key={id}>
                        <h3>{User.firstName} <br /> {createdAt.slice(0, 10)} <br />  {review}</h3>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default SingleSpot;

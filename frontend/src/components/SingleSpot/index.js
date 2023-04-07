import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import { useEffect } from 'react';
import { getReviewsSpot } from '../../store/reviews';
import ReviewForm from '../ReviewModal';
import ReviewFormModal from '../ReviewModal/ReviewFormModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReview from '../DeleteReviewModal';


const SingleSpot = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot.Reviews)
    const sessionUser = useSelector(state => state.session.user);
    let isLoaded = false;

    useEffect(() => {
        dispatch(getOneSpot(id));
    }, [dispatch]);

    if (spot.SpotImages) isLoaded = true;
    else return null

    return (
        <div className='singleSpot'>
            <h1 className='content content-title'>{spot.name}</h1>
            <h3 className='content'>{spot.city}, {spot.state}, {spot.country} </h3>
            {isLoaded && (
                <div className='image-container'>
                    <ul className='images'>
                        {Object.values(spot.SpotImages)?.map((image) => (
                            <li key={image.id}>
                                <img src={image.url} ></img>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default SingleSpot;

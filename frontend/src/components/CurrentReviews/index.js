import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import DeleteReview from '../DeleteReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import * as reviewActions from '../../store/reviews';


const CurrentReviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.userReviews?.Reviews);
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    let reviewsArr;

    if (!user) history.push('/');

    if (reviews) {
        reviewsArr = Object.values(reviews);
    };


    const hiddenClassName = reviewsArr?.length < 1 ? "white" : "hidden";
    const createhiddenClassName = reviewsArr?.length < 1 ? "create user-title" : "hidden";

    const updateSpot = (e) => {
        e.preventDefault();
        alert("Function Coming Soon");
    }

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
        dispatch(reviewActions.getCurrentUserReviews());
    }, [dispatch, reviewsArr]);

    if (!reviews) return null

    return (
        <div>
            <h1 className='user-reviews-title'>Manage Your Reviews</h1>
            <ul className='user-reviews'>
                {reviewsArr?.map(({ id, review, createdAt, Spot }) => (
                    <li key={id}>
                        <p>{Spot.name}</p>
                        <p>{createdAt.slice(0, 10)}</p>
                        <p>{review}</p>
                        <div className="lol">
                            <p
                                className='end'
                                onClick={updateSpot}>
                                Update

                            </p>
                            <p className='bottom-review'>
                                <OpenModalMenuItem
                                    onClick={(e) => e.preventDefault()}
                                    itemText={"Delete"}
                                    modalComponent={<DeleteReview id={id} />}
                                />
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CurrentReviews;

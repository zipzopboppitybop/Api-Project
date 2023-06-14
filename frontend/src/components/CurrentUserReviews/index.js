import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import * as reviewActions from '../../store/reviews';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ReviewItem from '../ReviewItem';

const CurrentReviews = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.usersReviews);
  const user = useSelector(state => state.session.user);;

  if (!user) history.push('/');

  // const hiddenClassName = spotsArr?.length < 1 ? "white" : "hidden";
  // const createhiddenClassName = spotsArr?.length < 1 ? "create user-title" : "hidden";

  useEffect(() => {
    dispatch(reviewActions.getCurrentUserReviews());
  }, [dispatch]);

  return (
    <div className='current-reviews-list'>
      <h1>Manage Reviews</h1>
      <ul>
        {Object.values(reviews).map(review => (
          <li key={review.id} >
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CurrentReviews;

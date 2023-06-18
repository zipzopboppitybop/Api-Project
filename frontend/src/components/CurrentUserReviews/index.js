import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as reviewActions from '../../store/reviews';
import ReviewItem from '../ReviewItem';

const CurrentReviews = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.usersReviews);
  const user = useSelector(state => state.session.user);;

  if (!user) history.push('/');

  useEffect(() => {
    dispatch(reviewActions.getCurrentUserReviews());
  }, [dispatch]);

  return (
    <div className='current-reviews-list'>
      <h1>Manage Reviews</h1>
      {Object.values(reviews).length > 0 ? (
        <ul>
          {Object.values(reviews).map(review => (
            <li key={review.id} >
              <ReviewItem review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <h1>Start Reviewing Some Spots!</h1>
      )}
    </div>
  )
}

export default CurrentReviews;

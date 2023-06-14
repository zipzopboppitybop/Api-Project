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
  let reviewsArr = [];

  if (reviews) {
    let reviewsObj = Object.values(reviews);

    for (let i = 0; i < reviewsObj.length; i++) {
      let review = reviewsObj[i];

      if (review.userId === user.id) reviewsArr.push(review);
    }
  }

  if (!user) history.push('/');

  useEffect(() => {
    dispatch(reviewActions.getCurrentUserReviews());
  }, [dispatch]);

  return (
    <div className='current-reviews-list'>
      <h1>Manage Reviews</h1>
      <ul>
        {reviewsArr.map(review => (
          <li key={review.id} >
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CurrentReviews;

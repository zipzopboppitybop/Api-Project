import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/reviews';
import * as spotActions from "../../store/spots"

function UpdateReview({ disabled, currentReview }) {
  const user = (useSelector(state => state.session.user))
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [stars, setRating] = useState(currentReview.stars);
  const [activeRating, setActiveRating] = useState(stars);
  const [review, setReview] = useState(currentReview.review);
  let buttonClassName = "review-submit";
  let buttonDisabled = false;

  const vals = { userId: user.id, spotId: currentReview.spotId, review, stars };

  useEffect(() => {
    setActiveRating(stars);
  }, [stars]);

  const onChange = (number) => {
    setRating(parseInt(number));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal();
    await dispatch(reviewActions.editReview({ id: currentReview.id, vals }));
    await dispatch(spotActions.getOneSpot(currentReview.spotId));
    await dispatch(reviewActions.getCurrentUserReviews())
    return await dispatch(reviewActions.getReviewsSpot(currentReview.spotId));
  };

  if (review.length < 10 || stars < 1) buttonClassName = "review-submit disabled"

  if (buttonClassName === "review-submit disabled") buttonDisabled = true;

  const starsIcon = (number) => {
    const props = {};
    if (!disabled) {
      props.onMouseEnter = () => setActiveRating(number);
      props.onMouseLeave = () => setActiveRating(stars);
      props.onClick = () => onChange(number);
    }
    return (
      <div
        key={number}
        className={activeRating >= number ? "filled" : "empty"}
        {...props}
      >
        <i className="fa fa-2x fa-star" />
      </div>
    );
  };

  return (
    <>
      <form className="review-form" onSubmit={handleSubmit}>
        <h1 >Update your Review?</h1>
        <textarea
          className="resize"
          name='description'
          placeholder='Leave your review here...'
          rows='10'
          cols='80'
          required
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map((number) => starsIcon(number))}
          <span className="stars">Stars</span>
        </div>

        <button disabled={buttonDisabled} className={buttonClassName} type="submit">Update Review</button>
      </form>
    </>
  );
}

export default UpdateReview;

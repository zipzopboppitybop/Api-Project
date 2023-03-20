import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/reviews';

function ReviewForm({ disabled }) {
    const user = (useSelector(state => state.session.user))
    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => state.reviews.spot.Reviews)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [rating, setRating] = useState(0);
    const [activeRating, setActiveRating] = useState(rating);
    const [review, setReview] = useState("");
    let buttonClassName = "review-submit";
    let buttonDisabled = false;

    useEffect(() => {
        setActiveRating(rating);
    }, [rating]);

    const onChange = (number) => {
        setRating(parseInt(number));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        closeModal();
        return await dispatch(reviewActions.writeReview(spot.id, user.id, review, rating));
    };

    if (review.length < 10 || rating < 1) buttonClassName = "review-submit disabled"

    if (buttonClassName === "review-submit disabled") buttonDisabled = true;

    const starsIcon = (number) => {
        const props = {};
        if (!disabled) {
            props.onMouseEnter = () => setActiveRating(number);
            props.onMouseLeave = () => setActiveRating(rating);
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
                <h1 >How was your stay?</h1>
                <textarea
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

                <button disabled={buttonDisabled} className={buttonClassName} type="submit">Sumbit Your Review</button>
            </form>
        </>
    );
}

export default ReviewForm;

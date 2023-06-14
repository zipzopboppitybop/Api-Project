import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots"

function DeleteReview({ review }) {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const { closeModal } = useModal();
    const id = review.id

    const handleSubmit = async (e) => {
        e.preventDefault();
        closeModal()
        await dispatch(reviewActions.deleteAReview(id));
        await dispatch(spotActions.getOneSpot(spot.id));
        await dispatch(reviewActions.getCurrentUserReviews())
        return await dispatch(reviewActions.getReviewsSpot(spot.id));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className="delete-header">Confirm Delete</h1>
                <h3 className="delete-header">Are you sure you want to delete this review?</h3>
                <button className="delete-button" type="submit">Yes (Delete Review) </button>
                <button className="dont-delete-button" onClick={closeModal}>No (Keep Review)</button>
            </form>
        </>
    );
}

export default DeleteReview;

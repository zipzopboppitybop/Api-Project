import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAReview } from "../../store/reviews";


function DeleteReview({ id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        closeModal()
        return await dispatch(deleteAReview(id));
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

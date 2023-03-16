import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots"


function DeleteForm({ id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const spot = useSelector(state => state.spots.singleSpot);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal()
        history.push('/spots/current')
        return dispatch(spotActions.deleteSpot(spot.id))
    };

    useEffect(() => {
        dispatch(spotActions.getOneSpot(id));
    }, [dispatch]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className="delete-header">Confirm Delete</h1>
                <h3 className="delete-header">Are you sure you want to remove this spot from the listings?</h3>
                <button type="submit">Yes (Delete Spot) </button>
                <button onClick={closeModal}>No (Keep Spot)</button>
            </form>
        </>
    );
}

export default DeleteForm;

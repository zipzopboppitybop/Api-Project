import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spots"


function DeleteForm({ id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const spot = useSelector(state => state.spots.singleSpot);

    const handleSubmit = async (e) => {
        e.preventDefault();
        closeModal()
        return await dispatch(spotActions.deleteSpot(spot.id))
    };

    useEffect(() => {
        dispatch(spotActions.getOneSpot(id));
    }, [dispatch]);

    return (
        <>
            <form className="delete-form" onSubmit={handleSubmit}>
                <h1 className="delete-header">Confirm Delete</h1>
                <h3 className="delete-header">Are you sure you want to remove this spot from the listings?</h3>
                <button className="delete-button" type="submit">Yes (Delete Spot) </button>
                <button className="dont-delete-button" onClick={closeModal}>No (Keep Spot)</button>
            </form>
        </>
    );
}

export default DeleteForm;

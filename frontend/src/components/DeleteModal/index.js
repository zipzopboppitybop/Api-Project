import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spots"


function DeleteForm({ id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const spot = useSelector(state => state.spots.singleSpot);
    const user = useSelector(state => state)
    console.log(spot)

    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal()
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

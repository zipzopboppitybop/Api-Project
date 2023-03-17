import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spots"


function ReviewForm() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal()
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 >Confirm Delete</h1>
                <button onClick={closeModal}>No (Keep Spot)</button>
            </form>
        </>
    );
}

export default ReviewForm;

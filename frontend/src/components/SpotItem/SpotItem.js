import { NavLink } from "react-router-dom";

const SpotItem = ({ spot }) => {
    return (
        <NavLink title={spot.name} to={`/spots/${spot.id}`}>
            <img className='spot-image' src={`${spot.previewImage}`} />
            <div className='spot-description'>
                <div>{spot.city}, {spot.state}</div>
                <div>
                    <i className='fas fa-star' />
                    {spot.avgRating > 0 ? (Number.parseFloat(spot.avgRating).toFixed(2)) : ("New")}
                </div>
            </div>
            <div className='spot-description little'>
                ${spot.price} night
            </div>
        </NavLink>
    )
}

export default SpotItem;

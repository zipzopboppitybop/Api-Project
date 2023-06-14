import { NavLink } from "react-router-dom";
import DeleteReview from "../DeleteReviewModal";
import UpdateReview from "../UpdateReview";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ReviewItem = ({ review }) => {
  const newDate = new Date(`${review.createdAt}`);

  return (
    <>
      <div className="manage-reviews">
        <NavLink className="black" title={review.Spot.name} href="#" to={`/spots/${review.Spot.id}`}>
          <h2> {review.Spot.name}</h2>

        </NavLink>
        <p className="review-createdAt">
          {monthNames[newDate.getMonth()]} {newDate.getFullYear()}
        </p>
        <p className="review-content">{review.review}</p>
        <div className='update-delete-review'>
          <span>
            <OpenModalMenuItem
              onClick={(e) => e.preventDefault()}
              itemText={"Update"}
              modalComponent={<UpdateReview currentReview={review} />}
            />
          </span>
          <span>
            <OpenModalMenuItem
              onClick={(e) => e.preventDefault()}
              itemText={"Delete"}
              modalComponent={<DeleteReview review={review} />}
            />
          </span>
        </div>
      </div>
    </>

  )
}

export default ReviewItem;

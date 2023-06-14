import { useSelector } from 'react-redux';
import DeleteReview from "../DeleteReviewModal";
import UpdateReview from "../UpdateReview";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const SingleSpotReviewItem = ({ review }) => {
  const sessionUser = useSelector(state => state.session.user)
  const newDate = new Date(`${review.createdAt}`);
  return (
    <>
      <div className="manage-reviews">
        <h3>{review?.User?.firstName}</h3>
        <p className="review-createdAt">
          {monthNames[newDate.getMonth()]} {newDate.getFullYear()}
        </p>
        <p className="review-content">{review.review}</p>
        {sessionUser?.id === review.userId ?
          (
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
          )
          :
          ("")}
      </div>
    </>

  )
}

export default SingleSpotReviewItem;

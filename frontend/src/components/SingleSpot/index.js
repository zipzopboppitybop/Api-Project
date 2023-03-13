import { useParams } from 'react-router-dom';


const SingleSpot = ({ spots }) => {
    const { id } = useParams();
    const singleSpot = spots[id];
    console.log(spots)

    if (!singleSpot) return null;
    return (
        <div className='singleSpot'>
            <h1>{singleSpot?.id}</h1>
            <img
                src={singleSpot?.price}
                alt={singleSpot?.name}
            />
            <p>
                {singleSpot?.description}
            </p>
        </div>
    );
};

export default SingleSpot;

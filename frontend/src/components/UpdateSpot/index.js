import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as spotActions from '../../store/spots'

const UpdateSpot = () => {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const user = useSelector(state => state.session.user);
    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const buttonClassName = isButtonDisabled ? "disabled" : "";
    const { id } = useParams();

    if (!user || user.id !== spot.ownerId) history.push('/');

    const vals = { country, address, city, state, description, name, price }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        return await dispatch(spotActions.editSpot({ id, vals }))
            .then(history.push(`/spots/${spot.id}`))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (res.status === 403) {
                        return setErrors(['Invalid Data'])
                    }
                    if (data && data.errors) setErrors(Object.values(data.errors));
                }
            );
    };

    useEffect(() => {
        dispatch(spotActions.getOneSpot(id));
    }, [country, address, city, state, description, name, price, dispatch]);

    return (
        <div className='spot-form'>
            <h1 className='spot-form-title'>Update Spot</h1>
            <h2>Where's your place located?</h2>
            <h3 className='form-content'>Guests will only get your exact address once they booked a reservation.</h3>

            <form className='form' onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label className='spot-form-label'>
                    <p>Country</p>
                    <input
                        defaultValue={spot.country}
                        className='create-spot-input'
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    <p>Street Address</p>
                    <input
                        defaultValue={spot.address}
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    <p>City</p>
                    <input
                        defaultValue={spot.city}
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    <p>State</p>
                    <input
                        defaultValue={spot.state}
                        type="text"
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label '>
                    <h2 className='line'>Describe your place to guests</h2>
                    <h4 className='form-content'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h4>
                    <textarea
                        defaultValue={spot.description}
                        onChange={(e) => setDescription(e.target.value)}
                        name='description'
                        rows='10'
                        cols='80'
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    <h2 className='line'>Create a title for your spot</h2>
                    <h4 className='form-content'>Catch guest's attention with a spot title that highlights what makes your place special.</h4>
                    <input
                        defaultValue={spot.name}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    <h2 className='line'>Set a base price for your spot</h2>
                    <h4 className='form-content'>Competitive pricing can help your listing stand out and rank higher in search results</h4>
                    <input
                        defaultValue={spot.price}
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <button
                    type='submit'>
                    Update Spot
                </button>

            </form>
        </div>
    )
}

export default UpdateSpot

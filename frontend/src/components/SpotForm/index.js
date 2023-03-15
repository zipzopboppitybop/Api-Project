import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';
import { useHistory } from "react-router-dom";
import * as spotActions from '../../store/spots'

const SpotInput = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [imageTwo, setImageTwo] = useState("");
    const [imageThree, setImageThree] = useState("");
    const [imageFour, setImageFour] = useState("");
    const [imageFive, setImageFive] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(spotActions.createSpot({ country, address, city, state, description, name, price, previewImage, imageTwo, imageThree, imageFour, imageFive }))
            .then(history.push("/"))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (res.status === 403) {
                        return setErrors(['Invalid Credentials Or Password'])
                    }
                    if (data && data.errors) setErrors(Object.values(data.errors));
                }
            );
    };

    return (
        <div className='spot-form'>
            <h1>Create A Spot</h1>
            <h2>Where's your place located?</h2>
            <h3 className='form-content'>Guests will only get your exact address once they booked a reservation.</h3>

            <form className='form' onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label className='spot-form-label'>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    Street Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label '>
                    <h2 className='line'>Describe your place to guests</h2>
                    <h4 className='form-content'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h4>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name='description'
                        placeholder='Description'
                        rows='10'
                        cols='80'
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    <h2 className='line'>Create a title for your spot</h2>
                    <h4 className='form-content'>Catch guest's attention with a spot title that highlights what makes your place special.</h4>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name of your spot"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    <h2 className='line'>Set a base price for your spot</h2>
                    <h4 className='form-content'>Competitive pricing can help your listing stand out and rank higher in search results</h4>
                    <input
                        type="text"
                        value={price}
                        placeholder="$Price per night (USD)"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label className='spot-form-label'>
                    <h2 className='line'>Liven up your spot with photos</h2>
                    <h4 className='form-content'>Submit a link to at least one photo to publish your spot.</h4>
                    <input
                        className='bottom-border'
                        type="text"
                        value={previewImage}
                        placeholder="Preview Image Url"
                        onChange={(e) => setPreviewImage(e.target.value)}
                        required
                    />

                    <input
                        className='bottom-border'
                        type="text"
                        value={imageTwo}
                        placeholder="Image URL"
                        onChange={(e) => setImageTwo(e.target.value)}
                    />
                    <input
                        className='bottom-border'
                        type="text"
                        value={imageThree}
                        placeholder="Image URL"
                        onChange={(e) => setImageThree(e.target.value)}
                    />
                    <input
                        className='bottom-border'
                        type="text"
                        value={imageFour}
                        placeholder="Image URL"
                        onChange={(e) => setImageFour(e.target.value)}
                    />
                    <input
                        className='bottom-border'
                        type="text"
                        value={imageFive}
                        placeholder="Image URL"
                        onChange={(e) => setImageFive(e.target.value)}
                    />
                </label>
                <div className='line long'>
                    <button type='submit'>Create Spot</button>
                </div>

            </form>

        </div>
    )
}

export default SpotInput

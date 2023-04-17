import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createSpot } from '../../store/spots';

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
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    if (!user) history.push('/');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const spot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            SpotImages: [previewImage, imageTwo, imageThree, imageFour, imageFive]
        }
        const createdSpot = await dispatch(createSpot(spot)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    const validations = {}

                    if (data.errors.address) validations.address = data.errors.address;

                    if (data.errors.country) validations.country = data.errors.country;

                    if (data.errors.city) validations.city = data.errors.city;

                    if (data.errors.state) validations.state = data.errors.state;

                    if (data.errors.description) validations.description = data.errors.description;

                    if (data.errors.name) validations.name = data.errors.name;

                    if (data.errors.price) validations.price = data.errors.price;

                    if (!previewImage) validations.previewImage = "Preview Image is required";

                    if (previewImage) {
                        if (!previewImage.endsWith(".png") || !previewImage.endsWith(".jpeg") || !previewImage.endsWith(".jpg")) {
                            validations.previewImage = "Image URL must end in .png, .jpeg, or .jpg";
                        }
                    }

                    if (imageTwo) {
                        if (!imageTwo.endsWith(".png") || !imageTwo.endsWith(".jpg") || !imageTwo.endsWith(".jpeg")) {
                            validations.imageTwo = "Image URL must end in .png, .jpeg, or .jpg";
                        }
                    }

                    if (imageThree) {
                        if (!imageThree.endsWith(".png") || !imageThree.endsWith(".jpg") || !imageThree.endsWith(".jpeg")) {
                            validations.imageThree = "Image URL must end in .png, .jpeg, or .jpg";
                        }
                    }

                    if (imageFour) {
                        if (!imageFour.endsWith(".png") || !imageFour.endsWith(".jpg") || !imageFour.endsWith(".jpeg")) {
                            validations.imageFour = "Image URL must end in .png, .jpeg, or .jpg";
                        }
                    }

                    if (imageFive) {
                        if (!imageFive.endsWith(".png") || !imageFive.endsWith(".jpg") || !imageFive.endsWith(".jpeg")) {
                            validations.imageFive = "Image URL must end in .png, .jpeg, or .jpg";
                        }
                    }

                    return setErrors(validations);
                }
            }
        );
        if (createSpot) history.push(`/spots/${createdSpot.id}`);
    };

    return (
        <div className='spot-form'>
            <h1 className='spot-form-title'>Create A Spot</h1>
            <h2>Where's your place located?</h2>
            <h3 className='form-content'>Guests will only get your exact address once they booked a reservation.</h3>

            <form className='form' onSubmit={handleSubmit}>
                <label className='spot-form-label'>
                    <p>Country</p>
                    <input
                        className='create-spot-input'
                        type="text"
                        value={country}
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                {errors.country ? <p className='error'>{errors.country}</p> : ""}
                <label className='spot-form-label'>
                    <p>Street Address</p>
                    <input
                        type="text"
                        value={address}
                        placeholder="Street Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                {errors.address ? <p className='error'>{errors.address}</p> : ""}
                <label className='spot-form-label'>
                    <p>City</p>
                    <input
                        type="text"
                        value={city}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                {errors.city ? <p className='error'>{errors.city}</p> : ""}
                <label className='spot-form-label'>
                    <p>State</p>
                    <input
                        type="text"
                        value={state}
                        placeholder="State"
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                {errors.state ? <p className='error'>{errors.state}</p> : ""}
                <label className='spot-form-label '>
                    <h2 className='line'>Describe your place to guests</h2>
                    <h4 className='form-content'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h4>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name='description'
                        placeholder='Please write at least 30 characters'
                        rows='10'
                        cols='80'
                    />
                </label>
                {errors.description ? <p className='error'>{errors.description}</p> : ""}
                <label className='spot-form-label'>
                    <h2 className='line'>Create a title for your spot</h2>
                    <h4 className='form-content'>Catch guest's attention with a spot title that highlights what makes your place special.</h4>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name of your spot"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                {errors.name ? <p className='error'>{errors.name}</p> : ""}
                <label className='spot-form-label'>
                    <h2 className='line'>Set a base price for your spot</h2>
                    <h4 className='form-content'>Competitive pricing can help your listing stand out and rank higher in search results</h4>
                    <input
                        type="number"
                        value={price}
                        placeholder="$Price per night (USD)"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                {errors.price ? <p className='error'>{errors.price}</p> : ""}
                <label className='spot-form-label'>
                    <h2 className='line'>Liven up your spot with photos</h2>
                    <h4 className='form-content'>Submit a link to at least one photo to publish your spot.</h4>
                    <input
                        className='bottom-border'
                        type="text"
                        value={previewImage}
                        placeholder="Preview Image Url"
                        onChange={(e) => setPreviewImage(e.target.value)}
                    />
                    {errors.previewImage ? <p className='error'>{errors.previewImage}</p> : ""}
                    <input
                        className='bottom-border'
                        type="text"
                        value={imageTwo}
                        placeholder="Image URL"
                        onChange={(e) => setImageTwo(e.target.value)}
                    />
                    {errors.imageTwo ? <p className='error'>{errors.imageTwo}</p> : ""}
                    <input
                        className='bottom-border'
                        type="text"
                        value={imageThree}
                        placeholder="Image URL"
                        onChange={(e) => setImageThree(e.target.value)}
                    />
                    {errors.imageThree ? <p className='error'>{errors.imageThree}</p> : ""}
                    <input
                        className='bottom-border'
                        type="text"
                        value={imageFour}
                        placeholder="Image URL"
                        onChange={(e) => setImageFour(e.target.value)}
                    />
                    {errors.imageFour ? <p className='error'>{errors.imageFour}</p> : ""}
                    <input
                        className='bottom-border'
                        type="text"
                        value={imageFive}
                        placeholder="Image URL"
                        onChange={(e) => setImageFive(e.target.value)}
                    />
                    {errors.imageFive ? <p className='error'>{errors.imageFive}</p> : ""}
                </label>
                <div className='line long'>
                    <button
                        type='submit'>
                        Create Spot
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SpotInput

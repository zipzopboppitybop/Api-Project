const express = require('express');
const { Op, ValidationError } = require("sequelize");
const { Spot, Review, User, sequelize, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid')
        .notEmpty()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Longitude is not valid')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Price per day is required')
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('Price per day is not valid'),
    handleValidationErrors
];
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),

    handleValidationErrors
];
const validateSpotImage = [
    check('url')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Url is required'),
    check('preview')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isBoolean()
        .withMessage('Preview must be true or false'),
    handleValidationErrors
];
//Work on errors
const router = express.Router();

router.get(
    "/",
    async (req, res) => {
        let errorResult = new Error();
        let errorLength = 0;
        errorResult.message = "Validation error";
        errorResult.statusCode = 400;
        errorResult.errors = {};
        let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
        let pagination = {};

        if (!page) page = 1;
        if (!size) size = 20;

        if (parseInt(page) >= 1 && parseInt(size) >= 1) {
            pagination.limit = size;
            pagination.offset = size * (page - 1);
        } if (parseInt(page) < 1 || isNaN(size)) {
            errorResult.errors.page = "Page must be greater than or equal to 1"
            errorLength++;
        } if (parseInt(size) < 1 || isNaN(size)) {
            errorResult.errors.size = "Size must be greater than or equal to 1"
            errorLength++;
        }

        const where = {};

        //Errors
        if (typeof req.query.minLat === "string") {
            if (isNaN(req.query.minLat) || req.query.minLat < -90 || req.query.minLat > 90 || req.query.minLat === "") {
                errorResult.errors.minLat = "Minimum latitude is invalid"
                errorLength++;
                //return res.json(errorResult)
            }
        }

        if (typeof req.query.maxLat === "string") {
            if (isNaN(req.query.maxLat) || req.query.maxLat < -90 || req.query.maxLat > 90 || req.query.maxLat === "") {
                errorResult.errors.maxLat = "Maximum latitude is invalid"
                errorLength++;
                //return res.json(errorResult)
            }
        }

        if (typeof req.query.minLng === "string") {
            if (isNaN(req.query.minLng) || req.query.minLng < -180 || req.query.minLng > 180 || req.query.minLng === "") {
                errorResult.errors.minLng = "Minimum longitude is invalid"
                errorLength++;
                //return res.json(errorResult)
            }
        }

        if (typeof req.query.maxLng === "string") {
            if (isNaN(req.query.maxLng) || req.query.maxLng < -180 || req.query.maxLng > 180 || req.query.maxLng === "") {
                errorResult.errors.maxLng = "Maximum latitude is invalid"
                errorLength++;
                //return res.json(errorResult)
            }
        }

        if (typeof req.query.minPrice === "string") {
            if (isNaN(req.query.minPrice) || req.query.minPrice === "") {
                errorResult.errors.minPrice = "Minimum price is invalid"
                errorLength++;
                //return res.json(errorResult)
            } else if (req.query.minPrice < 0) {
                errorResult.errors.minPrice = "Minimum price must be greater than or equal to 0"
                errorLength++;
            }
        }

        if (typeof req.query.maxPrice === "string") {
            if (isNaN(req.query.maxPrice) || req.query.maxPrice === "") {
                errorResult.errors.maxPrice = "Maximum price is invalid"
                errorLength++;
                //return res.json(errorResult)
            } else if (req.query.maxPrice < 0) {
                errorResult.errors.minPrice = "Maximum price must be greater than or equal to 0"
                errorLength++;
            }
        }


        //Lat
        if (req.query.minLat && req.query.maxLat) {
            where.lat = { [Op.between]: [req.query.minLat, req.query.maxLat] }
        }
        if (req.query.minLat) {
            where.lat = { [Op.gte]: req.query.minLat }
        }
        if (req.query.maxLat) {
            where.lat = { [Op.lte]: req.query.maxLat }
        }

        //Lng
        if (req.query.minLng && req.query.maxLng) {
            where.lng = { [Op.between]: [req.query.minLng, req.query.maxLng] }
        }
        if (req.query.minLng) {
            where.Lng = { [Op.gte]: req.query.minLng }
        }
        if (req.query.maxLng) {
            where.Lng = { [Op.lte]: req.query.maxLng }
        }

        //Price
        if (req.query.minPrice && req.query.maxPrice) {
            where.Price = { [Op.between]: [req.query.minPrice, req.query.maxPrice] }
        }
        if (req.query.minPice) {
            where.Price = { [Op.gte]: req.query.minPrice }
        }
        if (req.query.maxPice) {
            where.Price = { [Op.lte]: req.query.maxPrice }
        }



        let result = {};

        const allSpots = await Spot.findAll({
            ...pagination,
            include: [
                {
                    model: Review
                },
                {
                    model: SpotImage
                }
            ],
            where
        });



        const spotData = [];

        for (let i = 0; i < allSpots.length; i++) {
            const spot = allSpots[i];

            spotData.push(spot.toJSON());
        }

        for (let i = 0; i < spotData.length; i++) {
            const spot = spotData[i];
            if (spot.SpotImages.length > 0) {
                for (let j = 0; j < spot.SpotImages.length; j++) {
                    const image = spot.SpotImages[j];

                    if (image.preview === true) spot.previewImage = image.url;
                }
                if (!spot.previewImage) spot.previewImage = "No Preview Image";
            } else spot.previewImage = "No Preview Image";

            const ratings = await Review.findOne({
                where: {
                    spotId: spot.id
                },
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                ]
            })
            let reviewAvg = ratings.toJSON().avgRating
            if (reviewAvg) spot.avgRating = reviewAvg;
            else spot.avgRating = "No Review Yet"


            delete spot.SpotImages;
            delete spot.Reviews;
        }

        let count = await Spot.count({ where });
        result.Spots = spotData;
        result.page = parseInt(page);
        result.size = spotData.length

        if (errorLength > 0) {
            res.status(400);
            return res.json(errorResult);
        }

        res.json(
            result
        );
    })

//Get Current User's Spots
router.get(
    '/current',
    restoreUser,
    async (req, res) => {
        const { user } = req;

        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        }

        const userSpots = await Spot.findAll({
            where: {
                ownerId: user.id
            },
            include: [
                {
                    model: Review
                },
                {
                    model: SpotImage
                }
            ]
        })

        let spotData = [];

        for (let i = 0; i < userSpots.length; i++) {
            const spot = userSpots[i];

            spotData.push(spot.toJSON());
        }
        for (let i = 0; i < spotData.length; i++) {
            const spot = spotData[i];
            if (spot.SpotImages.length > 0) {
                for (let j = 0; j < spot.SpotImages.length; j++) {
                    const image = spot.SpotImages[j];

                    if (image.preview === true) spot.previewImage = image.url;
                }
                if (!spot.previewImage) spot.previewImage = "No Preview Image";
            } else spot.previewImage = "No Preview Image";

            const ratings = await Review.findOne({
                where: {
                    spotId: spot.id
                },
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                ]
            })
            let reviewAvg = ratings.toJSON().avgRating
            if (reviewAvg) spot.avgRating = reviewAvg;
            else spot.avgRating = "No Review Yet"


            delete spot.SpotImages;
            delete spot.Reviews;
        }

        if (spotData.length < 1) spotData = "No Spots Yet";

        return res.json({
            Spots: spotData
        })
    }
);

//Get Details Of Current Spot From Id
router.get(
    '/:spotId',
    async (req, res) => {
        const currentSpot = await Spot.findByPk(req.params.spotId, {
            include: [
                {
                    model: Review
                },
                {
                    model: User,
                    attributes: ["id", "firstName", "lastName"]
                }
            ],
        })

        if (!currentSpot) {
            const err = Error();
            err.message = "Spot couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        const currentSpotData = currentSpot.toJSON();

        const ratings = await Review.findOne({
            where: {
                spotId: currentSpot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating'],
            ]
        })

        const count = await Review.findOne({
            where: {
                spotId: currentSpot.id
            },
            attributes: [
                [sequelize.fn("COUNT", sequelize.col("id")), 'numReviews']
            ]
        })

        const currentSpotImages = await SpotImage.findAll({
            where: {
                spotId: currentSpot.id
            },
            attributes: ["id", "url", "preview"]
        })

        let reviewAvg = ratings.toJSON().avgStarRating
        let reviewCount = count.toJSON().numReviews

        if (reviewCount) currentSpotData.numReviews = reviewCount;
        else currentSpotData.numReviews = "No Reviews Yet"
        if (reviewAvg) currentSpotData.avgStarRating = reviewAvg;
        else currentSpotData.avgStarRating = "No Reviews Yet"
        if (currentSpotImages.length > 0) currentSpotData.SpotImages = currentSpotImages
        else currentSpotData.SpotImages = "No Images Yet"


        currentSpotData.Owner = currentSpotData.User

        delete currentSpotData.User
        delete currentSpotData.Reviews;

        res.json(currentSpotData)
    }
)

//Get Reviews Of Spot From Spot Id
router.get(
    '/:spotId/reviews',
    async (req, res) => {
        const currentSpot = await Spot.findByPk(req.params.spotId);

        if (!currentSpot) {
            const err = Error();
            err.message = "Spot couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        const spotReviews = await Review.findAll({
            where: {
                spotId: currentSpot.id
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "firstName", "lastName"]
                },
                {
                    model: ReviewImage,
                    attributes: ["id", "url"]
                }
            ]
        })

        const reviewData = [];

        for (let i = 0; i < spotReviews.length; i++) {
            const review = spotReviews[i];

            reviewData.push(review.toJSON());
        }
        for (let i = 0; i < reviewData.length; i++) {
            const review = reviewData[i];
            const reviewImages = await ReviewImage.findAll({
                where: {
                    reviewId: review.id
                }
            })
            if (reviewImages.length > 0) review.ReviewImages = reviewImages
            else review.ReviewImages = "No Review Images Yet";
        }

        res.json({
            Reviews: reviewData
        });
    }
)

//Get Bookings From Spot Id
router.get(
    '/:spotId/bookings',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const currentSpot = await Spot.findByPk(req.params.spotId);

        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        }

        if (!currentSpot) {
            const err = Error();
            err.message = "Spot couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        if (user.id !== currentSpot.ownerId) {
            const currentSpotBookings = await Booking.findAll({
                where: {
                    spotId: currentSpot.id
                },
                attributes: ["spotId", "startDate", "endDate"]
            })

            if (currentSpotBookings < 1) {
                return res.json({
                    Bookings: "No Bookings Yet"
                });
            } else {
                return res.json({
                    Bookings: currentSpotBookings
                });
            }
        }

        const currentSpotBookings = await Booking.findAll({
            where: {
                spotId: currentSpot.id
            },
            include: {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            }
        })

        if (currentSpotBookings < 1) {
            return res.json({
                Bookings: "No Bookings Yet"
            });
        } else {

            res.json({
                Bookings: currentSpotBookings
            })
        }

    }
)

//Create A Spot
router.post(
    '/',
    validateSpot,
    restoreUser,
    async (req, res) => {
        const { user } = req;
        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        }

        const { address, city, state, country, lat, lng, name, description, price } = req.body;



        const newSpot = await Spot.create({
            ownerId: user.id, address, city, state, country, lat, lng, name, description, price
        })

        res.json(newSpot)
    }
)

//Create An Image on Spot (Can only create image on spot you own)
router.post(
    '/:spotId/images',
    restoreUser,
    validateSpotImage,
    async (req, res) => {
        const { user } = req;
        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        }

        const currentSpot = await Spot.findByPk(req.params.spotId)

        if (!currentSpot) {
            const err = Error();
            err.message = "Spot couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        if (user.id !== currentSpot.ownerId) {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403);
            return res.json(err);
        }

        const { url, preview } = req.body;

        const newImage = await SpotImage.create({
            spotId: currentSpot.id, url, preview,
        })

        const newImageData = newImage.toJSON();

        delete newImageData.createdAt;
        delete newImageData.updatedAt;
        delete newImageData.spotId;

        res.json(newImageData);
    }
)

//Create a Review On Spot
router.post(
    '/:spotId/reviews',
    validateReview,
    restoreUser,
    async (req, res) => {
        const { user } = req;

        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        }

        const currentSpot = await Spot.findByPk(req.params.spotId)

        if (!currentSpot) {
            const err = Error();
            err.message = "Spot couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        const reviews = await Review.findOne({
            where: {
                userId: user.id,
                spotId: currentSpot.id
            }
        })

        if (reviews.userId === user.id && currentSpot.id === reviews.spotId) {
            const err = new Error();
            err.message = "User already has a review for this spot";
            err.statusCode = 403;
            res.status(403);
            return res.json(err);
        }

        if (!reviews) {
            const { review, stars } = req.body;

            const newReview = await Review.create({
                userId: user.id, spotId: currentSpot.id, review, stars
            })


            res.json(newReview);
        }


    }
)

//Create Booking For Spot From Id
router.post(
    '/:spotId/bookings',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        let errorsLength = 0;
        let forbiddenErrorsLength = 0;
        const validationError = new Error();
        const forbiddenError = new Error();

        validationError.message = "Validation Error"
        validationError.statusCode = 400;
        validationError.errors = {};
        forbiddenError.message = "Sorry, this spot is already booked for the specified dates";
        forbiddenError.statusCode = 403;
        forbiddenError.errors = {};

        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        };

        const currentSpot = await Spot.findByPk(req.params.spotId, {
            include: {
                model: Booking
            }
        });


        if (!currentSpot) {
            const err = Error();
            err.message = "Spot couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        };

        if (user.id === currentSpot.ownerId) {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403);
            return res.json(err);
        };


        const { startDate, endDate } = req.body;
        const startDateResult = new Date(startDate);
        const startDateInteger = startDateResult.getTime();
        const endDateResult = new Date(endDate);
        const endDateInteger = endDateResult.getTime();
        const today = new Date();
        const todayInteger = today.getTime();

        if (todayInteger > startDateInteger) {
            forbiddenError.message = "Forbidden"
            forbiddenError.errors.startDate = "Start Date cannot be before today";
            forbiddenErrorsLength++;
        }

        if (endDateInteger === startDateInteger) {
            validationError.errors.endDate = "endDate cannot be on or before startDate";
            errorsLength++;
        }

        const dates = [];
        for (let i = 0; i < currentSpot.Bookings.length; i++) {
            const booking = currentSpot.Bookings[i];

            dates.push(booking.toJSON());
        }
        for (let i = 0; i < dates.length; i++) {
            const booking = dates[i];
            const bookingStartDate = new Date(booking.startDate)
            const bookingEndDate = new Date(booking.endDate)
            const bookingStartDateInteger = bookingStartDate.getTime();
            const bookingEndDateInteger = bookingEndDate.getTime();

            if (bookingStartDateInteger === startDateInteger) {
                forbiddenError.errors.startDate = "Start date conflicts with an existing booking"
                forbiddenErrorsLength++;
            } else if (bookingEndDateInteger === endDateInteger) {
                forbiddenError.errors.endDate = "End date conflicts with an existing booking"
                forbiddenErrorsLength++;
            } else if (startDateInteger >= bookingStartDateInteger && endDateInteger <= bookingEndDateInteger) {
                forbiddenError.errors.startDate = "Start date conflicts with an existing booking"
                forbiddenErrorsLength++;
                forbiddenError.errors.endDate = "End date conflicts with an existing booking"
                forbiddenErrorsLength++;
            } else if (startDateInteger <= bookingStartDateInteger && endDateInteger >= bookingEndDateInteger) {
                forbiddenError.errors.startDate = "Start date conflicts with an existing booking";
                forbiddenError.errors.endDate = "End date conflicts with an existing booking"
                forbiddenErrorsLength++;
                forbiddenErrorsLength++;
            } else if (startDateInteger <= bookingStartDateInteger && endDateInteger <= bookingEndDateInteger && endDateInteger >= bookingStartDateInteger) {
                forbiddenError.errors.startDate = "Start date conflicts with an existing booking";
                forbiddenError.errors.endDate = "End date conflicts with an existing booking"
                forbiddenErrorsLength++;
                forbiddenErrorsLength++;
            } else if (startDateInteger >= bookingStartDateInteger && endDateInteger >= bookingEndDateInteger && startDateInteger <= bookingEndDateInteger) {
                forbiddenError.errors.startDate = "Start date conflicts with an existing booking";
                forbiddenError.errors.endDate = "End date conflicts with an existing booking"
                forbiddenErrorsLength++;
                forbiddenErrorsLength++;
            }
        }

        if (errorsLength > 0) {
            res.status(400)
            return res.json(validationError);
        } else if (forbiddenErrorsLength > 0) {
            res.status(403)
            return res.json(forbiddenError);
        }

        const newBooking = await Booking.create({
            spotId: currentSpot.id, userId: user.id, startDate: startDateResult, endDate: endDateResult
        })


        res.json(newBooking)
    }
)

//Edit A Spot
router.put(
    '/:spotId',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        let errorsLength = 0;
        const validationError = new Error();

        validationError.message = "Validation Error"
        validationError.statusCode = 400;
        validationError.errors = {};

        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        }

        const currentSpot = await Spot.findByPk(req.params.spotId)

        if (!currentSpot) {
            const err = Error();
            err.message = "Spot couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        if (user.id !== currentSpot.ownerId) {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403);
            return res.json(err);
        }

        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        if (address && address !== "") currentSpot.address = address
        else if (address === "") {
            validationError.errors.address = "Street address is required";
            errorsLength++;
        }

        if (city && city !== "") currentSpot.city = city;
        else if (city === "") {
            validationError.errors.city = "City is required";
            errorsLength++;
        }

        if (state && state !== "") currentSpot.state = state;
        else if (state === "") {
            validationError.errors.state = "State is required";
            errorsLength++;
        }

        if (country && country !== "") currentSpot.country = country;
        else if (country === "") {
            validationError.errors.country = "Country is required";
            errorsLength++;
        }

        if (lat && lat > 90 || lat && lat < -90 || lat && lat === true || lat === false || lat && isNaN(lat)) {
            validationError.errors.lat = "Latitude is not valid";
            errorsLength++;
        } else if (lat && lat !== "") currentSpot.lat = lat;

        if (lng && lng > 180 || lng && lng < -180 || lng && lng === true || lng && lng === false || lng && isNaN(lng)) {
            validationError.errors.lng = "Longitude is not valid";
            errorsLength++;
        } else if (lng && lng !== "") currentSpot.lng = lng;

        if (name && name.length > 50) {
            validationError.errors.name = "Name must be less than 50 characters";
            errorsLength++;
        }
        else if (name && name !== "") currentSpot.name = name;
        else if (name === "") {
            validationError.errors.name = "Name is required";
            errorsLength++;
        }

        if (description && description !== "") currentSpot.description = description;
        else if (description === "") {
            validationError.errors.description = "Description is required";
            errorsLength++;
        }

        if (price && isNaN(price)) {
            validationError.errors.price = "Price is not valid";
            errorsLength++;
        }
        else if (price && price !== "") currentSpot.price = price;
        else if (price === "") {
            validationError.errors.price = "Price per day is required";
            errorsLength++;
        }

        if (errorsLength > 0) {
            res.status(400)
            return res.json(validationError);
        }

        await currentSpot.save();

        res.json(currentSpot);
    }
)

//Delete a Spot
router.delete(
    '/:spotId',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        }

        const currentSpot = await Spot.findByPk(req.params.spotId)

        if (!currentSpot) {
            const err = Error();
            err.message = "Spot couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        if (user.id !== currentSpot.ownerId) {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403);
            return res.json(err);
        }

        await currentSpot.destroy();

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
)

module.exports = router;

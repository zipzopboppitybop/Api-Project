const express = require('express');
const { Op } = require("sequelize");
const { Spot, SpotImage, Booking } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
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

//Get Current User's Bookings
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

        const userBookings = await Booking.findAll({
            where: {
                userId: user.id
            },
            //attributes: ["id", "spotId"],
            include: {
                model: Spot,
                attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
            }
        })

        const userBookingsData = [];

        for (let i = 0; i < userBookings.length; i++) {
            const booking = userBookings[i];

            userBookingsData.push(booking.toJSON());
        }
        for (let i = 0; i < userBookingsData.length; i++) {
            const booking = userBookingsData[i];
            const previewImage = await SpotImage.findOne({
                where: {
                    spotId: booking.Spot.id,
                    preview: {
                        [Op.is]: true
                    }
                }
            })

            if (!previewImage) booking.Spot.previewImage = "No Preview Image Yet"
            else booking.Spot.previewImage = previewImage.url;

            if (userBookingsData.length === 0) {
                return res.json({
                    Bookings: "No Bookings Yet"
                })
            }

        }

        if (userBookingsData.length < 1) {
            return res.json({
                Bookings: "No Bookings Yets"
            })
        }

        res.json({
            Bookings: userBookingsData
        });
    }
)

//Edit a Booking
router.put(
    '/:bookingId',
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
        }

        const currentBooking = await Booking.findByPk(req.params.bookingId);

        if (!currentBooking) {
            const err = Error();
            err.message = "Booking couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        if (user.id !== currentBooking.userId) {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403);
            return res.json(err);
        }

        const { startDate, endDate } = req.body;
        const startDateResult = new Date(startDate);
        const startDateInteger = startDateResult.getTime();
        const endDateResult = new Date(endDate);
        const endDateInteger = endDateResult.getTime();
        const currentBookingStartDateResult = new Date(currentBooking.startDate);
        const currentBookingStartDateInteger = currentBookingStartDateResult.getTime();
        const currentBookingEndDateResult = new Date(currentBooking.endDate);
        const currentBookingEndDateInteger = currentBookingEndDateResult.getTime();
        const today = new Date();
        const todayInteger = today.getTime();

        const currentSpot = await Spot.findByPk(currentBooking.spotId, {
            include: {
                model: Booking
            }
        });


        if (startDateInteger >= endDateInteger) {
            validationError.errors.endDate = "End Date cannot come before Start Date";
            errorsLength++;
        }
        //"startDate": "2023-04-29T00:00:00.000Z",
        //"endDate": "2023-04-30T00:00:00.000Z",
        // "startDate": "2023-02-27T00:00:00.000Z",
        // "endDate": "2023-02-28T00:00:00.000Z",
        if (todayInteger > currentBookingEndDateInteger) {
            forbiddenError.message = "Past bookings can't be modified";
            forbiddenErrorsLength++;
            delete forbiddenError.errors
            res.status(403)
            return res.json(forbiddenError)
        }
        console.log(todayInteger, endDateInteger)

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
            } if (bookingEndDateInteger === startDateInteger) {
                forbiddenError.errors.endDate = "End date conflicts with an existing booking"
                forbiddenErrorsLength++;
            } if (bookingStartDateInteger > startDateInteger && bookingEndDateInteger < endDateInteger) {
                forbiddenError.errors.endDate = "End date conflicts with an existing booking"
                forbiddenError.errors.startDate = "Start date conflicts with an existing booking"
                forbiddenErrorsLength++;
            } if (bookingEndDateInteger === endDateInteger) {
                forbiddenError.errors.endDate = "End date conflicts with an existing booking"
                forbiddenErrorsLength++;
            } if (bookingStartDateInteger > startDateInteger && startDateInteger < bookingEndDateInteger) {
                forbiddenError.errors.endDate = "End date conflicts with an existing booking"
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


        currentBooking.startDate = startDate;
        currentBooking.endDate = endDate;


        await currentBooking.save();

        res.json(currentBooking)
    }
)

//Delete a Booking
router.delete(
    "/:bookingId",
    restoreUser,
    async (req, res) => {
        const { user } = req;

        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401)
            return res.json(err);
        }

        const currentBooking = await Booking.findByPk(req.params.bookingId);

        if (!currentBooking) {
            const err = new Error();
            err.message = "Booking couldn't be found";
            err.statusCode = 404;
            res.status(404)
            return res.json(err);
        }

        const currentSpot = await Spot.findByPk(currentBooking.spotId);

        const currentTime = new Date();
        const currentTimeInteger = currentTime.getTime()

        if (currentTimeInteger > currentBooking.startDate && currentTimeInteger < currentBooking.endDate) {
            const err = new Error();
            err.message = "Bookings that have been started can't be deleted";
            err.statusCode = 403;
            res.status(403)
            return res.json(err);
        }

        if (user.id === currentBooking.userId || user.id === currentSpot.ownerId) {
            await currentBooking.destroy();

            return res.json({
                message: `Successfully deleted`,
                statusCode: 200
            })
        } else {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403)
            return res.json(err);
        }
    }
)

module.exports = router;

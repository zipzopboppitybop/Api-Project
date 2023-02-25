const express = require('express');
const { Op } = require("sequelize");
const { Spot, Review, User, sequelize, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
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

        if (!userBookings) {
            res.json({
                Bookings: "Currently no Bookings"
            });
        }

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


        }

        res.json({
            Bookings: userBookingsData
        });
    }
)

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
                message: `Successfully deleted ${currentBooking.id}`,
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

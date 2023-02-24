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

module.exports = router;

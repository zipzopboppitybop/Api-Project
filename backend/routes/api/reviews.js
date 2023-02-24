const express = require('express');
const { Op } = require("sequelize");
const { Spot, Review, User, sequelize, SpotImage, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

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
            res.json(err);
        }

        const userReviews = await Review.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "firstName", "lastName"]
                },
                {
                    model: Spot,
                    attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
                },
                {
                    model: ReviewImage,
                    attributes: ["id", "url"]
                }
            ]
        })

        const reviewData = [];

        for (let i = 0; i < userReviews.length; i++) {
            const review = userReviews[i];

            reviewData.push(review.toJSON());
        }
        for (let i = 0; i < reviewData.length; i++) {
            const review = reviewData[i];
            const previewImage = await SpotImage.findOne({
                where: {
                    spotId: review.Spot.id,
                    preview: {
                        [Op.is]: true
                    }
                }
            })

            review.Spot.previewImage = previewImage.url;
        }


        res.json({
            Reviews: reviewData
        })
    }
)

module.exports = router;

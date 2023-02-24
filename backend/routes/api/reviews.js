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
            return res.json(err);
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
            if (!previewImage) review.Spot.previewImage = "No Preview Image Yet"
            else review.Spot.previewImage = previewImage.url;
        }

        res.json({
            Reviews: reviewData
        })
    }
)

//Create Image to Review
router.post(
    '/:reviewId/images',
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

        const currentReview = await Review.findByPk(req.params.reviewId, {
            include: {
                model: ReviewImage
            }
        });

        if (!currentReview) {
            const err = new Error();
            err.message = "Review couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        if (currentReview.userId !== user.id) {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403);
            return res.json(err);
        }

        const reviewImagesLength = currentReview.ReviewImages;

        if (reviewImagesLength.length > 10) {
            const err = new Error();
            err.message = "Maximum number of images for this resource was reached";
            err.statusCode = 403;
            res.status(403);
            return res.json(err);
        }

        const { url } = req.body;

        const newReviewImage = await ReviewImage.create({
            reviewId: currentReview.id, url: url
        })

        res.json(newReviewImage);
    }
)
module.exports = router;

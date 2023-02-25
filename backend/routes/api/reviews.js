const express = require('express');
const { Op } = require("sequelize");
const { Spot, Review, User, sequelize, SpotImage, ReviewImage } = require('../../db/models');
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
const validateReviewImage = [
    check('url')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Url is required'),
]

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
                    model: ReviewImage
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

            const reviewImages = await ReviewImage.findAll({
                where: {
                    reviewId: review.id
                },
                attributes: ["id", "url"]
            })
            if (reviewImages.length > 0) review.ReviewImages = reviewImages
            else review.ReviewImages = "No Review Images Yet";
        }

        res.json({
            Reviews: reviewData
        })
    }
)

//Create Image for Review
router.post(
    '/:reviewId/images',
    validateReviewImage,
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
        if (!url) {
            const err = new Error();
            err.message = "Validation Error";
            err.statusCode = 400;
            err.errors = { url: "Url is required" };
            res.status(400);
            return res.json(err);
        }
        const newReviewImage = await ReviewImage.create({
            reviewId: currentReview.id, url: url
        })

        const reviewImageData = newReviewImage.toJSON();

        delete reviewImageData.createdAt;
        delete reviewImageData.updatedAt;
        delete reviewImageData.reviewId;

        res.json(reviewImageData);
    }
)

//Edit a Review
router.put(
    '/:reviewId',
    restoreUser,
    validateReview,
    async (req, res) => {
        const { user } = req;

        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401)
            return res.json(err);
        }

        const currentReview = await Review.findByPk(req.params.reviewId);

        if (!currentReview) {
            const err = new Error();
            err.message = "Review couldn't be found";
            err.statusCode = 404;
            res.status(404)
            return res.json(err);
        }

        if (user.id !== currentReview.userId) {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403)
            return res.json(err);
        }

        const { review, stars } = req.body;

        if (review !== undefined) currentReview.review = review;
        if (stars !== undefined) currentReview.stars = stars;

        await currentReview.save();

        res.json(currentReview)
    }
)

//Delete a Review
router.delete(
    '/:reviewId',
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

        const currentReview = await Review.findByPk(req.params.reviewId);

        if (!currentReview) {
            const err = new Error();
            err.message = "Review couldn't be found";
            err.statusCode = 404;
            res.status(404)
            return res.json(err);
        }

        if (user.id !== currentReview.userId) {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403)
            return res.json(err);
        }

        await currentReview.destroy();

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })

    }
)

module.exports = router;

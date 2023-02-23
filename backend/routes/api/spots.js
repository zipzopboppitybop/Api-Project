const express = require('express');
const { Op } = require("sequelize");
const { Spot, Review, User, sequelize, SpotImage } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];
//Work on errors
const router = express.Router();

router.get("/", restoreUser, async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
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

    res.json(spotData);
})

//Get Current User's Spots
router.get(
    '/current',
    restoreUser,
    requireAuth,
    async (req, res) => {
        const { user } = req;
        if (user) {
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
            const spotData = [];

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

            return res.json({
                Spots: spotData
            })
        } else return res.json({ user: null });
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
            res.json(err);
        }

        const currentSpotData = currentSpot.toJSON();

        const ratings = await Review.findOne({
            where: {
                spotId: currentSpot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
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

        let reviewAvg = ratings.toJSON().avgRating
        let reviewCount = count.toJSON().numReviews

        if (reviewCount) currentSpotData.numReviews = reviewCount;
        else currentSpotData.numReviews = "No Reviews Yet"
        if (reviewAvg) currentSpotData.avgStarRating = reviewAvg;
        else currentSpotData.avgRating = "No Reviews Yet"

        currentSpotData.SpotImages = currentSpotImages
        currentSpotData.Owner = currentSpotData.User

        delete currentSpotData.User
        delete currentSpotData.Reviews;

        res.json(currentSpotData)
    }
)

//Create A Spot
router.post(
    '/',
    requireAuth,
    restoreUser,
    async (req, res) => {
        const { user } = req;
        if (user) {
            const { address, city, state, country, lat, lng, name, description, price } = req.body;

            const newSpot = await Spot.create({
                ownerId: user.id, address, city, state, country, lat, lng, name, description, price
            })

            res.json(newSpot)
        }

    }
)

//Create A Spot (Can only create image on spot you control)
router.post(
    '/:spotId/images',
    requireAuth,
    restoreUser,
    async (req, res) => {
        const { user } = req;
        if (user) {
            const currentSpot = await Spot.findByPk(req.params.spotId)

            if (!currentSpot) {
                const err = Error();
                err.message = "Spot couldn't be found";
                err.statusCode = 404;
                res.status(404);
                res.json(err);
            }

            if (user.id !== currentSpot.ownerId) {
                const err = new Error();
                err.message = "Authentication required";
                err.statusCode = 401;
                res.status(401);
                res.json(err);
            }

            const { url, preview } = req.body;

            const newImage = await SpotImage.create({
                url, preview
            })

            const newImageData = newImage.toJSON();

            delete newImageData.createdAt;
            delete newImageData.updatedAt;
            delete newImageData.spotId;

            res.json(newImageData);
        }
    }
)
module.exports = router;

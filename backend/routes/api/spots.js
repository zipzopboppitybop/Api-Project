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

router.get(
    '/current',
    restoreUser,
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

module.exports = router;

const express = require('express');
const { Op } = require("sequelize");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, User, sequelize, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const router = express.Router();

router.get("/", async (req, res) => {
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

        spot.avgRating = ratings.toJSON().avgRating;

        delete spot.SpotImages;
        delete spot.Reviews;
    }

    res.json(spotData);
})

module.exports = router;

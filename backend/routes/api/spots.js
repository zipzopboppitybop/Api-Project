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

    });

    const payload = [];

    for (let i = 0; i < allSpots.length; i++) {
        const spot = allSpots[i];
        const spotData = spot.toJSON();

        const image = await spot.getSpotImages({
            attributes: ["url"],
            where: {
                preview: {
                    [Op.is]: true
                }
            },
            limit: 1
        });
        const reviews = await Review.findOne({
            where: {
                spotId: {
                    [Op.is]: spot.id
                }
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        });

        if (!image) {
            spotData.previewImage = ""
        }
        if (!reviews) {
            spotData.avgRating = 0
        }

        spotData.avgRating = reviews.toJSON().avgRating;
        spotData.previewImage = image[0].url;
        payload.push(spotData);
    }

    res.json(payload);
})

module.exports = router;

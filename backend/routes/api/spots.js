const express = require('express');
const { Op } = require("sequelize");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const router = express.Router();

router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll();
    const payload = [];

    for (let i = 0; i < allSpots.length; i++) {
        const spot = allSpots[i];
        const image = await spot.getSpotImages({
            attributes: ["url"],
            where: {
                preview: {
                    [Op.is]: true
                }
            }
        });

        const reviews = await Review.findOne({
            where: {
                spotId: {
                    [Op.is]: spot.id
                }
            },
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('stars')), "avgRating"]
                ]
            }
        })

        const spotData = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: reviews.toJSON().avgRating,
            previewImage: image[0].url
        };

        payload.push(spotData);
    }

    res.json(payload);
})

module.exports = router;

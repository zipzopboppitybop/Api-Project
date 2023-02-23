const express = require('express');
const { Op } = require("sequelize");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll();
    const payload = [];

    for (let i = 0; i < allSpots.length; i++) {
        const spot = allSpots[i];
        const images = await spot.getSpotImages({
            attributes: ["url"]
        });
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
            previewImage: images
        };
        payload.push(spotData);
    }

    res.json(payload);
})

module.exports = router;

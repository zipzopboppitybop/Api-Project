const express = require('express');
const { Op } = require("sequelize");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll();
    const allSpotsData = [];

    for (let i = 0; i < allSpots.length; i++) {
        let spot = allSpots[i];
        const spotData = spot.toJSON();
        const image = await SpotImage.findOne({
            where: {
                spotId: {
                    [Op.is]: spot.id
                }
            }
        })

        if (image) {
            spotData.previewImage = image.url;

        } else {
            spotData.previewImage = ""
        }

        allSpotsData.push(spotData);
    }

    res.json(allSpotsData);
})

module.exports = router;

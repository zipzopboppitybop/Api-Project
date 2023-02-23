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

    res.json(allSpots);
})

module.exports = router;

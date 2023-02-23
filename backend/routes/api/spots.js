const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll();

    res.json(allSpots);
})

module.exports = router;

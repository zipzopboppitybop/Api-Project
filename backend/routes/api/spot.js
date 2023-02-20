// backend/routes/api/spot.js
const express = require('express');

const { Spot } = require('../../db/models');


const router = express.Router();

// Sign up
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll();

    res.json({
        Spots: allSpots
    })
});

module.exports = router;

// backend/routes/api/spot.js
const express = require('express');

const { Spot, User } = require('../../db/models');
const { restoreUser } = require("../../utils/auth.js");
const router = express.Router();

router.use(restoreUser);
// Get All Spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll();

    res.json({
        Spots: allSpots
    })
});

// Get All Spots That Belong To Current User
router.get(
    '/current',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        if (user) {
            const allSpots = await Spot.findAll({
                where: ownerId = user.id
            });

            res.status(200);
            return res.json({
                Spots: allSpots,
            });
        } else return res.json({ user: null });
    }
);

module.exports = router;

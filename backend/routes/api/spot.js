// backend/routes/api/spot.js
const express = require('express');
const { Op } = require("sequelize");
const { Spot, User, Bookings, SpotImage } = require('../../db/models');
const { restoreUser, requireAuth } = require("../../utils/auth.js");
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
    requireAuth,
    async (req, res) => {
        const { user } = req;
        if (user) {
            const currentUserSpots = await Spot.findAll({
                where: {
                    ownerId: {
                        [Op.is]: user.id
                    }
                }
            })
            return res.json({
                Spots: currentUserSpots
            });
        } else return res.json({ user: null });
    }
);

// Get Spot by Id with extra information
router.get(
    '/:spotId',
    async (req, res) => {
        let errorReport = { message: "Spot couldn't be found", statusCode: 404 };
        const currentSpot = await Spot.findByPk(req.params.spotId);

        if (currentSpot) {
            const currentSpotData = currentSpot.toJSON();
            const images = await SpotImage.findAll({
                attributes: ["id", "url", "preview"],
                where: {
                    spotId: {
                        [Op.is]: currentSpot.id
                    }
                }
            });
            const users = await User.findOne({
                attributes: ["id", "firstName", "lastName"],
                where: {
                    id: {
                        [Op.is]: currentSpot.ownerId
                    }
                }
            });

            currentSpotData.SpotImages = images;
            currentSpotData.Owner = users;

            res.json(currentSpotData);
        } else res.json(errorReport);
    }
);

module.exports = router;

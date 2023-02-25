const express = require('express');
const { Op } = require('sequelize');
const { Spot, SpotImage } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');
const router = express.Router();

router.delete(
    '/:imageId',
    restoreUser,
    async (req, res) => {
        const { user } = req;

        if (!user) {
            const err = new Error();
            err.message = "Authentication required";
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        }

        const currentSpotImage = await SpotImage.findByPk(req.params.imageId)

        if (!currentSpotImage) {
            const err = new Error();
            err.message = "Spot Image couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        const currentSpot = await Spot.findByPk(currentSpotImage.spotId);

        if (user.id !== currentSpot.ownerId) {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403);
            return res.json(err);
        }

        await currentSpotImage.destroy();


        res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    }
)

module.exports = router;

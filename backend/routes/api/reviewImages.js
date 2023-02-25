const express = require('express');
const { Op } = require('sequelize');
const { Review, ReviewImage } = require('../../db/models');
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

        const currentReviewImage = await ReviewImage.findByPk(req.params.imageId)

        if (!currentReviewImage) {
            const err = new Error();
            err.message = "Review Image couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        const currentReview = await Review.findByPk(currentReviewImage.reviewId);

        if (user.id !== currentReview.userId) {
            const err = new Error();
            err.message = "Forbidden";
            err.statusCode = 403;
            res.status(403);
            return res.json(err);
        }

        await currentReviewImage.destroy();


        res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    }
)

module.exports = router;

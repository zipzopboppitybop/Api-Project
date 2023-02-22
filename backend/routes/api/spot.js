// backend/routes/api/spot.js
const express = require('express');
const { Op } = require("sequelize");
const { Spot, User, SpotImage, Review, Bookings } = require('../../db/models');
const { restoreUser, requireAuth } = require("../../utils/auth.js");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street Address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isNumeric()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isNumeric()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 51 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Price per day is required'),
    handleValidationErrors
];
const router = express.Router();
router.use(restoreUser);
// Get All Spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll();
    const allSpotsData = [];
    for (let i = 0; i < allSpots.length; i++) {
        let spot = allSpots[i];
        let spotData = spot.toJSON();
        let starsSum = await Review.sum("stars", {
            where: {
                spotId: {
                    [Op.is]: spot.id
                }
            }
        });
        let starsCount = await Review.count({
            where: {
                spotId: {
                    [Op.is]: spot.id
                }
            }
        });
        let image = await SpotImage.findOne({
            attributes: ["url"],
            where: {
                spotId: {
                    [Op.is]: spot.id
                },
                preview: {
                    [Op.is]: true
                }
            }
        });

        spotData.avgRating = starsSum / starsCount;
        spotData.previewImage = image.url;
        allSpotsData.push(spotData);
    }

    res.json({
        Spots: allSpotsData
    })
});

// Get All Spots That Belong To Current User
router.get(
    '/current',
    requireAuth,
    restoreUser,
    async (req, res) => {
        const { user } = req;
        if (user) {
            const allSpots = await Spot.findAll({
                where: {
                    ownerId: {
                        [Op.is]: user.id
                    }
                }
            });
            const allSpotsData = [];
            for (let i = 0; i < allSpots.length; i++) {
                let spot = allSpots[i];
                let spotData = spot.toJSON();
                let starsSum = await Review.sum("stars", {
                    where: {
                        spotId: {
                            [Op.is]: spot.id
                        }
                    }
                });
                let starsCount = await Review.count({
                    where: {
                        spotId: {
                            [Op.is]: spot.id
                        }
                    }
                });
                let image = await SpotImage.findOne({
                    attributes: ["url"],
                    where: {
                        spotId: {
                            [Op.is]: spot.id
                        },
                        preview: {
                            [Op.is]: true
                        }
                    }
                });

                if (!image || !starsCount || starsSum) {
                    spotData.previewImage = "";
                    spotData.avgRating = 0;
                }

                allSpotsData.push(spotData);
            }
            return res.json({
                Spots: allSpotsData
            });
        }


    }
);

//Get Spot by id with owner,images, and number of reviews
router.get(
    '/:spotId',
    async (req, res) => {
        const currentSpot = await Spot.findByPk(req.params.spotId);

        if (!currentSpot) {
            const err = new Error();
            err.message = "Spot couldn't be found";
            err.statusCode = 404;
            res.status(404);
            return res.json(err);
        }

        let starsSum = await Review.sum("stars", {
            where: {
                spotId: {
                    [Op.is]: currentSpot.id
                }
            }
        });
        let currentSpotData = currentSpot.toJSON();
        currentSpotData.numReviews = await Review.count({
            where: {
                spotId: {
                    [Op.is]: currentSpot.id
                }
            }
        })
        currentSpotData.avgStarRating = starsSum / currentSpotData.numReviews;
        currentSpotData.SpotImages = await SpotImage.findAll({
            attributes: ["id", "url", "preview"],
            where: {
                spotId: {
                    [Op.is]: currentSpot.id
                }
            }
        })
        currentSpotData.Owner = await User.findOne({
            attributes: ["id", "firstName", "lastName"],
            where: {
                id: {
                    [Op.is]: currentSpot.ownerId
                }
            }
        })

        delete currentSpotData.avgRating;
        delete currentSpotData.previewImage;

        res.json(currentSpotData);
    }
);

// Create a Spot
router.post(
    '/',
    validateSpot,
    requireAuth,
    restoreUser,
    async (req, res) => {
        const { user } = req;
        if (user) {
            const { address, city, state, country, lat, lng, name, description, price } = req.body;
            const newSpot = await user.createSpot({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price });

            return res.json(newSpot);

        } else {
            const err = new Error();
            err.message = 'Authentication required';
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        };
    });

module.exports = router;

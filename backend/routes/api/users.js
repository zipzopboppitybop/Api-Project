// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Op } = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { ValidationError } = require('sequelize');
const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Last Name is required'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid Email.'),
    check('username')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .notEmpty()
        .withMessage('Username is required.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

const router = express.Router();

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { firstName, lastName, email, password, username } = req.body;
        const emailCheck = await User.findOne({
            attributes: ["email"],
            where: {
                email: {
                    [Op.is]: req.body.email
                }
            }
        });
        const nameCheck = await User.findOne({
            attributes: ["username"],
            where: {
                username: {
                    [Op.is]: req.body.username
                }
            }
        });

        if (emailCheck) {
            const err = new Error();
            err.message = "User already exists"
            err.statusCode = 403
            err.errors = { email: "User with that email already exists" }
            res.status(403);
            return res.json(err);
        }
        if (nameCheck) {
            const err = new Error();
            err.message = "User already exists"
            err.statusCode = 403
            err.errors = { userName: "User with that username already exists" }
            res.status(403);
            return res.json(err);
        }

        const user = await User.signup({ firstName, lastName, email, username, password });

        await setTokenCookie(res, user);
        let userData = user.toJSON();
        userData.token = "";
        delete userData.createdAt;
        delete userData.updatedAt;



        return res.json(userData);
    }
);

module.exports = router;

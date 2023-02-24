const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const validateSignup = [
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
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

// Sign up
router.post(
    '/',
    check('firstName')
        .notEmpty()
        .withMessage('First Name is required'),
    check('lastName')
        .notEmpty()
        .withMessage('Last Name is required'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    // check('userName')
    //     .exists({ checkFalsy: true })
    //     .notEmpty()
    //     .withMessage('Username is required'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    validateSignup,
    async (req, res) => {
        const { token } = req.cookies
        const { firstName, lastName, email, password, username } = req.body;
        const user = await User.signup({ firstName, lastName, email, username, password });

        await setTokenCookie(res, user);

        const userData = user.toJSON();
        delete userData.createdAt
        delete userData.updatedAt
        userData.token = token

        return res.json(userData);
    }
);

module.exports = router;

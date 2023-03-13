// backend/routes/api/session.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        // if (!user) {
        //     const err = new Error();
        //     err.message = "Invalid credentials"
        //     err.statusCode = 401;
        //     res.status(401)
        //     return res.json(err);
        // }

        await setTokenCookie(res, user);

        return res.json({
            user: user.toSafeObject()
        });
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;

        // if (!user) {
        //     const err = new Error();
        //     err.message = "Authentication required";
        //     err.statusCode = 401;
        //     res.status(401);
        //     res.json(err);
        // }

        return res.json({
            user: user
        });

    }
);

module.exports = router;

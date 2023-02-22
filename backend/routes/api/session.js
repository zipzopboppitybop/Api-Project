// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required'),
    handleValidationErrors
];

const router = express.Router();

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { firstName, lastName, credential, password } = req.body;

        const user = await User.login({ firstName, lastName, credential, password });

        if (!user) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            err.title = 'Login failed';
            //err.errors = { credential: 'Invalid credenitals' };
            return next(err);
        }

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

router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else {
            const err = new Error();
            err.message = 'Authentication required';
            err.statusCode = 401;
            res.status(401);
            return res.json(err);
        };
    }
);


module.exports = router;

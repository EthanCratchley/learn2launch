const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Register User
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(400).json({ message: "Email already exists." });
        } else {
            const newUser = new User({
                name,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) return res.status(500).json({ message: err.message });

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) return res.status(500).json({ message: err.message });

                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json({ message: "User registered successfully." }))
                        .catch(err => res.status(500).json({ message: err.message }));
                });
            });
        }
    });
});

// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password." });
        }
        req.logIn(user, err => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({ success: true, message: "Logged in successfully" });
        });
    })(req, res, next);
});

// Logout user
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { 
            console.error('Logout error', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        // Destroy the session after logging out
        req.session.destroy(() => {
            res.status(200).json({ message: 'Logout successful' });
        });
    });
});

module.exports = router;

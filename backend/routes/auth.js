const express = require('express');
const User = require('../models/User'); // Adjust the path according to your structure
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        user = new User({
            name,
            email,
            password // This will be hashed in the User model's pre-save hook
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(400).json({ message: "No User Exists" });
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.status(200).json({ message: "Successfully Authenticated" });
                console.log(req.user);
            });
        }
    })(req, res, next);
});

const User = require('../models/User'); // Adjust the path if necessary

router.post('/register', async (req, res) => {
    // Your registration logic
    const newUser = new User({
        // Your User schema fields
    });

    await newUser.save(); // This will save the data to the 'registerusers' collection in MongoDB
});

// Export the router
module.exports = router;

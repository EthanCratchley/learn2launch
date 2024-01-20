const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport Config
require('./config/passport')(passport);

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// CORS middleware
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Static folder for frontend
app.use(express.static('../frontend'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

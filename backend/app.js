const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport Config
require('./config/passport')(passport);

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

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
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/signin.html'));
});

app.get('/userhome', (req, res) => {
    // This route is now unprotected for demonstration purposes
    res.sendFile(path.join(__dirname, '../frontend/pages/overview.html'));
});  

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

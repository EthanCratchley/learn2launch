const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

console.log(process.env.MONGODB_URI); // This should output your MongoDB URI
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

// CORS Middleware
app.use(cors());

// Bodyparser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express Session Middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'frontend')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'pages', 'index.html'));
  });  
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

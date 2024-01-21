const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const app = express();
const path = require('path');
const quizPdfRoute = require('./routes/quizPdfRoute');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

require('./config/passport')(passport);
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use('/api', quizPdfRoute);

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/signin.html'));
});

const flashcardRoutes = require('./routes/flashcardroutes');
app.use('/api', flashcardRoutes);

const flashcardsPdfRoute = require('./routes/flashcardsPdfRoute');
app.use('/api', flashcardsPdfRoute);

app.get('/userhome', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/overview.html'));
});

const quizRoutes = require('./routes/quizRoute');
app.use('/api', quizRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

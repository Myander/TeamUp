const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/user-routes');
const teamRoutes = require('./routes/team-routes');
const gameRoutes = require('./routes/game-routes');
const HttpError = require('./models/http-error');

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m8jyq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/games', gameRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
});
// executes when any middleware infront throws an error
app.use((error, req, res, next) => {
  // if (req.file) {
  //   fs.unlink(req.file.path, err => {
  //     console.log(err);
  //   });
  // }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  console.log(error);
  res.json({ message: error.message || 'An unkown error occured!' });
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000);
  })
  .catch(err => console.log(err));

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const sha256 = require('sha256');
require('dotenv').config();
const MongoStore = require('connect-mongo')(session);
const User = require('./model/user');
const Order = require('./model/order');
const Pizza = require('./model/pizza');

app.use(session({
  name: app.get('session cookie name'),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('session cookie name', 'sid');
app.use(express.static('../frontend/build'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/main', async (req,res) => {
  const findPizza = await Pizza.find({}); 
  res.json(findPizza);
})


app.post('/order', (req,res) => {
  const orderOfUser = new Order({
    name: req.body.name,
    email: req.body.email,
    street: req.body.street,
    house: req.body.house,
    apartment: req.body.apartment,
    comment: req.body.comment,
    date: req.body.date,
    user_id: req.body.user_id,
    order:  req.body.order ,
  });
   orderOfUser.save();
})

app.post('/signUp', async (req, res) => {
  const userInDB = await User.findOne({ email: req.body.email });
  if (userInDB && userInDB.email === req.body.email) {
    res.json({ answer: 'sorry, name has existed yet' });
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: sha256(req.body.password),
      custom_id: req.body.id,
    });
    newUser.save();
    req.session.user = req.body.name;
    res.json({ name: newUser.name, email: newUser.email, id: newUser.custom_id });
  }
})

app.post('/signIn', async(req, res) => {
  const userInDB = await User.findOne({ email: req.body.email });
  if (userInDB) {
    if (req.body.email === userInDB.email && sha256(req.body.password) === userInDB.password) {
      req.session.user = userInDB.name;
      res.json({ name: userInDB.name, id: userInDB.custom_id });
    }
  } else {
    res.json({ answer: 'no' });
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie(req.app.get('session cookie name'));
  res.json("logout");
});

app.post('/history', async (req,res) => {
  const orderInDB = await Order.find({ user_id: req.body.user_id });
  if(orderInDB) {
      res.json({order:orderInDB });
  } else {
      res.json({ answer: 'empty' });
    }
})

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server was started');
});


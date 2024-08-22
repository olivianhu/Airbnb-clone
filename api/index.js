const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const cookieParser = require("cookie-parser");
const download = require('image-downloader');
const multer = require('multer');
require('dotenv').config()
const app = express(); 
const fs = require('fs');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'jifoqj10t1h3otgvaqo124';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get('/test', (req, res) => {
  res.json('test');
});

app.post('/register', async (req, res) => {
  const {name, email, password} = req.body;

  try{
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    }) 
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
})

app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passCorrect = bcrypt.compareSync(password, userDoc.password);
    if (passCorrect) {
      jwt.sign({
        emailL:userDoc.email, 
        id:userDoc._id
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {
          sameSite: 'none',
          secure: true
        }).json(userDoc);
      });
    } else {
      res.status(422).json('incorrect password');
    }
  } else {
    res.json('not found');
  }
})

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name, email, _id} = await User.findById(userData.id);
      res.json({name, email, _id} );
    })
  } else {
    res.json(null);
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await download.image({
    url: link,
    dest: __dirname + '/uploads/' + newName
  });
  res.json(newName);
})

const photosMiddleware = multer({dest:'uploads'});
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path, originalname}  = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads/', ''));
  }
  res.json(uploadedFiles);
})

app.post('/places', async (req, res) => {
  const {
    title, address, addedPhotos, description, 
    perks, extraInfo, checkIn, checkOut, maxGuests, price
  } = req.body;
  const userData = await getUserDataFromReq(req);
  const placeDoc = await Place.create({
    owner: userData.id,
    title, address, photos:addedPhotos, description, 
    perks, extraInfo, checkIn, checkOut, maxGuests, price 
  });
  res.json(placeDoc);
})

app.get('/user-places', async (req, res) => {
  const {id} = await getUserDataFromReq(req);
  res.json(await Place.find({owner:id}));
})

app.get('/places/:id', async (req, res) => {
  const {id} = req.params;
  res.json(await Place.findById(id));
})

app.put('/places', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const {
    id, title, address, addedPhotos, description, 
    perks, extraInfo, checkIn, checkOut, maxGuests, price
  } = req.body;
  const placeDoc = await Place.findById(id);
  if (userData.id === placeDoc.owner.toString()) {
    placeDoc.set({
      title, address, photos:addedPhotos, description, 
      perks, extraInfo, checkIn, checkOut, maxGuests, price
    })
    await placeDoc.save();
    res.json('Place information updated');
  }
})

app.get('/places', async (req, res) => {
  res.json( await Place.find() );
})

app.post('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const {
    place, checkIn, checkOut, numGuests, name, phone, price
  } = req.body;

  try{
    const bookingDoc = await Booking.create({
      place, checkIn, checkOut, numGuests, name, phone, price,user:userData.id,
    })
    res.json(bookingDoc);
  } catch (e) {
    res.status(422).json(e);
  }
})

app.get('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json( await Booking.find({user:userData.id}).populate('place') )
});

app.listen(4000);
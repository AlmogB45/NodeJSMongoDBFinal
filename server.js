// server.js

// ייבוא התלויות
const express = require('express');
// const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// ייבוא הקונפיגורציה מהקובץ .env
require('dotenv').config();

// יצירת אפליקציה Express
const app = express();

// הגדרת מידע מוקשה עבור מסד הנתונים MongoDB
const DB_URI = process.env.DB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// חיבור למסד הנתונים MongoDB
mongoose.connect(DB_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// הגדרת מידות middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/api/users', userRoutes); 

// הגדרת נתיבים
app.get('/', (req, res) => {
  res.send('Welcome to the Personal Task Manager API!');
});

// הפעלת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(3000, () => console.log('Server listening on port 3000'));



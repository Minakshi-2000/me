import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://kminakshi380:Minujha23@cluster0.gfu9h.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas', err);
});

// Default route for '/'
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

// Server listening on port 5000
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

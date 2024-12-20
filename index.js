// configuring .env variables
import { config } from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';


config();

const dbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(process.env.DB_URL, dbOption)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

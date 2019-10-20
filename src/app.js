import express, { json } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

// Importing routes
import taskRoutes from './routes/tasks';

// initialization
const app = express();

mongoose.connect('mongodb://localhost:27017/mevn-database', {useNewUrlParser: true})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));

// middlewares
app.use(morgan('dev'));

app.use(json());

// Static files
app.use(express.static(__dirname + '/public'));

// routes
app.use('/api/tasks', taskRoutes);

export default app;
// Node.js environment
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './src/routes.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware for JSON parsing
app.use(morgan('dev')); // Logging middleware
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('./src/public'));

// Use modularized routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
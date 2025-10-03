import express from 'express';
import cors from 'cors';
import routes from './routes/tokensRoute.js';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file


const app = express();
const PORT = process.env.PORT || 5000;

// First of all we need to enable CORS
app.use(cors({
    // Allow requests from this origin which is my React frontend
    // I can replace it with '*' to allow all origins
    origin: 'http://localhost:3000', 
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the tokens routes at /api
app.use('/api', routes);

app.listen(PORT, () => {
  console.log('-------------------------------------------------------------------');
  console.log(`Server Environment: ${process.env.ENV || 'development'}`);
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints: http://localhost:${PORT}/api/tokens - GET, http://localhost:${PORT}/api/tokens/:id/renew - POST`);
});


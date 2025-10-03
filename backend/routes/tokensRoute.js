import express from 'express';
import { getTokens, renewToken } from '../controllers/tokensController.js';

const router = express.Router();


// Get /api/tokens - Get all tokens with optional filters
router.get('/tokens', getTokens);


// POST /api/tokens/:id/renew - Renew token 
router.post('/tokens/:id/renew', renewToken);

export default router;
import express from 'express';
import { generateShortUrl, getAnalytics } from '../controllers/url.controller.js'; 

const router = express.Router();

router.post('/',generateShortUrl);
router.get('/analytics/:shortId', getAnalytics)


export default router;
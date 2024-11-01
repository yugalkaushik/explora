import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/test',(req, res) => {
    res.send('User route working');
});

export default router;
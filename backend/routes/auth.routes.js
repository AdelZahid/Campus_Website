import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.json({
        data: 'Hello from the backend!',
    });
});

export default router;

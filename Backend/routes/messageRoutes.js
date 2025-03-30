const express = require('express');
const {sendMessage, getMessage} = require("../controller/messageController");
const authmiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/send', authmiddleware, sendMessage);
router.get('/history', authmiddleware, getMessage);

module.exports = router;
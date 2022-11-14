const express = require('express');
const { register, fetchUser, login, updateVoteStatus } = require('../controller/authController');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.get('/users', fetchUser);
router.post('/votestatus/:id', updateVoteStatus);


module.exports = router
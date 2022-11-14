const express = require('express');
const { create, list, updateVote } = require('../controller/partiesController');
const { auth } = require('../utils/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/parti', upload.single('image'), create);
router.get('/parties', list);
router.post('/voteUpdate/:id', updateVote);



module.exports = router
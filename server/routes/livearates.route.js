const express = require('express');
const liveRateController = require('../controllers/liverates.controller');
const router = express.Router();

router.get('/liverates', liveRateController.getliverate);

module.exports = router;

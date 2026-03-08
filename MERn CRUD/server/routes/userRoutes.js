const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.get('/status',userController.getStatus);

module.exports = router;
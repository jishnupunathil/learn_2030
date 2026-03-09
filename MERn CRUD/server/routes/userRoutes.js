const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.get('/status',userController.getStatus);
router.get('/search/:query',userController.searchUsers);
router.get('/:id',userController.getUserById);




module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.get('/status',userController.getStatus);
router.get('/search/:query',userController.searchUsers);
router.get('/:id',userController.getUserById);
router.get('/',userController.allUsers);
router.post('/',userController.createUser);
router.put('/:id',userController.updateUser);




module.exports = router;
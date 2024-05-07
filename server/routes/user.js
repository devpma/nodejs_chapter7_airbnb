const express = require('express');
const { register, login, updateUserDetails } = require('../controllers/userController')
const router = express.Router();

const multer = require('multer');
const upload = multer({dest: '/tmp'})


router.route('/register').post(register);
router.route('/login').post(login);

router.route('/').put(updateUserDetails)

router.route('/logout').get(logout);

router.route('/picture').post(upload.single('pictute, 1'),uploadPicture)

module.exports = router
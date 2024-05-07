const express = require('express');
const { register, singlePlace, serchPlaces } = require('../controllers/placeController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const router = express.Router();

router.route('/').post(isLoggedIn, addPlace)

router.route('/').get(getPlaces);

router.route('/user').get(isLoggedIn, userPlaces);

router.route('/:id').get(singlePlace);

router.route('/:key').get(serchPlaces);

module.exports = router
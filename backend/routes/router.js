const express = require('express');
const { decodeJwt, refreshToken } = require('../controllers/jwt');
const { login } = require('../controllers/login');
const router = new express.Router();

router.post('/api/login',login)
router.post('/api/decodeJwt',decodeJwt)
router.post('/api/refresh/token',refreshToken)

module.exports = router
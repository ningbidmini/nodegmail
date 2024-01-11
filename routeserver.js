const express = require('express');
const router = express.Router();
const view = require('./view');
router.get('/login',view('admin.login'));
router.get('/navbar',view('admin.navbar'));
router.get('/',view('admin.main'));
module.exports = router;

const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlMemory = require('../controllers/memory.controller');

const jwtHelper = require('../config/jwtHelper');

// Route authenticate
router.post('/register', ctrlUser.registerUser);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

// Route memory
router.get('/memories', ctrlMemory.allMemories);
router.get('/memory', ctrlMemory.oneMemory);
router.post('/registermemory', ctrlMemory.registerMemory());


module.exports = router;




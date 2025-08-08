const express = require('express');
const route = express.Router();
const { handleRecipePrompt } = require('../Controllers/aiController');

route.post('/ask', handleRecipePrompt);

module.exports = route;


const express = require('express');
const service = require('../domain/files/filesService');
const router = express.Router();

router.get('/files/data', service.GetFilesData);
  
module.exports = router;
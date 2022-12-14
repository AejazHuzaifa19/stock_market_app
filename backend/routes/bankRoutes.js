const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerEmail, getData, getFilterData, getUploadedFiles, uploadFile} = require('../controllers/bankController')

router.get('/', getData);

router.get('/getUploadedFiles', getUploadedFiles)

router.get('/filter', getFilterData);

router.post('/registerEmail', registerEmail )

router.post('/upload',  uploadFile);

module.exports = router;

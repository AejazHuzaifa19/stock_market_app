const express = require('express');
const router = express.Router();
const { getData, getFilterData, getUploadedFiles, uploadFile, updateInfo, deleteInfo, setInfo } = require('../controllers/bankController')

router.get('/', getData);

router.get('/getUploadedFiles', getUploadedFiles)

router.get('/filter', getFilterData);

router.post('/', setInfo);

router.post('/upload', uploadFile);

router.put('/:id', updateInfo);

router.delete('/:id', deleteInfo);

module.exports = router;

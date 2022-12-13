const express = require('express');
const router = express.Router();
const multer = require('multer');
/*const storage = multer.diskStorage(
    {
      destination: "uploads",
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    });
  
  const upload = multer({
    storage: storage
  }).single('uploadedfile')*/

const { getData, getFilterData, getUploadedFiles, uploadFile, updateInfo, deleteInfo, setInfo } = require('../controllers/bankController')

router.get('/', getData);

router.get('/getUploadedFiles', getUploadedFiles)

router.get('/filter', getFilterData);

router.post('/', setInfo);

router.post('/upload',  uploadFile);

router.put('/:id', updateInfo);

router.delete('/:id', deleteInfo);

module.exports = router;

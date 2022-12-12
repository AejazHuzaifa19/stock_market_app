const express = require('express');
const router = express.Router();
const {getData,getFilterData,updateInfo, deleteInfo, setInfo} = require('../controllers/bankController')

router.get('/',getData);

router.get('/filter',getFilterData);

router.post('/',setInfo);

router.put('/:id',updateInfo);

router.delete('/:id',deleteInfo);

module.exports = router;

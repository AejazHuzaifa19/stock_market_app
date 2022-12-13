
const asyncHandler = require('express-async-handler')
const fs = require('fs')
const { parse } = require('csv-parse');
const json2csv = require('json2csv').parse;
const fileUploadModel = require('../models/fileUploadModel')
const multer = require('multer');

// Storage
const storage = multer.diskStorage(
  {
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  });

const upload = multer({
  storage: storage
}).single('uploadedfile')


//@desc gets information< ADD COMMENAT HERE>
//@route
//@access
const getData = asyncHandler(async (req, res) => {
  console.log('getdata');
  let filename = req.query.filename;
  if (filename === '' || !filename) {
    return res.status(400).json({ status: 400, message: 'Please select a file' })
  }
  const data = fs.readFile(`backend/uploaded/${filename}`, 'utf-8', (err, data) => {
    if (err) {
      console.log('err',);
      return res.status(400).json({ status: 400, message: err.message })
    }
    parse(data, { columns: true }, (err, csvData) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message })
      }
      res.status(200).json({ message: 'getting infos', data: csvData })
    });
  });
});


const getUploadedFiles = asyncHandler(async (req, res) => {
  console.log('a call made')
  fileUploadModel.find({ email: "huzaifaaejaz@gmail.com" }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result)
  });
});

//@desc gets information< ADD COMMENAT HERE>
//@route
//@access
const getFilterData = asyncHandler(async (req, res) => {
  console.log('filter data');
  let stock = req.query.stock;
  let filename = req.query.filename;
  console.log(stock);
  if (filename === "" || !filename ) {
    console.log('a');
    return res.status(400).json({ status: 400, message: 'Please select a file' })
  }

  if (!stock || stock === "") {
    console.log('b');
    return res.status(400).json({ status: 400, message: 'The ticker you entered does not exist in the dataset.' })
  }

  const data = fs.readFile(`backend/uploaded/${filename}`, 'utf-8', (err, data) => {
    console.log('c');
    if (err) {
      return res.status(400).json({ status: 400, message: err.message })
    }
    parse(data, { columns: true }, (err, csvData) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message })
      }
      const query = req.query;
      console.log(query);
      const filteredData = csvData.filter(data => {
        if (data['stock'] !== stock) {
          return false;
        }
        return true;
      });

      console.log(filteredData);

      if (filteredData.length === 0) {
        return res.status(400).json({ status: 400, message: 'The ticker you entered does not exist in the dataset.' })
      }
      return res.status(200).json({ message: 'getting infos', data: filteredData })
    });
  });
})

//@desc gets information< ADD COMMENAT HERE>
//@route
//@access
const setInfo = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    res.status(400)
    throw new Error('please add a text field')
  }

  res.status(200).json({ message: 'setting infos' })
})


const uploadFile = asyncHandler(async (req, res) => {
  /*if(!req.body.text){
      res.status(400)
      throw new Error('please add a text field')
  }*/
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('here2 ');
      console.log(req.body.filename);
      const newFile = new fileUploadModel({
        file: {
          data: req.file.filename,
          contentType: "text/csv"
        },
        filename: req.body.filename,
        email: 'huzaifaaejaz@gmail.com'
      });
      newFile.save().then(() => res.send('successfully uploaded')).catch(err => console.log(err));
    }
  });
  res.status(200).json({ message: 'setting infos' })
})


//@desc gets information< ADD COMMENAT HERE>
//@route
//@access
const updateInfo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update infos ${req.params.id}` })
})

//@desc gets information< ADD COMMENAT HERE>
//@route
//@access
const deleteInfo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete infos  ${req.params.id}` })
})

module.exports = {
  getData, getFilterData, getUploadedFiles, setInfo, uploadFile, updateInfo, deleteInfo
}
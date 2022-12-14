
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
  storage: storage,
  accept: ['text/csv', 'application/octet-stream'],
  debug: true
}).single('uploadedfile')

const registerEmail = asyncHandler(async (req, res) => {
  let email = req.body.email;
  if (!email || email == '') {
    return res.status(400).json({ status: 400, message: 'Please provide the required url-param: email.' })
  }
  res.send({ message: 'email stored' })
});

/**
 * reads data from the specified file.
 * @return json response containing the file data.
 */
const getData = asyncHandler(async (req, res) => {
  let filename = req.query.filename;
  if (filename === '' || !filename) {
    return res.status(400).json({ status: 400, message: 'Please select a file.' })
  }
  const data = fs.readFile(`uploads/${filename}`, 'utf-8', (err, data) => {
    if (err) {
      return res.status(400).json({ status: 400, message: err.message })
    }
    parse(data, { columns: true }, (err, csvData) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message })
      }
      res.status(200).json({ message: 'File data fetched successfully.', data: csvData })
    });
  });
});

/**
 * fetches a list of all uploaded files by the user.
 * @return sends an array of filenames.
 */
const getUploadedFiles = asyncHandler(async (req, res) => {
  let email = req.query.email;
  fileUploadModel.find({ email: email }, (err, result) => {
    if (err) {
      res.send(err);
    }
    //res.status(200).json({ message: 'Uploaded files data fetched successfully.', data: result })
    res.send(result)
  });
});

/**
 * Filters the data fetched from the file based on the stock tickername.
 * @return json response containing filtered data
 */
const getFilterData = asyncHandler(async (req, res) => {
  let stock = req.query.stock;
  let filename = req.query.filename;

  if (filename === "" || !filename) {
    return res.status(400).json({ status: 400, message: 'Please select a file.' })
  }

  if (!stock || stock === "") {
    return res.status(400).json({ status: 400, message: 'The ticker you entered does not exist in the dataset.' })
  }

  const data = fs.readFile(`uploads/${filename}`, 'utf-8', (err, data) => {
    if (err) {
      return res.status(400).json({ status: 400, message: err.message })
    }
    parse(data, { columns: true }, (err, csvData) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message })
      }
      const query = req.query;
      const filteredData = csvData.filter(data => {
        if (data['stock'] !== stock) {
          return false;
        }
        return true;
      });

      if (filteredData.length === 0) {
        return res.status(400).json({ status: 400, message: 'The ticker you entered does not exist in the dataset.' })
      }
      return res.status(200).json({ message: 'Filtered file data fetched successfully.', data: filteredData })
    });
  });
})

/**
 * Uploads a file to the uploads folder and writes to mongodb database
 * @return json data containing the uploaded files name.
 */
const uploadFile = asyncHandler(async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message })
    }
    else {
      if (!req.file.filename || !req.body.filename) {
        res.status(400).json({ message: 'Unable to read file' })
      }
      const newFile = new fileUploadModel({
        file: {
          data: req.file.filename,
          contentType: "text/csv"
        },
        filename: req.body.filename,
        email: req.body.email
      });
      newFile.save().then((data) => {
        res.status(200).json({ message: 'Successfully uploaded file.', filename: data.filename })
      }).catch(err => res.status(400).json({ message: err.message }));
    }
  });
})


module.exports = {
  registerEmail, getData, getFilterData, getUploadedFiles, uploadFile,
}
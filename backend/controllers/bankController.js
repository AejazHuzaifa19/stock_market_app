const asyncHandler = require('express-async-handler')
const fs = require('fs')
const { parse } = require('csv-parse');
const json2csv = require('json2csv').parse;


//@desc gets information< ADD COMMENAT HERE>
//@route
//@access
const getData = asyncHandler(async (req, res) => {
    const data = fs.readFile('backend/uploaded/dow_jones_index.data', 'utf-8', (err, data) => {
        if (err) {
          throw err;
        }
        parse(data, { columns: true }, (err, csvData) => {
          if (err) {
            throw err;
          }
          const query = req.query;
          console.log(query);

          res.status(200).json({message:'getting infos', data: csvData})
        });
      });
})
//@desc gets information< ADD COMMENAT HERE>
//@route
//@access
const getFilterData = asyncHandler(async (req, res) => {
    const data = fs.readFile('backend/uploaded/dow_jones_index.data', 'utf-8', (err, data) => {
        if (err) {
          throw err;
        }
        parse(data, { columns: true }, (err, csvData) => {
          if (err) {
            throw err;
          }
          const query = req.query;
          const filteredData = csvData.filter(data => {
            for (const key in query) {
              if (data[key] !== query[key]) {
                res.status(400).json({message:'Ticker does not exist'})
              }
            }
            return true;
          });
          res.status(200).json({message:'getting infos', data: filteredData})
        });
      });
})

//@desc gets information< ADD COMMENAT HERE>
//@route
//@access
const setInfo = asyncHandler(async (req, res) => {
    console.log(req.body);
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }
   
    res.status(200).json({message:'setting infos'})
})


//@desc gets information< ADD COMMENAT HERE>
//@route
//@access
const updateInfo = asyncHandler(async (req, res) => {
    res.status(200).json({message:`update infos ${req.params.id}`})
})

//@desc gets information< ADD COMMENAT HERE>
//@route
//@access
const deleteInfo = asyncHandler(async (req, res) => {
    res.status(200).json({message:`delete infos  ${req.params.id}`})
})

module.exports ={
    getData, getFilterData, setInfo,updateInfo, deleteInfo
}
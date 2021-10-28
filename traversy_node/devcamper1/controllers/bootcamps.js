import { Bootcamp } from '../models/Bootcamp.js';

// @desc  Get all bootcamps
// @route GET/api/v1/bootcamps
// @access Public

const getBootcamps = async(req, res, next) => {
  try{
    const bootcamps = await Bootcamp.find()
    res.status(200).json({success: true, count: bootcamps.length, data : bootcamps})
  }
  catch{
    res.status(400).json({success: false})
  }
};

// @desc Get a single bootcamp
//@route GET/api/v1/bootcamps:id
//@access Public

const getBootcamp = async(req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) {
      return res.status(400).json({
        success: false
      })
    }
    res.status(200).json({success: true, data: bootcamp})
  }
  catch(err) {
    // res.status(400).json({success: false})
    next(err)
  }
};

// @desc  Create new bootcamp
// @route POST/api/v1/bootcamps
// @access Private

const createBootcamp = async(req, res, next) => {
  try{
    const bootcamp = await Bootcamp.create(req.body)
    console.log(req.body)
    res.status(201).json({ success: true, msg: 'Create new bootcamp', data: bootcamp})
  }
  catch{
    res.status(400).json({success: false})
  }
};

// @desc  Update bootcamp
// @route PUT/api/v1/bootcamps:id
// @access Private

const updateBootcamp = async(req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if(!bootcamp) {
     return res.status(400).json({success: false})
    }
    res.status(200).json({
      success: true,
      msg: 'Update a bootcamp',
      data: bootcamp
    })
  }
  catch{
    res.status(400).json({success: false})
  }
 
};

// @desc  DELETE bootcamp
// @route GET/api/v1/bootcamps/:id
// @access Private

const deleteBootcamp = async(req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id)
    if(!bootcamp) {
      return res.status(400).json({
        success: false
      })
    }
    res.status(200).json({
      success: true,
      msg: 'Delete assign bootcamp',
      data: {}
    })
  }
  catch(err) {
    res.status(400).json({
      success: false
    })
  }
};

export {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
};

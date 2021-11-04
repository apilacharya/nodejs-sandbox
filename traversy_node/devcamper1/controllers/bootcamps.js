import { Bootcamp } from '../models/Bootcamp.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import geocoder from '../utils/geocoder.js';

// @desc  Get all bootcamps
// @route GET/api/v1/bootcamps
// @access Public

const getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query)
  console.log(queryStr)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
  query = await Bootcamp.find(JSON.parse(queryStr))
  const bootcamps = await query

  console.log(queryStr)
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc Get a single bootcamp
//@route GET/api/v1/bootcamps:id
//@access Public

const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    throw new ErrorResponse(
      `Bootcamp not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc  Create new bootcamp
// @route POST/api/v1/bootcamps
// @access Private

const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  console.log(req.body);
  res
    .status(201)
    .json({ success: true, msg: 'Create new bootcamp', data: bootcamp });
});

// @desc  Update bootcamp
// @route PUT/api/v1/bootcamps:id
// @access Private

const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    throw new ErrorResponse(
      `Bootcamp not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({
    success: true,
    msg: 'Update a bootcamp',
    data: bootcamp,
  });
});

// @desc  DELETE bootcamp
// @route GET/api/v1/bootcamps/:id
// @access Private

const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
  if (!bootcamp) {
    throw new ErrorResponse(
      `Bootcamp not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({
    success: true,
    msg: 'Delete assign bootcamp',
    data: {},
  });
});

// @desc  Get bootcamps within a radius
// @route GET/api/v1/bootcamps/radius/:zipcode/:distance
// @access Private

const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lang = loc[0].longitude;

  // calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius: 3,963 mi / 6378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lang, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

export {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
};

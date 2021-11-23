import { Bootcamp } from '../models/Bootcamp.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import geocoder from '../utils/geocoder.js';

// @desc  Get all bootcamps
// @route GET/api/v1/bootcamps
// @access Public

const getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select Fields 
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 20;
  console.log(page)
  const limit = parseInt(req.query.limit, 10) || 25;
  const skip = (page - 1) * limit;
  const startIndex = (page -1) * limit
  const endIndex = page * limit
  const total = await Bootcamp.countDocuments()
  

  query = query.skip(skip).limit(limit);



  // Executing query
  const bootcamps = await query;


  // Pagination result
  const pagination = {}


  if(endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

if(startIndex > 0) {
  pagination.prev = {
    page: page - 1,
    limit
  }
}

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps
  })
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

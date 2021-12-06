import path from 'path';
import { Bootcamp } from '../models/Bootcamp.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import geocoder from '../utils/geocoder.js';
import { env } from '../config/env.js';

// @desc  Get all bootcamps
// @route GET/api/v1/bootcamps
// @access Public

const getBootcamps = asyncHandler(async (req, res, next) => {
 

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
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
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    throw new ErrorResponse(
      `Bootcamp not found with id of ${req.params.id}`,
      404
    );
  }

  bootcamp.remove();

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

// @desc  Upload photo for bootcamp
// @route PUT/api/v1/bootcamps/:id/photo
// @access Private

const bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    throw new ErrorResponse(
      `Bootcamp not found with id of ${req.params.id}`,
      404
    );
  }
  console.log(req.files);

  if (!req.files) {
    throw new ErrorResponse(`Please upload a file.`, 404);
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    throw new ErrorResponse(`Please upload an image file`, 404);
  }

  // Check filesize
  if (file.size > env.MAX_FILE_UPLOAD) {
    throw new ErrorResponse(
      `Please upload an image less than ${env.MAX_FILE_UPLOAD}`,
      404
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp.id}${path.parse(file.name).ext}`;

  file.mv(`${env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      throw new ErrorResponse(`Problem with file upload`, 500);
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

export {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
};

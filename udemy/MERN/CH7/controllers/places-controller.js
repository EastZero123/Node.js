const { v4: uuidv4 } = require("uuid")
const { validationResult } = require("express-validator")

const HttpError = require("../models/http-error")
const getCoordsForAddress = require("../util/location")

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous building",
    // imageUrl:
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBkEf8hfRY4wjCPvOUQRJQaFL4fi0nJGilgw&usqp=CAU",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    address: "20 W 34th St., New York, NY 10001 미국",
    creator: "u1",
  },
]

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId
  })

  if (!place) {
    throw new HttpError("Something error", 404)
  }

  res.json({ place })
}

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid

  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId
  })

  if (!places || places.length === 0) {
    throw new HttpError("Something error", 404)
  }

  res.json({ places })
}

const createPlace = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid error", 422))
  }

  const { title, description, address, creator } = req.body

  let coordinates
  try {
    coordinates = await getCoordsForAddress(address)
  } catch (error) {
    return next(error)
  }

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  }

  DUMMY_PLACES.push(createdPlace)

  res.status(201).json({ place: createdPlace })
}

const updatePlace = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid error", 422)
  }

  const { title, description } = req.body
  const placeId = req.params.pid

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) }
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId)
  updatedPlace.title = title
  updatedPlace.description = description

  DUMMY_PLACES[placeIndex] = updatedPlace

  res.status(200).json({ place: updatedPlace })
}

const deletePlace = (req, res, next) => {
  // const { title, description, coordinates, address, creator } = req.body
  const placeId = req.params.pid
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Not Place", 404)
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId)
  res.status(200).json({ message: "Delete place" })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace

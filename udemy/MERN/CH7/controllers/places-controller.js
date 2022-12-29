const uuid = require("uuid/v4")

const HttpError = require("../models/http-error")

const DUMMY_PLACES = [
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId
  })

  if (!place) {
    throw new HttpError("Something error", 404)
  }

  res.json({ place })
}

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body
  const createdPlace = {
    id: uuid(),
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
  const { title, description, coordinates, address, creator } = req.body
}

exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace

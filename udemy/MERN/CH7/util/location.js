const axios = require("axios")
const HttpError = require("../models/http-error")

const API_KEY = "AIzaSyDRlqn0Zncq77BPxS-FhzxtoyuLY2Rpt_E"

async function getCoordsForAddress(address) {
  //   return {
  //     lat: 40.7484405,
  //     lng: -73.9856644,
  //   }
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  )
  //   console.log(response)

  const data = response.data

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError("Not Location", 422)

    throw error
  }

  console.log(data)

  const coordinates = data.results[0].geometry.location

  return coordinates
}

module.exports = getCoordsForAddress

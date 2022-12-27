import React from "react"
import { useParams } from "react-router-dom"
import PlaceList from "../components/PlaceList"

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous building",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBkEf8hfRY4wjCPvOUQRJQaFL4fi0nJGilgw&usqp=CAU",
    address: "20 W 34th St., New York, NY 10001 미국",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
]

const UserPlaces = () => {
  const userId = useParams().userId
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId)
  return <PlaceList items={loadedPlaces} />
}

export default UserPlaces

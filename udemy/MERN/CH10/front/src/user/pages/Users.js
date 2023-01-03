import React from "react"

import UsersList from "../components/UsersList"

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "CHOI",
      image:
        "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg",
      places: 3,
    },
  ]

  return <UsersList items={USERS} />
}

export default Users

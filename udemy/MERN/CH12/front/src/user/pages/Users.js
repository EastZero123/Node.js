import React, { useEffect, useState } from "react"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"
import iconv from "iconv-lite"

import UsersList from "../components/UsersList"

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        )

        setLoadedUsers(responseData.users)
      } catch (error) {}
    }
    fetchUsers()
  }, [sendRequest])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/portfolio/portfolio.do",
          {
            headers: { "Content-Type": "application/json; charset=UTF-8" },
          }
        )
        console.log(response.json())
        const responseData = await response.json()
        console.log(JSON.parse(responseData))
      } catch (error) {}
    }
    fetchUsers()
  }, [])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  )
}

export default Users

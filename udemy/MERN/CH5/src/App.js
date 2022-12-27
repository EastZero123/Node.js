import React from "react"
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"

import NewPlace from "./places/pages/NewPlace"
import UserPlaces from "./places/pages/UserPlaces"
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import Users from "./user/pages/Users"

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  )
}
export default App

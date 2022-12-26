import React from "react"
import { Redirect, Route, Router, Switch } from "react-router-dom"

import NewPlace from "./places/pages/NewPlace"
import Users from "./user/pages/Users"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}
export default App

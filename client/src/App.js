import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Nav from "./components/Nav";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Auth/Admin";

import Coach from "./components/Coach/Coach";
import Driver from "./components/Driver/Driver";
import Routes from "./components/Route/Route";
// import Profile from "./components/Profile/Profile";
import Ticket from "./components/Ticket/Ticket";
import CoachTrip from "./components/CoachTrip/CoachTrip";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/auth" />} />
          <Route path="/routes" exact component={Routes} />
          <Route path="/coachs" exact component={Coach} />
          <Route path="/drivers" exact component={Driver} />
          <Route path="/coachtrips" exact component={CoachTrip} />
          <Route path="/tickets" exact component={Ticket} />
          {/* <Route path="/profile" exact component={Profile} /> */}
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/routes" />)}
          />
          <Route
            path="/admin"
            exact
            component={() => (!user ? <Admin /> : <Redirect to="/routes" />)}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

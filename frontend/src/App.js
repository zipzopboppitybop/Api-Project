// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList/index.";
import SingleSpot from "./components/SingleSpot";
import SpotInput from "./components/SpotForm";
import CurrentUserSpots from "./components/CurrentUserSpots";
import UpdateSpot from "./components/UpdateSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={SpotList} />
          <Route path='/spots/new' component={SpotInput} />
          <Route exact path='/spots/current' component={CurrentUserSpots} />
          <Route path='/spots/:id/edit' component={UpdateSpot} />
          <Route path='/spots/:id' component={SingleSpot} />
        </Switch>
      )}
    </>
  );
}

export default App;

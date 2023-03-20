// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList/index.";
import SingleSpot from "./components/SingleSpot";
import SpotInput from "./components/SpotForm";
import CurrentSpots from "./components/CurrentSpots";
import CurrentReviews from "./components/CurrentReviews";


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
          <Route exact path='/spots/current' component={CurrentSpots} />
          <Route path='/spots/:id' component={SingleSpot} />
          <Route exact path='/reviews/current' component={CurrentReviews} />

        </Switch>
      )}
    </>
  );
}

export default App;

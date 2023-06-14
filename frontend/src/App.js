// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList/index.";
import SingleSpot from "./components/SingleSpot";
import SpotInput from "./components/SpotForm";
import CurrentUserSpots from "./components/CurrentUserSpots";
import CurrentReviews from "./components/CurrentUserReviews";
import UpdateSpot from "./components/UpdateSpot";
import ErrorPage from "./components/ErrorPage";


const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={SpotList} />
          <Route path='/spots/new' component={SpotInput} />
          <Route exact path='/spots/current' component={CurrentUserSpots} />
          <Route exact path='/reviews/current' component={CurrentReviews} />
          <Route path='/spots/:id/edit' component={UpdateSpot} />
          <Route path='/spots/:id' component={SingleSpot} />
          <ErrorPage />
        </Switch>
      )}
    </>
  );
}

export default App;

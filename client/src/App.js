import React, { useState } from "react";
import { Route } from "react-router-dom";

import SavedList from "./Movies/SavedList";
import Navigation from "./Navigation";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = (e, movie) => {
    e.preventDefault();
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Navigation />
      <Route
        render={props => (
          <MovieList {...props} addToSavedList={addToSavedList} />
        )}
        path="/"
        exact={true}
      />
      <Route path="/movie/:id" component={Movie} />
    </div>
  );
};

export default App;

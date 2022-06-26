import React from "react";

import GenresItem from "./GenresItem";
import Card from "../../shared/components/UIElements/Card";
import "./GenresList.css";
import AddGenreItem from "./AddGenreItem";

const GenresList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No genre found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="genre-list">
      {props.items.map((genre) => (
        <GenresItem
          key={genre.id}
          id={genre.id}
          image={genre.image}
          name={genre.name}
          details={genre.details}
        />
      ))}
      <AddGenreItem id="ADD" name="Add Genre" onClose={props.onAdded} />
    </ul>
  );
};

export default GenresList;

import React from "react";

import GenresList from "../components/GenresList";
import { useParams } from "react-router-dom";

const Genres = () => {
  const language = useParams().language;

  const GENRES = [
    {
      id: "30",
      name: "1930-1939",
      image: require("../../shared/images/30.jpg"),
      details: `${language} music from 30's decade`,
    },
    {
      id: "40",
      name: "1940-1949",
      image: require("../../shared/images/40.jpg"),
      details: `${language} music from 40's decade`,
    },
    { 
      id: "50",
      name: "1950-1959",
      image: require("../../shared/images/50.jpg"),
      details: `${language} music from 50's decade`,
    },
    {
      id: "60",
      name: "1960-1969",
      image: require("../../shared/images/60.jpg"),
      details: `${language} music from 60's decade`,
    },
  ];

  return <GenresList items={GENRES} />;
};

export default Genres;

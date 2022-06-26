import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import GenresList from "../components/GenresList";

const Genres = () => {
  const language = useParams().language;

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    await axios.get("http://localhost:5000/api/genres").then((res) => {
      console.log(res.data);
      res.data.genres.forEach((genre) => {
        if (genre.type === "decade")
          genre.details = language + " " + genre.details;
      });
      setGenres(res.data.genres);
    });
  };
  return <GenresList items={genres} onAdded={getGenres} />;
};

export default Genres;

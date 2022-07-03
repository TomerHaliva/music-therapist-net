import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import GenresList from "../components/GenresList";
import Loading from "../../shared/components/UIElements/Loading";

const Genres = () => {
  const language = useParams().language;

  const [genres, setGenres] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    await axios.get("http://localhost:5000/api/genres").then((res) => {
      const genres = res.data.genres.sort((a, b) => (a.name > b.name ? 1 : -1));

      genres.forEach((genre) => {
        if (genre.type === "decade")
          genre.details = language + " " + genre.details;
      });

      setGenres(res.data.genres);
      setLoaded(true);
    });
  };
  if (loaded) return <GenresList items={genres} onAdded={getGenres} />;
  else return <Loading />;
};

export default Genres;

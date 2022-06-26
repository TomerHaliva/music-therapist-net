import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";

import "./GenresItem.css";

const AddGenreItem = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const [genreInput, setGenreInput] = useState("");

  const openAddHandler = () => setShowAdd(true);
  const closeAddHandler = () => setShowAdd(false);

  const addGenreForm = (
    <div className="genre-item__add-genre-form">
      <label>Enter Genre Name</label>
      <input onBlur={(genre) => setGenreInput(genre.target.value)}></input>
    </div>
  );

  const addGenreHandler = async (event) => {
    event.preventDefault();
    const genre =
      genreInput.charAt(0).toUpperCase() +
      genreInput.slice(1, genreInput.length);
    const genreItem = {
      id: genre,
      name: genre,
      // image: imgURL,
      details: `Music from ${genre} genre`,
      type: "genre",
    };

    await axios.post("http://localhost:5000/api/genres", genreItem).then(() => {
      closeAddHandler();
      props.onClose();
    });
  };

  return (
    <React.Fragment>
      <Modal
        show={showAdd}
        onCancel={closeAddHandler}
        footer={
          <React.Fragment>
            <button id="cancel" onClick={closeAddHandler}>
              CANCEL
            </button>
            <button
              id="submit"
              type="submit"
              onClick={(e) => addGenreHandler(e)}
            >
              SUBMIT
            </button>
          </React.Fragment>
        }
        footerClass="add-genre"
      >
        <div className="addGenre-container">
          <h2>Add a Genre</h2>
          {addGenreForm}
        </div>
      </Modal>
      <li onClick={openAddHandler} className="genre-item">
        <Card className="genre-item__content">
          <Link to="#">
            <div id="addGenre" className="genre-item__image">
              <button className="genre-item__add">+</button>
            </div>
            <br></br>
            <div className="genre-item__info">
              <h2>{props.name}</h2>
              <h3>{props.country}</h3>
            </div>
          </Link>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default AddGenreItem;

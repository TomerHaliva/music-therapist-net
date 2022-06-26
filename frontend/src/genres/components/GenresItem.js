import React from "react";
import { Link, useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Avatar from "../../shared/components/UIElements/Avatar";

import "./GenresItem.css";

const GenresItem = (props) => {
  const language = useParams().language;

  return (
    <li className="genre-item">
      <Card className="genre-item__content">
        <Link to={`/home/${language}/${props.id}`}>
          <div className="genre-item__image">
            {props.name}
            {/* <Avatar image={props.image} alt={props.name} /> */}
          </div>
          <br></br>
          <div className="genre-item__info">
            <h2>{props.name}</h2>
            <h3>{props.details}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default GenresItem;

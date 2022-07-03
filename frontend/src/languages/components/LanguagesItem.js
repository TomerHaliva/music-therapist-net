import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Avatar from "../../shared/components/UIElements/Avatar";

import "./LanguagesItem.css";

const LanguagesItem = (props) => {
  const localStorageHandler = () => {
    localStorage.setItem("language", JSON.stringify(props)); 
  };
  return (
    <li className="language-item">
      <Card className="language-item__content">
        <Link to={`/home/${props.name}`} onClick={localStorageHandler}>
          <div className="language-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <br></br>
          <div className="language-item__info">
            <h2>{props.name}</h2>
            <h3>{props.country}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default LanguagesItem;

import React from "react";

import LanguagesItem from "./LanguagesItem";
import AddLanguagesItem from "./AddLanguageItem";
import Card from "../../shared/components/UIElements/Card";

import "./LanguagesList.css";

const LanguagesList = (props) => {
  console.log(props.items)
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No language found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="language-list">
      {props.items.map((language) => (
        <LanguagesItem
          key={language.id}
          id={language.id}
          image={language.image}
          name={language.name}
          country={language.country}
        />
      ))}
      <AddLanguagesItem
      id="ADD"
      name="Add Language"
      onClose={props.onAdded}
      />
    </ul>
  );
};

export default LanguagesList;

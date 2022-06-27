import React from "react";

import LanguagesItem from "./LanguagesItem";
import AddLanguagesItem from "./AddLanguageItem";
import Loading from "../../shared/components/UIElements/Loading";

import "./LanguagesList.css";

const LanguagesList = (props) => {
  if (props.items.length === 0) {
    return <Loading show={true} />;
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
      <AddLanguagesItem id="ADD" name="Add Language" onClose={props.onAdded} />
    </ul>
  );
};

export default LanguagesList;

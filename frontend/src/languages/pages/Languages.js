import React from "react";

import LanguagesList from "../components/LanguagesList";

const Languages = () => {
  const USERS = [
    {
      id: "heb",
      name: "Hebrew",
      image: require("../../shared/images/israel.png"),
      country: "Israel",
    },
    {
      id: "engUSA",
      name: "English",
      image: require("../../shared/images/united-states.png"),
      country: "United State",
    },
    {
      id: "fra",
      name: "French",
      image: require("../../shared/images/france.png"),
      country: "France",
    },
    {
      id: "rus",
      name: "Russian",
      image: require("../../shared/images/russia.png"),
      country: "Russia",
    },
  ];

  return <LanguagesList items={USERS} />;
};

export default Languages;

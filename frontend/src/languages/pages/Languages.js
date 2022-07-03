import React, { useEffect, useState } from "react";
import axios from "axios";

import LanguagesList from "../components/LanguagesList";

const Languages = () => {
  const [language, setLanguage] = useState([]);

  useEffect(() => {
    getLanguage();
  }, []);

  const getLanguage = async () => {
    await axios.get("http://localhost:5000/api/languages").then((res) => {
      const languages = res.data.languages.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      setLanguage(languages);
    });
  };
  return <LanguagesList items={language} onAdded={getLanguage} />;
};

export default Languages;

import React, { useEffect, useState } from "react";
import axios from "axios";

import LanguagesList from "../components/LanguagesList";

const Languages = () => {
  const [lang,setLang] = useState([])

  useEffect(() => {
    getLang()
  }, []);
  
  const getLang = async () => {
    await axios.get("http://localhost:5000/api/languages").then((res) => {
      console.log(res.data.languages);
      setLang(res.data.languages);
    });
  }
  return (
    <React.Fragment>
      <LanguagesList items={lang} onAdded={getLang}/>
    </React.Fragment>
  );
};

export default Languages;

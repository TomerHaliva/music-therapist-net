import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

import { languagesAll, countries } from "countries-list";

import { findFlagUrlByIso2Code } from "country-flags-svg";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";

import "./LanguagesItem.css";

const AddLanguagesItem = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const [country, setCountry] = useState();
  const [countryLabel, setCountryLabel] = useState();
  const [language, setLanguage] = useState([]);
  const selectRef = useRef();

  const countriesOptions = [];
  Object.entries(countries).map((country) => {
    countriesOptions.push({ value: country[0], label: country[1].name });
  });

  const openAddHandler = () => setShowAdd(true);
  const closeAddHandler = () => setShowAdd(false);

  const addLanguageHandler = async (event) => {
    event.preventDefault();

    const imgURL = country && findFlagUrlByIso2Code(country);
    const languageItem = {
      id: country,
      name: language.label,
      image: imgURL,
      country: countryLabel,
    };

    await axios
      .post("http://localhost:5000/api/languages", languageItem)
      .then(() => {
        closeAddHandler();
        props.onClose();
      });
  };

  const addLanguageForm = (
    <div className="language-item__add-language-form">
      <label>Select Country</label>
      <Select
        options={countriesOptions}
        onFocus={() => {
          selectRef.current.clearValue();
        }}
        onChange={(e) => {
          let lang = [];
          countries[e.value].languages.forEach((el) => {
            lang.push({
              value: languagesAll[el].name,
              label: languagesAll[el].name,
            });
          });
          setLanguage(lang);
          setCountry(e.value);
          setCountryLabel(e.label);
        }}
      ></Select>
      <label>Select language</label>
      <Select
        options={language}
        ref={selectRef}
        onChange={(lang) => setLanguage(lang)}
      ></Select>
    </div>
  );

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
              onClick={(e) => addLanguageHandler(e)}
            >
              SUBMIT
            </button>
          </React.Fragment>
        }
        footerClass="add-language"
      >
        <div className="addLanguage-container">
          <h2>Add a language</h2>
          {addLanguageForm}
        </div>
      </Modal>
      <li onClick={openAddHandler} className="language-item">
        <Card className="language-item__content">
          <Link to="#">
            <div className="language-item__image">
              <button className="language-item__add">+</button>
            </div>
            <br></br>
            <div className="language-item__info">
              <h2>{props.name}</h2>
              <h3>{props.country}</h3>
            </div>
          </Link>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default AddLanguagesItem;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";

import "./LanguagesItem.css";

const AddLanguagesItem = (props) => {
  const [showAdd, setShowAdd] = useState(false);

  const openAddHandler = () => setShowAdd(true);
  const closeAddHandler = () => setShowAdd(false);

  return (
    <React.Fragment>
      <Modal
        show={showAdd}
        onCancel={closeAddHandler}
        footer={<button onClick={closeAddHandler}>cancel</button>}
      >
        <div className="addLanguage-container">
          <h2>Tomer</h2>
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

import React from "react";

import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/useFormValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { reset, values, errors, isValid, isInputValid, handleChange } =
    useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ title: values.title, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="places"
      title="Новое место"
      buttonSave="Создать"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      onClose={resetForClose}>
      <input
        id="title"
        type="text"
        placeholder="Название"
        name="title"
        className={`popup__input ${
          isInputValid.title === undefined || isInputValid.title
            ? ""
            : `popup__input-error`
        }`}
        minLength={2}
        maxLength={30}
        required
        onChange={handleChange}
        value={values.title ? values.title : ""}
      />
      <span className="popup__error input-place-error popup__error_visible">
        {errors.title}
      </span>
      <input
        id="link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className={`popup__input ${
          isInputValid.link === undefined || isInputValid.link
            ? ""
            : `popup__input-error`
        }`}
        required
        onChange={handleChange}
        value={values.link ? values.link : ""}
      />
      <span className="popup__error input-src-error popup__error_visible">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

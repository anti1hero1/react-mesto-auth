import React from "react";

import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/useFormValidation";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const {
    setValue,
    reset,
    values,
    errors,
    isValid,
    isInputValid,
    handleChange,
  } = useFormValidation();

  React.useEffect(() => {
    setValue("name", currentUser.name);
    setValue("about", currentUser.about);
  }, [currentUser, setValue]);

  function resetForClose() {
    onClose();
    reset({ name: currentUser.name, about: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ name: values.name, about: values.about }, reset);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Имя"
        className={`popup__input ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : `popup__input-error`
        }`}
        minLength={2}
        maxLength={40}
        required
        onChange={handleChange}
        value={values.name ? values.name : ""}
      />
      <span className="popup__error input-name-error popup__error_visible">
        {errors.name}
      </span>
      <input
        id="about"
        name="about"
        type="text"
        placeholder="О себе"
        className={`popup__input ${
          isInputValid.about === undefined || isInputValid.about
            ? ""
            : `popup__input-error`
        }`}
        minLength={2}
        maxLength={200}
        required
        onChange={handleChange}
        value={values.about ? values.about : ""}
      />
      <span className="popup__error input-about-error popup__error_visible">
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

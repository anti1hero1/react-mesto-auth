import React from "react";

import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/useFormValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const input = React.useRef();
  const { reset, values, errors, isValid, isInputValid, handleChange } =
    useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить автар"
      isOpen={isOpen}
      isValid={isValid}
      onClose={resetForClose}
      onSubmit={handleSubmit}>
      <input
        ref={input}
        id="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        className={`popup__input ${
          isInputValid.avatar === undefined || isInputValid.avatar
            ? ""
            : `popup__input-error`
        }`}
        required
        onChange={handleChange}
        value={values.avatar ? values.avatar : ""}
      />
      <span className="popup__error input-avatar-error popup__error_visible">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

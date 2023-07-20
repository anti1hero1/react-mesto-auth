function PopupWithForm({
  name,
  title,
  buttonSave,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div
        className={`popup__container ${
          name === "delete" ? `popup__container_delete` : ""
        } ${name === "avatar" ? `popup__container_avatar` : ""}`}>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form ${
            name === `delete` ? `popup__form_delete` : ""
          }${name === `avatar` ? `popup__form_avatar` : ""}`}
          name={name}
          noValidate
          onSubmit={onSubmit}>
          {children}
          <button
            className={`popup__button ${
              isValid ? "" : `popup__button_disabled`
            } `}
            type="submit"
            name="submit">
            {buttonSave || "Сохранить"}
          </button>
        </form>
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;

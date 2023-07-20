function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_photo ${isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container-image">
        <img
          className="popup__card-image"
          alt={card.name ? card.name : "#"}
          src={card.link ? card.link : "#"}
        />
        <p className="popup__caption">{card.name}</p>
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default ImagePopup;

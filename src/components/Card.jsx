import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ButtonLike from "./ButtonLike";

function Card({ card, onCardClick, onDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="element">
      <div className="element__item">
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={() => onCardClick({ link: card.link, name: card.name })}
        />
        <div className="element__image-info">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-container">
            <ButtonLike
              onCardLike={onCardLike}
              card={card}
              myId={currentUser._id}
            />
          </div>
          {currentUser._id === card.owner._id && (
            <button
              className="element__image-basket"
              onClick={() => onDelete(card._id)}
              type="button"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;

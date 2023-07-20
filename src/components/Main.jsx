import React from "react";

import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onDelete,
  cards,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <img className="profile__image" src={currentUser.avatar} alt="Аватар" />
        <button
          className="profile__avatar-button"
          type="button"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          />
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="Карточки мест">
        {cards.map((data) => {
          return (
            <div className="element" key={data._id}>
              <Card
                card={data}
                onCardLike={onCardLike}
                onCardClick={onCardClick}
                onDelete={onDelete}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Main;

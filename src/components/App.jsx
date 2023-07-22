import React from "react";

import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

import CurrentUserContext from "../contexts/CurrentUserContext";

import api from "../utils/api";
import * as apiAuth from "../utils/ApiAuth";

function App() {
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [isImagePopup, setImagePopup] = React.useState(false);
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [deleteCardId, setDeleteCardId] = React.useState("");

  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  // const [checkToken, setCheckToken] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   if (token) {
  //     // setCheckToken(true);
  //     apiAuth
  //       .checkToken(token)
  //       .then((res) => {
  //         if (res && res.data) {
  //           setLoggedIn(true);
  //           navigate("/");
  //           setHeaderEmail(res.data.email);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     setLoggedIn(false);
  //   }
  // }, [navigate]);

  // React.useEffect(() => {
  //   checkToken();
  // }, [navigate]);

  // React.useEffect(() => {
  //   checkToken();
  // }, []);

  React.useEffect(() => {
    checkToken()
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([user, cards]) => {
          setCurrentUser({ ...currentUser, ...user });
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn,navigate]);

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setPlacePopupOpen(true);
  }

  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId);
    setDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  }

  function closeAllPopups() {
    setAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setPlacePopupOpen(false);
    setImagePopup(false);
    setDeletePopupOpen(false);
    setIsInfoTooltipPopup(false);
  }

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setCards((state) =>
          state.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(user, reset) {
    api
      .changeUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  }

  function handleUpdateAvatar(user, reset) {
    api
      .changeAvatar(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  }

  function handleAddPlaceSubmit(card, reset) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  }

  const handleLike = React.useCallback(
    (card) => {
      const isLike = card.likes.some(
        (element) => currentUser._id === element._id
      );
      if (isLike) {
        api
          .deleteCardLike(card._id)
          .then((res) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? res : c))
            );
          })
          .catch((err) => console.log(err));
      } else {
        api
          .getCardLike(card._id)
          .then((res) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? res : c))
            );
          })
          .catch((err) => console.log(err));
      }
    },
    [currentUser._id]
  );

  function handleRegister(data) {
    apiAuth
      .register(data)
      .then((res) => {
        if (res && res.data) {
          setIsInfoTooltipSuccess(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipPopup(true));
  }

  function checkToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      apiAuth
        .checkToken(token)
        .then((res) => {
          if (res && res.data) {
            setLoggedIn(true);
            navigate("/");
            setHeaderEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
    }
  }

  function handleLogin(data) {
    apiAuth
      .login(data)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          navigate("/");
          setHeaderEmail(data.email);
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        setIsInfoTooltipPopup(true);
        console.log(err);
      });
  }

  function logOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setHeaderEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={headerEmail} logOut={logOut} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                // checkToken={checkToken}
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onDelete={handleDeleteClick}
                cards={cards}
                onCardLike={handleLike}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
          />
        </Routes>
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText={"Да"}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteSubmit}></PopupWithForm>
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name="tooltip"
          isOpen={isInfoTooltipPopup}
          onClose={closeAllPopups}
          isSuccess={isInfoTooltipSuccess}
        />
        {loggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

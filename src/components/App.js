import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeletePopupCard from "./DeletePopupCard";
import InfoTooltip from "./InfoTooltip";

import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentCardsContext from "../contexts/CurrentCardsContext";
import clientAPI from "../utils/api";
import * as auth from "../utils/auth";

import "../index.css";

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isPopupInfoOpen, setIsPopupInfoOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    clientAPI.getUsers().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  useEffect(() => {
    clientAPI.getCards().then((result) => {
      setCards(result);
    });
  }, []);

  async function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      //melhorar a validação e colocar tempo
      try {
        const response = await auth.checkToken(jwt);
        const { data } = await response.json();
        setEmailUser(data.email);
        setIsLoggedIn(true);
        history.push("/profile");
      } catch (error) {
        console.log("Error no check token jwt:", error);
      }
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  async function handleLogin(token) {
    setIsLoggedIn(true);
    try {
      const response = await auth.checkToken(token);
      const { data } = await response.json();
      setEmailUser(data.email);
    } catch (error) {
      console.log("erro em solicitar retorno do data", error);
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setCardToDelete(card);
  }

  function handleInfoPopup(params) {
    if (params === false) {
      setIsPopupInfoOpen(true);
      setIsSuccess(false);
    }else {
      setIsPopupInfoOpen(true);
      setIsSuccess(true);
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsPopupInfoOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(updatedUser) {
    renderLoading(true);
    clientAPI
      .updateDescriptionPerfil(updatedUser)
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o perfil:", error);
      })
      .finally(() => {
        renderLoading(false);
      });
  }

  function handleUpdateAvatar(onUpdateAvatar) {
    renderLoading(true);
    clientAPI
      .getProfilePicture(onUpdateAvatar)
      .then((res) => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o avatar:", error);
      })
      .finally(() => {
        renderLoading(false);
      });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const apiMethod = isLiked ? "deleteLike" : "addLike";
    clientAPI[apiMethod](card._id)
      .then((updatedCard) => {
        const updatedCards = cards.map((c) =>
          c._id === updatedCard._id ? updatedCard : c
        );
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error("Erro ao atualizar a curtida:", error);
      });
  }

  function handleCardDelete() {
    renderLoading(true);
    clientAPI
      .deleteCard(cardToDelete._id)
      .then(() => {
        const updatedCards = cards.filter((c) => c._id !== cardToDelete._id);
        setCards(updatedCards);
        setIsDeletePopupOpen(false);
      })
      .finally(() => {
        renderLoading(false);
      });
  }

  function handleAddPlaceSubmit(handleAddPlaceSubmit) {
    renderLoading(true);
    clientAPI
      .createCards(handleAddPlaceSubmit)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .finally(() => {
        renderLoading(false);
      });
  }

  function renderLoading(isLoading) {
    const textButton = document.querySelector(".loading-button-text");
    const loading = document.querySelector(".loading-container");
    if (isLoading) {
      textButton.classList.add("loading-closed");
      loading.classList.add("loading-opened");
    } else {
      loading.classList.remove("loading-opened");
      textButton.classList.remove("loading-closed");
    }
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        userEmail={emailUser}
      />
      <Switch>
        <Route path="/register">
          <Register activeInfo={(params) => {
            handleInfoPopup(params);
          }}/>
          <InfoTooltip
            isOpen={isPopupInfoOpen}
            onClose={closeAllPopups}
            isSuccess={false}
          />
        </Route>
        <Route path="/login">
          <Login handleLogin={handleLogin} handleLogout={handleLogout} activeInfo={(params) => {
            handleInfoPopup(params)
          }}/>
          <InfoTooltip
            isOpen={isPopupInfoOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />
        </Route>
        <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
          <Route path="/profile">
            <CurrentUserContext.Provider value={currentUser}>
              <CurrentCardsContext.Provider value={cards}>
                <Main
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onEditProfileClick={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  setCards={setCards}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                />
                {selectedCard && (
                  <ImagePopup
                    card={selectedCard}
                    isOpen={true}
                    onClose={closeAllPopups}
                  />
                )}
                {isEditAvatarPopupOpen && (
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onSave={handleUpdateAvatar}
                    onUpdateAvatar={handleUpdateAvatar}
                  />
                )}
                {isEditProfilePopupOpen && (
                  <EditProfilePopup
                    isOpen={handleEditProfileClick}
                    onClose={closeAllPopups}
                    onSave={handleUpdateUser}
                    onUpdateUser={handleUpdateUser}
                  />
                )}
                {isAddPlacePopupOpen && (
                  <AddPlacePopup
                    isOpen={handleAddPlaceClick}
                    onClose={closeAllPopups}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                )}
                {isDeletePopupOpen && (
                  <DeletePopupCard
                    isOpen={handleDeleteCardClick}
                    onClose={() => setIsDeletePopupOpen(false)}
                    handleCardDelete={() => {
                      handleCardDelete();
                    }}
                  />
                )}
                <Footer />
              </CurrentCardsContext.Provider>
            </CurrentUserContext.Provider>
          </Route>
        </ProtectedRoute>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/profile" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </>
  );
}

export default withRouter(App);

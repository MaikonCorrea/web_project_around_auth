import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { owner } from "../constants/constants";

export default function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isImageUrlValid, setIsImageUrlValid] = useState(false);
  const isValueValid = isTitleValid && isImageUrlValid;

  const handleSubmit = () => {
    if (isTitleValid && isImageUrlValid) {
      onAddPlaceSubmit({
        likes: [],
        name: title,
        link: imageUrl,
        owner: owner,
      });
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setIsTitleValid(newTitle.length >= 2);
  };

  const handleImageUrlChange = (e) => {
    const newImageUrl = e.target.value;
    setImageUrl(newImageUrl);

    const isValidUrl =
      newImageUrl.includes("http://") || newImageUrl.includes("https://");
    setIsImageUrlValid(isValidUrl && newImageUrl.length >= 2);
  };

  return (
    <PopupWithForm
      name="include"
      title="Novo local"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValueValid={isValueValid}
    >
      <input
        className={`include__input-title input ${
          !isTitleValid ? "input-error" : ""
        }`}
        type="text"
        name="title"
        placeholder="Título"
        onChange={handleTitleChange}
        value={title}
      />
      <span className={`span span_name-message`}>
        {!isTitleValid && "O título deve ter no mínimo 2 caracteres"}
      </span>
      <input
        className={`include__input-link input ${
          !isImageUrlValid ? "input-error" : ""
        }`}
        type="url"
        name="url"
        placeholder="URL da imagem"
        onChange={handleImageUrlChange}
        value={imageUrl}
      />
      <span className={`span span_about-message`}>
        {!isImageUrlValid && "Digite uma URL válida"}
      </span>
    </PopupWithForm>
  );
}

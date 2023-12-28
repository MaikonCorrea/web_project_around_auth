import React, { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef(null);
  const [avatarError, setAvatarError] = useState("");
  const [isValueValid, setIsValueValid] = useState(false);

  const handleSubmit = () => {
    const avatarSrc = avatarInputRef.current.value;
    onUpdateAvatar({
      avatar: avatarSrc,
    });
  };

  const handleChange = () => {
    const avatarSrc = avatarInputRef.current.value;
    if (
      !avatarSrc ||
      (!avatarSrc.includes("http://") && !avatarSrc.includes("https://"))
    ) {
      setAvatarError('digite uma URL válida!"');
      setIsValueValid(false);
    } else {
      setAvatarError("");
      setIsValueValid(true);
    }
  };

  return (
    <PopupWithForm
      name="photograph"
      title="Alterar a foto do perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValueValid={isValueValid}
    >
      <input
        className="photograph__input-link input"
        type="url"
        name="urlPhoto"
        placeholder="URL da imagem"
        ref={avatarInputRef}
        onChange={handleChange}
      ></input>
      <span className="span span_urlPhoto-message">{avatarError}</span>
    </PopupWithForm>
  );
}

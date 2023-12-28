import React, { useState, useEffect } from "react";

export default function DeletePopupCard(props) {
  const [shouldRenderPopup, setShouldRenderPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && props.isOpen) {
        setIsClosing(true);

        setTimeout(() => {
          setIsClosing(true);
          props.onClose();
        }, 200);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [props.isOpen, props.onClose]);

  useEffect(() => {
    if (props.isOpen) {
      setIsClosing(false);

      const timeoutId = setTimeout(() => {
        setShouldRenderPopup(true);
      }, 150);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setIsClosing(true);
      setShouldRenderPopup(false);

      const timeoutId = setTimeout(() => {
        setIsClosing(false);
      }, 150);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [props.isOpen]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      event.preventDefault();
      setIsClosing(true);
      setTimeout(() => {
        props.onClose();
      }, 150);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleCardDelete();
  };

  return (
    <form
      className={`delete ${shouldRenderPopup ? "popup_opened" : ""} ${
        isClosing ? "popup_closing" : ""
      }`}
      name="delete"
      onClick={handleOverlayClick}
    >
      <div className="delete__popup">
        <h2 className="delete__popup-title">Tem certeza?</h2>
        <button
          name="button"
          className="delete__button-save"
          id="delete-button"
          type="submit"
          onClick={handleSubmit}
        >
          <span className={`loading-button-text`}>Salvar</span>
          <span className={`loading-container`}>
            Salvando...
            <span className={`loading-animation`}></span>
          </span>
        </button>
        <button
          className="delete__button-close-popup button-close-popup"
          onClick={handleOverlayClick}
        ></button>
      </div>
    </form>
  );
}

import React, { useEffect, useState } from "react";

export default function PopupWithForm(props) {
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
    props.onSubmit();
  };

  return (
    <form
      className={`${props.name} ${shouldRenderPopup ? "popup_opened" : ""} ${
        isClosing ? "popup_closing" : ""
      }`}
      name={props.name}
      onClick={handleOverlayClick}
    >
      <div className={`${props.name}__popup`}>
        <h2 className={`${props.name}__popup-title`}>{props.title}</h2>
        {props.children}
        <button
          name="button"
          className={`${props.name}__button-save ${
            !props.isValueValid ? `${props.name}__button-save_disabled` : ""
          }`}
          type="submit"
          disabled={!props.isValueValid}
          onClick={handleSubmit}
        >
          <span className={`loading-button-text`}>Salvar</span>
          <span className={`loading-container`}>
            Salvando...
            <span className={`loading-animation`}></span>
          </span>
        </button>
        <button
          className={`${props.name}__button-close-popup button-close-popup`}
          onClick={handleOverlayClick}
        ></button>
      </div>
    </form>
  );
}

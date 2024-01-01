import imageError from "../images/image_error.png";
import imageOk from "../images/image_ok.png";


function InfoTooltip() {
  return (
    <div className="info info__popup_opened">
      <div className="info__popup">
        {/* <img className="info__image" src={imageError} alt="imagem de erro" /> */}
        <img className="info__image" src={imageOk} alt="imagem de sucesso" />
        <p className="info__description">Vitória! Você precisa se registrar.</p>
        {/* <p className="info__description">
          Ops, algo saiu deu errado! Por favor, tente novamente.
        </p> */}
        <button className="info__button-close-popup button__close-popup"></button>
      </div>
    </div>
  );
}

export default InfoTooltip;

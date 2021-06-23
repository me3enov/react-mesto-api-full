function ImagePopup ({ isOpen, card, onClose }) {
  function handleClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }
  return(
    <div
      className={`popup popup_place_img ${isOpen && 'popup_opened'}`}
      onClick={handleClickClose}>
      <div className='popup__image-container'>
        <button className='popup__close-button popup__close-button_place_img' type='button' onClick={onClose}/>
        <figure className='popup__figure'>
          <img className='popup__image' alt={card?.name} src={card?.link}/>
          <figcaption className='popup__description'>{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
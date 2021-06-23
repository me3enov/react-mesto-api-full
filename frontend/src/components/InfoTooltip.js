function InfoTooltip ({ isOpen, isSuccess, onClose }) {
  return (
    <div className={`popup popup popup_place_tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          className='popup__close-button'
          onClick={onClose}
          aria-label='Закрыть'>
        </button>
        <div className={`popup__sign-icon
          ${isSuccess ?
          'popup__sign-icon_type_success'
          : 'popup__sign-icon_type_fail'}`}>
        </div>
        <h2 className='popup__title'>
          {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ card, onDelete, isOpen, onClose, isLoading }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDelete(card);
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      buttonText='Да'
      buttonTextLoading='Удаление...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
    </PopupWithForm>
  )
}

export default ConfirmPopup;
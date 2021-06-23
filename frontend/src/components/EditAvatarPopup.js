import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avaRef = useRef(null);

  useEffect(() => {
    avaRef.current.value = '';
  }, [isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avaRef.current.value
    });
  }

  return(
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      buttonTextLoading='Сохранение...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
        <input
          id='form__input_string_avatar'
          className='form__input form__input_string_avatar'
          type='url'
          name='link'
          placeholder='Ссылка на картинку'
          required
          ref={avaRef}/>
        <span
          id='form__input_string_avatar-error'
          className='form__input-error'/>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;

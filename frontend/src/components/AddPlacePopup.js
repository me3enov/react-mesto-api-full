import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isLoading }) {
  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleCardTitle(event) {
    setCardTitle(event.target.value)
  }

  function handleCardLink(event) {
    setCardLink(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: cardTitle,
      link: cardLink
    })
  }

  useEffect(() => {
    setCardLink('')
    setCardTitle('')
  }, [isOpen])

  return(
    <PopupWithForm
      name='add'
      title='Новое место'
      buttonText='Создать'
      buttonTextLoading='Создание...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
        <input
          id='form__input_string_title'
          className='form__input form__input_string_title'
          type='text'
          name='name'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          required
          onChange={handleCardTitle}
          value={cardTitle ? cardTitle : ''}/>
        <span
          id='form__input_string_title-error'
          className='form__input-error'/>
        <input
          id='form__input_string_link'
          className='form__input form__input_string_link'
          type='url'
          name='link'
          placeholder='Ссылка на картинку'
          required
          onChange={handleCardLink}
          value={cardLink ? cardLink : ''}/>
        <span
          id='form__input_string_link-error'
          className='form__input-error'/>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: name,
      about: description
    });
  }

  function handleUserName(event) {
    setName(event.target.value)
  }

  function handleUserDescription(event) {
    setDescription(event.target.value)
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      buttonTextLoading='Сохранение...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
        <input
          id='form__input_string_name'
          className='form__input form__input_string_name'
          name='name'
          type='text'
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          required
          value={name ? name : ''}
          onChange={handleUserName}/>
        <span
          id='form__input_string_name-error'
          className='form__input-error'/>
        <input
          id='form__input_string_job'
          className='form__input form__input_string_job'
          name='about'
          type='text'
          placeholder='О себе'
          minLength='2'
          maxLength='200'
          required
          value={description ? description : ''}
          onChange={handleUserDescription}/>
        <span
          id='form__input_string_job-error'
          className='form__input-error'/>
    </PopupWithForm>
  )
}

export default EditProfilePopup;

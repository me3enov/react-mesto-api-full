import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { registration } from '../utils/auth';

function SignUp ({ onInfoTooltipOpen, setIsSuccessSignUp, onLoading, isLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLoading(true)
    registration(email, password)
      .then((res) => {
        history.push('/');
        setIsSuccessSignUp(true)
      })
      .catch((err) => {
        setIsSuccessSignUp(false);
        console.log(err);
      })
      .finally(() => {
        onInfoTooltipOpen(true);
        onLoading(false);
      });
  };

  return (
    <div className='sign root__sign'>
      <h2 className='sign__title'>Регистрация</h2>
      <form className='form form_type_sign' onSubmit={handleSubmit}>
        <fieldset className='sign__auth-box'>
          <input
            type='email'
            name='signup-email'
            className='form__input form__input_place_sign'
            placeholder='Email'
            minLength='5'
            maxLength='40'
            value={email}
            required={true}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <input
            type='password'
            name='signup-password'
            className='form__input form__input_place_sign'
            placeholder='Пароль'
            minLength='3'
            maxLength='40'
            value={password}
            required={true}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </fieldset>
        <fieldset className='sign__auth-box'>
          <button
            type='submit'
            className={`form__submit-button form__submit-button_place_sign
              ${isLoading ?
              'form__submit-button_loading-black-icon'
              : ''}`}>
              {isLoading ?
              'Регистрация...'
              : 'Зарегистрироваться'}
          </button>
          <Link className='sign__link' to='/signin'>
            Уже зарегистрированы? Войти
          </Link>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;

import { Route, Link } from 'react-router-dom';

function NavBar ({ btnMenuActive, userEmail, quit }) {

  return (
    <div className={`header__block-sign ${btnMenuActive ? 'header__block-sign_opened' : ''}`}>
      <Route path='/signup'>
        <Link className='header__link' to={'/signin'}>
          <p className='header__text-link'>Войти</p>
        </Link>
      </Route>
      <Route path='/signin'>
        <Link className='header__link' to={'/signup'}>
          <p className='header__text-link'>Регистрация</p>
        </Link>
      </Route>
      <Route exact path='/'>
        <p className='header__text'>{userEmail}</p>
        <Link className='header__link' to='/' onClick={quit}>
          <p className='header__text-link header__text-link_type_exit'>Выйти</p>
        </Link>
      </Route>
    </div>
  );
}

export default NavBar;
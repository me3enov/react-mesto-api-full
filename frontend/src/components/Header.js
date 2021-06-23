import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NavBar from './NavBar';

function Header({ userEmail, onQuit }) {
  const [btnMenuActive, setBtnMenuActive] = useState(false);
  const history = useHistory();

  const quit = () => {
    onQuit();
    localStorage.removeItem('jwt');
    history.push('/signin');
  };

  const handleSetBtnMenuActive = () => {
    setBtnMenuActive(!btnMenuActive);
  };

  return (
    <header className='header root__header'>
      <>
        <div className='header__block-logo'>
          <Link className='header__link' to='/'>
            <div className='header__logo'></div>
          </Link>
          <button
            className={`header__menu-button
            ${btnMenuActive ?
              'header__menu-button_state_close'
              : ''}`}
            type='button'
            onClick={handleSetBtnMenuActive}
          />
        </div>
        <NavBar
          btnMenuActive={btnMenuActive}
          userEmail={userEmail}
          quit={quit}/>
      </>
    </header>
  );
}

export default Header;
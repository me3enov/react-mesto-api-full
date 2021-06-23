import { Route } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Route exact path='/'>
        <footer className='footer root__footer' aria-label='Footer'>
          <p className='footer__copyright'>&copy; {currentYear} Артем Мезенов</p>
        </footer>
      </Route>
    </>
  );
}

export default Footer;

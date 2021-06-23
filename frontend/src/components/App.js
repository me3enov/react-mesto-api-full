import {useState, useEffect} from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import { getMe } from '../utils/auth';
import Header from './Header';
import Main from './Main';
import SignIn from './SignIn';
import SignUp from './SignUp';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmPopup from './ConfirmPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup'
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSuccessSignUp, setIsSuccessSignUp] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const handleSignIn = () => {
    setLoggedIn(true);
  };

  function handleSignOut() {
    setLoggedIn(false);
  }

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getMe(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    api.getCards()
      .then(res => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddPlace(card) {
    setLoading(true);
    api.addNewCard(card)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    setLoading(true);
    api.removeCard(card)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err));
  }, [])

  function handleUpdateUser(user) {
    setLoading(true);
    const profile = {
      name: user.name,
      about: user.about
    };
    api.setUserInfo(profile)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(user) {
    setLoading(true);
    api.setUserAvatar(user.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null)
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [])

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <div className='root'>
          <Header
            userEmail={userEmail}
            onQuit={handleSignOut} />
            <Switch>
              <ProtectedRoute
                exact path='/'
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick} />
              <Route path='/signup'>
                <SignUp
                  onInfoTooltipOpen={setIsInfoTooltipOpen}
                  setIsSuccessSignUp={setIsSuccessSignUp}
                  onLoading={setLoading}
                  isLoading={isLoading} />
              </Route>
              <Route path='/signin'>
                <SignIn handleSignIn = {handleSignIn}
                onLoading={setLoading}
                isLoading={isLoading} />
              </Route>
              <Route>
                {loggedIn ? (
                  <Redirect to='/' />
                ) : (
                  <Redirect to='/signin' />
                )}
              </Route>
            </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            isLoading={isLoading} />
          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups} />
          <ConfirmPopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onDelete={handleCardDelete}
            card={selectedCard}
            isLoading={isLoading} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSuccess={isSuccessSignUp}
            onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

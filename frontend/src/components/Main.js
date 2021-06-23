import { useContext } from 'react';
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile root__profile'>
        <button className='profile__avatar'
          type='button'
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={onEditAvatar}>
        </button>
        <div className='profile__line'>
          <h1 className='profile__name'>{currentUser.name}</h1>
          <button
            type='button'
            className='profile__edit-button'
            onClick={onEditProfile}>
          </button>
        </div>
        <p className='profile__job'>{currentUser.about}</p>
        <button
          type='button'
          className='profile__add-button'
          onClick={onAddPlace}>
        </button>
      </section>

      <section className='cards' aria-label='Cards'>
        <ul className='gallery'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main
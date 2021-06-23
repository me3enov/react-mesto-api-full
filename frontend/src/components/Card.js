import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__bin ${isOwn ? 'card__bin__visible' : ''}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like ${isLiked ? 'card__like_state_liked' : ''}`
  );

  function handleCardClick() {
    onCardClick(card)
  }

  function handleDeleteCard() {
    onCardDelete(card)
  }

  function handleCardLike() {
    onCardLike(card)
  }

  return(
    <li className='card'>
      <div className='card__image' style={{ backgroundImage: `url(${card.link})` }} onClick={handleCardClick}/>
      <button className={cardDeleteButtonClassName} type='button' onClick={handleDeleteCard}/>
      <h2 className='card__title'>{card.name}</h2>
      <div className='card__like-container'>
        <button className={cardLikeButtonClassName} type='button' onClick={handleCardLike}/>
        <span className='card__like-count'>{card.likes.length}</span>
      </div>
  </li>
  )
}

export default Card;
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { ContextApp } from '../../context';

export const Idea = () => {
  const { ideas } = React.useContext(ContextApp);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentIdea, setCurrentIdea] = useState(null);
  const [error, setError] = useState(null);

  // Состояния для голосования
  const [phoneNumber, setPhoneNumber] = useState('');
  const [voteLoading, setVoteLoading] = useState(false);
  const [voteMessage, setVoteMessage] = useState('');
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const normalizePhone = (value) => value.replace(/\D/g, '');
  const isValidPhone = (value) => {
    const digits = normalizePhone(value);
    return /^(7|8)?\d{10}$/.test(digits);
  };

  // Загрузка деталей идеи напрямую с бэкенда
  const fetchIdeaDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/ideas/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Идея не найдена');
        }
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      setCurrentIdea(data);
    } catch (error) {
      console.error('Ошибка загрузки деталей:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Голосование
  const handleVote = async (e) => {
    e.preventDefault();
    setVoteMessage('');
    setAlreadyVoted(false);

    if (!phoneNumber.trim()) {
      setVoteMessage('Введите номер телефона перед голосованием.');
      return;
    }

    if (!isValidPhone(phoneNumber)) {
      setVoteMessage('Введите корректный номер телефона, например +7 900 123-45-67.');
      return;
    }

    setVoteLoading(true);

    try {
      const response = await fetch(`${API_URL}/ideas/${id}/vote`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: normalizePhone(phoneNumber) }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentIdea((prev) => ({ ...prev, vote: data.vote }));
        setVoteMessage(data.message || 'Голос успешно засчитан! Спасибо за поддержку!');
        setAlreadyVoted(true);
        return;
      }

      if (response.status === 409) {
        setVoteMessage(data.error || 'Вы уже голосовали за эту идею.');
        setAlreadyVoted(true);
        return;
      }

      setVoteMessage(data.error || 'Не удалось добавить голос.');
    } catch (error) {
      console.error('Ошибка при голосовании:', error);
      setVoteMessage('Ошибка при голосовании. Попробуйте позже.');
    } finally {
      setVoteLoading(false);
    }
  };

  // Рендер контактов
  const renderContact = () => {
    if (!currentIdea?.contacts) return <p>Контакты не указаны</p>;

    const contact = currentIdea.contacts;

    if (typeof contact === 'string') {
      return <p>{contact}</p>;
    }

    const items = [];
    if (contact.phone) {
      items.push(<p key="phone">Телефон: {contact.phone}</p>);
    }
    if (contact.mail) {
      items.push(<p key="mail">Email: {contact.mail}</p>);
    }
    if (contact.networks && Object.keys(contact.networks).length > 0) {
      items.push(
        <p key="networks">
          Соцсети:
          {Object.entries(contact.networks).map(([name, url], i, arr) => (
            <span key={name}>
              <a href={url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                {name}
              </a>
              {i < arr.length - 1 && ', '}
            </span>
          ))}
        </p>,
      );
    }

    return items.length > 0 ? items : <p>Контакты не указаны</p>;
  };

  const back = (e) => {
    e.preventDefault();
    navigate('/ideas');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    fetchIdeaDetails();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.idea}>
        <div className={styles.title}>
          <h2>Копилка добрых идей</h2>
          <h3>Твоя идея — чья-то добрая реальность</h3>
        </div>
        <div className={styles.loading}>
          <h2>Загрузка...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.idea}>
        <div className={styles.title}>
          <h2>Копилка добрых идей</h2>
          <h3>Твоя идея — чья-то добрая реальность</h3>
        </div>
        <div className={styles.notFound}>
          <h2>Ошибка: {error}</h2>
          <button onClick={() => navigate('/ideas')}>Вернуться к идеям</button>
        </div>
      </div>
    );
  }

  if (!currentIdea) {
    return (
      <div className={styles.idea}>
        <div className={styles.title}>
          <h2>Копилка добрых идей</h2>
          <h3>Твоя идея — чья-то добрая реальность</h3>
        </div>
        <div className={styles.notFound}>
          <h2>Идея не найдена</h2>
          <button onClick={() => navigate('/ideas')}>Вернуться к идеям</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className={styles.idea}>
        <div className={styles.title}>
          <h2>Копилка добрых идей</h2>
          <h3>Твоя идея — чья-то добрая реальность</h3>
          <div className={styles.titleSvg}>
            <svg
              className={styles.circle}
              viewBox="0 0 44 40"
              xmlns="http://www.w3.org/2000/svg"
              width="44.000000"
              height="40.000000"
              fill="none">
              <ellipse rx="22.000000" ry="20.000000" cx="22" cy="20" fill="rgb(255,93,0)" />
            </svg>
            <svg
              className={styles.smile}
              viewBox="0 0 183 133"
              width="183.000000"
              height="133.000000"
              fill="none">
              <defs>
                <image
                  id="image_0"
                  width="75.000000"
                  height="57.000000"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAA5CAYAAAB+pNYgAAAABHNCSVQICAgIfAhkiAAABGZJREFUeJztml9sFEUcxz9XenhXe8WCLRCItmkErTVSQOkDhgAlAhaCpg31waoRAyhqQo2aGP+cCkkT9MEGEUHlBQ1GhKqIMSgqiWIE5E8gGqFKy78cqYUWpLV3tz5sLr3I3e7M7uzd1czncWfmu798cjudzozPMAwDjRB52S5gKKFlSaBlSaBlSaBlSZCvJOXyBejqAH8Ari2GohIlsUrouwQXz0H/31A4EkaOdxzlXNZfp+GrN2HfVoi0A0krkDET4dZamL0Mxlc5foVjeiLw9dtweCe0/wxGbLAtVApVtTB3JZRPkYr1Sa+zYlHY+gLsfB1iA3bxMHkhNKyGcZVSr3HE5W7YFobd78DAFfv+k+pgyXvCX4KcrO4z0FoPx38UHgKYn+fiFpjzBPh8cmNFObYb1jdB9ym5cSPGwootMPEu267isrrPwKoZEDkuV0wyk+rgsQ8hUOg8IxXbwrD9FTDizsb7g9C8AypnWnYTk/VPH4RroPOQs2KSKZ8KT38JoVHus+Jx2LQMvt3gPisQgpf2Wk4XYkuH7WE1ogD+2ActtdDb5S4nHod3l6gRBdDXCxsfMXPTYC/r7G/wxRo1BSXoOOhOWELUnvfV1nViL3y3MW2zvaxv1kM8qrIkE6fCvBKVYNdbaZusZRkG/LBZdTmDyArzWhSY003nkZRN1rK6OqE34kVJg4gKy4SoBH/uT/nYWlbkhBelXI2dsEyKAjj3e8rH1rK8mKvSkU5YpkUBxGMpH1vLKij2opT0/FdYNkSBuRmQAmtZoyvAl+FdnISwnvPZEQUwZkLKx/Yr+JdroP0nL0qyJjgCrlzM/Hvz8mFdFwSLrm6yHTz1Xi9KsicbogAqZ6UUBSKyZi+HgutUl5S71D2XtsleVrAI5jWrLCd3uXmG5c6D2Ox9z7NQJrerOOQIhOBR6z8mYrLy/bD8A7hG8T5ULtG0FkrKLbuIrwvGToCnPoFhw92WlXssehGmP2DbTW4RVTUHnvwYhvmdlpV7zH8G7gsLdZVfcVYvgBUf/T+EzWuGxhbh7s6W51MWweNbhrawuSvhfrlNTfmjsGQO7oDWBrFjp1xi4fNQ/5r0MHeyAH79Ht5YAH09rmIyRuMamO9s3eheFkDHYfPMTtWhhhcUjoKH1sGdDY4j1MgCiA7Ap6vgs9UCJ9UZ5o56eHAtFJW6ilEnK0HHIdjwMJz8RWmsI0IlpiQXv6Zk1MsC8z7E5y3Q9ipE+5XHCzGtEZpaIXS9skhvZCXoOQ97NpkXNdwc+4tSUAzTm2DmUhh3i/J4b2UlMAw4uss8gzzQpn5vv6IGZi2FaYtheFBtdhKZkZXMhbOwvw1OHjDntc4jcp+qLw9G3wQ3VkNZNdx2N9xwu3f1Jr866/fgY1E4fcyUd+oo9F8yL6JE+83/EPwB89dSWgFlk00xqm/hCJJ9WUMIfQFXAi1LAi1LAi1LAi1LAi1LAi1LAi1LAi1LAi1LAi1LAi1LAi1LAi1LAi1Lgn8BsMJ5rPB/h20AAAAASUVORK5CYII="
                />
                <pattern
                  id="pattern_0"
                  width="1.000000"
                  height="1.000000"
                  patternContentUnits="objectBoundingBox">
                  <use
                    transform="matrix(0.0133333,0,0,0.0183459,0,-0.0228572)"
                    xlinkHref="#image_0"
                  />
                </pattern>
              </defs>
              <rect width="183.000000" height="133.000000" fill="url(#pattern_0)" />
            </svg>
            <svg
              className={styles.circle}
              viewBox="0 0 44 40"
              width="44.000000"
              height="40.000000"
              fill="none">
              <ellipse rx="22.000000" ry="20.000000" cx="22" cy="20" fill="rgb(255,93,0)" />
            </svg>
          </div>
        </div>
        <h2>{currentIdea.title}</h2>
        <div className={styles.ideaAbout}>
          <div className={styles.voteAndStatus}>
            <div className={styles.vote}>
              <h3>Голоса:</h3>
              <h4>{currentIdea.vote || 0}</h4>
            </div>
            <div className={styles.status}>
              <h3>Статус:</h3>
              <h4>{currentIdea.status || 'На рассмотрении'}</h4>
            </div>
          </div>
          <div className={styles.description}>
            <h3>описание:</h3>
            <p>{currentIdea.description || currentIdea.about}</p>
          </div>
          <div className={styles.contacts}>
            <h3>контакты автора: </h3>
            <div className={styles.contactsCentr}>
              <div className={styles.ContactText}>{renderContact()}</div>
            </div>
          </div>
          <div className={styles.voteSection}>
            <h3>Поддержать идею:</h3>
            <form onSubmit={handleVote} className={styles.phoneVoteForm}>
              <input
                type="tel"
                placeholder="+7 900 123-45-67"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setVoteMessage('');
                  setAlreadyVoted(false);
                }}
                className={styles.phoneInput}
                disabled={voteLoading}
              />
              {voteMessage && (
                <p className={alreadyVoted ? styles.successMessage : styles.voteMessage}>
                  {voteMessage}
                </p>
              )}
              <p className={styles.voteHint}>
                Один номер телефона может проголосовать за одну идею только один раз.
              </p>
              <div className={styles.button}>
                <button
                  type="submit"
                  className={styles.voteButton}
                  disabled={voteLoading || alreadyVoted}>
                  {voteLoading ? 'Обработка...' : alreadyVoted ? 'Голос учтен' : 'Проголосовать'}
                </button>
              </div>
            </form>
          </div>
          <p onClick={(e) => back(e)} className={styles.back}>
            к другим идеям...
          </p>
        </div>
      </section>
    </div>
  );
};

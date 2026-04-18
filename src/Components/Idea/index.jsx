import React from 'react';
import styles from './styles.module.scss';

export const Idea = () => {
  return (
    <div>
      <section className={styles.idea}>
        <h2>Название идеи</h2>
        <div className={styles.ideaAbout}>
          <div className={styles.voteAndStatus}>
            <div className={styles.vote}>
              <h3>Голоса:</h3>
              <h4>0</h4>
            </div>
            <div className={styles.status}>
              <h3>Статус:</h3>
              <h4>на голосовании</h4>
            </div>
          </div>
          <div className={styles.description}>
            <h3>описание:</h3>
            <p>
              Описание Описание Описание Описание Описание Описание Описание Описание Описание
              Описание Описание Описание Описание Описание Описание Описание Описание Описание
              Описание Описание Описание Описание Описание Описание Описание Описание Описание
              Описание Описание Описание Описание Описание{' '}
            </p>
          </div>
          <div className={styles.contacts}>
            <h3>контакты автора: </h3>
            <div className={styles.contactsCentr}>
              <p>Контакты Контакты Контакты Контакты </p>
            </div>
          </div>
          <div className={styles.button}>
            <button>Проголосовать</button>
          </div>
          <p className={styles.back}>к другим идеям...</p>
        </div>
      </section>
    </div>
  );
};

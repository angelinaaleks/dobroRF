import React from 'react';
import styles from './styles.module.scss';

export const Footer = () => {
  return (
    <div>
      <section className={styles.contact}>
        <div className={styles.contactText}>
          <p>Контактная информация</p>
          <p className={styles.textOtst}>
            Адрес: г. Санкт-Петербург, ул. Софийская, дом 38, корпус 2
          </p>
          <p className={styles.textOtst}>Телефон: +7 (812) 411-85-75</p>
          <p>Электронная почта: pmdcfrunz@mail.ru</p>
          <button className={styles.contactButton}>Обратная связь</button>
        </div>
        <div className={styles.contactIcon}>
          <h3>Мы в социальных сетях</h3>
          <div className={styles.Icon}>
            <img src="images/vk.svg" />
            <img src="images/max.svg" />
            <img src="images/ob.svg" />
          </div>
        </div>
      </section>
    </div>
  );
};

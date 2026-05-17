import React from 'react';
import styles from './styles.module.scss';
import { ContextApp } from '../../context';

export const Footer = () => {
  const { openSV, setOpenSV } = React.useContext(ContextApp);
  console.log(openSV);
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
          <button onClick={() => setOpenSV(true)} className={styles.contactButton}>
            Обратная связь
          </button>
        </div>
        <div className={styles.contactIcon}>
          <h3>Мы в социальных сетях</h3>
          <div className={styles.Icon}>
            <img
              onClick={() =>
                window.open('https://vk.com/opmifrunz', '_blank', 'noopener,noreferrer')
              }
              src="/images/vk.svg"
              alt="VK"
            />
            <img
              onClick={() =>
                window.open(
                  'https://max.ru/id7816376882_gos?utm_source=maxhubs.ru',
                  '_blank',
                  'noopener,noreferrer',
                )
              }
              src="/images/max.svg"
              alt="MAX"
            />
            <img
              onClick={() =>
                window.open('https://center.dobro.ru/', '_blank', 'noopener,noreferrer')
              }
              src="/images/ob.svg"
              alt="DOBRO"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

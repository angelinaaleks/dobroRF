import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const MainPage = () => {
  // Данные для ленты активностей (временные, позже из CMS)
  const activities = [
    {
      id: 1,
      title: 'АКТИВНОСТЬ',
      description: 'О активности кратко',
      image: '/images/activity1.jpg',
    },
    {
      id: 2,
      title: 'АКТИВНОСТЬ',
      description: 'О активности кратко',
      image: '/images/activity2.jpg',
    },
    {
      id: 3,
      title: 'АКТИВНОСТЬ',
      description: 'О активности кратко',
      image: '/images/activity3.jpg',
    },
  ];

  // Логотипы партнёров (временные)
  const partners = [
    { id: 1, name: 'Партнёр 1', logo: '/partners/partner1.png' },
    { id: 2, name: 'Партнёр 2', logo: '/partners/partner2.png' },
    { id: 3, name: 'Партнёр 3', logo: '/partners/partner3.png' },
    { id: 4, name: 'Партнёр 4', logo: '/partners/partner4.png' },
  ];

  return (
    <main className={styles.mainPage}>
      {/* Герой-секция с приветствием */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Твоё доброе дело начинается здесь</h1>
          <div className={styles.heroContent}>
            <img src="./dobro.png" />
            <div>
              <p className={styles.heroText}>
                ДоброЦентр «Фрунзенский» — это пространство, где рождаются искренняя помощь, новые
                друзья и настоящие перемены вокруг. Мы объединяем активных, неравнодушных людей
                Фрунзенского района.
              </p>
              <p className={styles.heroSubtext}>
                Хочешь помогать, развиваться, находить единомышленников? Просто будь собой и делай
                добро вместе с нами.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Лента активностей */}
      <section className={styles.activities}>
        <div className={styles.container}>
          <div className={styles.activitiesTitle}>
            <svg
              viewBox="0 0 44 40"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="44.000000"
              height="40.000000"
              fill="none"
              customFrame="#000000">
              <ellipse
                id="Эллипс 2"
                rx="22.000000"
                ry="20.000000"
                cx="22"
                cy="20"
                fill="rgb(255,93,0)"
              />
            </svg>
            <h2 className={styles.sectionTitle}>ЛЕНТА АКТИВНОСТЕЙ</h2>
            <svg
              viewBox="0 0 44 40"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="44.000000"
              height="40.000000"
              fill="none"
              customFrame="#000000">
              <ellipse
                id="Эллипс 2"
                rx="22.000000"
                ry="20.000000"
                cx="22"
                cy="20"
                fill="rgb(255,93,0)"
              />
            </svg>
          </div>
          <div className={styles.activitiesGrid}>
            {activities.map((activity) => (
              <div key={activity.id} className={styles.activityCard}>
                <div className={styles.activityImage}>
                  <img src={activity.image} alt={activity.title} />
                </div>
                <h3 className={styles.activityTitle}>{activity.title}</h3>
                <p className={styles.activityDescription}>{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

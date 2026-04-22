import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';

export const MainPage = () => {
  const location = useLocation();
  // Данные для ленты активностей
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

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onClickLink = (e, path) => {
    //e.preventDefault();
    if (location.pathname === path) {
      scrollToTop(e);
    } else {
      window.location.href = path;
    }
  };

  return (
    <main className={styles.mainPage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Твоё доброе дело начинается здесь</h1>
          <div className={styles.heroContent}>
            <img className={styles.heroImg} src="images/dobro.png" />
            <div className={styles.heroText}>
              <p>
                ДоброЦентр «Фрунзенский» — это пространство, где рождаются искренняя помощь, новые
                друзья и настоящие перемены вокруг.
              </p>
              <p>Мы объединяем активных, неравнодушных людей Фрунзенского района.</p>
              <p className={styles.heroTextOtst}>
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
          <div className={styles.title}>
            <div className={styles.activitiesTitle}>
              <svg
                className={styles.circle}
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
                className={styles.circle}
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
            <svg
              className={styles.smile}
              viewBox="0 0 183 133"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="183.000000"
              height="133.000000"
              fill="none"
              customFrame="#000000">
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
                  image-fill-type="fill"
                  patternContentUnits="objectBoundingBox">
                  <use
                    transform="matrix(0.0133333,0,0,0.0183459,0,-0.0228572)"
                    xlinkHref="#image_0"
                  />
                </pattern>
              </defs>
              <rect
                id="12 1"
                width="183.000000"
                height="133.000000"
                x="0.000000"
                y="0.000000"
                fill="url(#pattern_0)"
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
      {/* "Все волонтёрские события" */}
      <section className={styles.volunteer}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>Все волонтёрские события</h2>
            <img src="images/volunteer.svg" />
          </div>
          <div className={styles.youthLife}>
            <h2 className={styles.youthLifeTitle}>Молодёжная жизнь района</h2>
            <div className={styles.youthContent}>
              <img alt="Картинка" />
              <div className={styles.youthContentText}>
                <Link
                  to="/youth-life"
                  onClick={(e) => onClickLink(e, '/youth-life')}
                  className={styles.buttonLink}>
                  ПЕРЕЙТИ В РАЗДЕЛ
                </Link>
                <p>
                  Где во Фрунзенском районе провести время с пользой и интересом? Мы собрали для вас
                  подборку бесплатных клубов и кружков на базе Молодёжного центра.
                </p>
              </div>
            </div>
            <div className={styles.partners}>
              <h2>Нас поддерживают и помогают вместе с нами</h2>
              <div className={styles.partnersGrid}>
                {partners.map((partner) => (
                  <div key={partner.id} className={styles.partnerContent}>
                    <img src={partner.logo} />
                    <p>{partner.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

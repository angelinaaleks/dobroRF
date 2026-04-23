import React from 'react';
import styles from './styles.module.scss';
import clubs from '../../assets/club.json';
import { Pagination } from '../../Components/Pagination';

export const Young = () => {
  const [Page, setPage] = React.useState(1);
  return (
    <div>
      <section className={styles.YoungPage}>
        <div className={styles.title}>
          <h2>Молодёжная жизнь района</h2>
          <h3>
            Это ваш шанс найти хобби, новых друзей и наставников, не выходя из шаговой доступности.
          </h3>
          <div className={styles.titleSvg}>
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
        </div>
        <div className={styles.listOfClubs}>
          <h2>СПИСОК КЛУБОВ</h2>
          <div className={styles.clubs}>
            {clubs.slice(Page * 3 - 3, Page * 3).map((club) => (
              <div key={club.id} className={styles.club}>
                <img src={club.image} />
                <div className={styles.clubText}>
                  <h3>{club.title}</h3>
                  <h4>Адрес: {club.address}</h4>
                  <h4>О клубе: {club.about}</h4>
                  {Object.keys(club.networks).length > 1 ? (
                    <h4>Ссылки на соц.сети клуба: </h4>
                  ) : (
                    <h4>
                      Ссылка на соц.сеть клуба: <a>{}</a>
                    </h4>
                  )}
                  {Object.entries(club.networks).map(([name, url], index) => (
                    <span>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {name}
                      </a>
                      {index < Object.entries(club.networks).length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Pagination className={styles.pagination} onChangePage={(number) => setPage(number)} />
        </div>
        <div className={styles.mapGoodDeeds}>
          <h2>Интерактивная карта "добрых" мест</h2>
          <div className={styles.map}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeb2b406ed2d516d6c50768dab82d5ec2a68536ed3b722b08cb44a88244c5dd32&amp;source=constructor"
              width="100%"
              height="740"
              frameborder="0"></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

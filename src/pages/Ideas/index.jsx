import React from 'react';
import styles from './styles.module.scss';
import youIdeas from '../../assets/youIdeas.json';
import { Pagination } from '../../Components/Pagination';
import { Idea } from '../../Components/Idea';

export const Ideas = () => {
  const [Page, setPage] = React.useState(1);
  const [PageYou, setPageYou] = React.useState(1);
  const [ideas, setIdeas] = React.useState([]);
  const [valueSearch, setValueSearch] = React.useState('');
  const [filterIdeas, setFilterIdeas] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  React.useEffect(() => {
    fetch(`https://6913056e52a60f10c823b49a.mockapi.io/items`)
      .then((res) => res.json())
      .then((obj) => {
        setIdeas(obj);
      });
  }, []);

  React.useEffect(() => {
    if (!valueSearch.trim()) {
      setFilterIdeas(ideas);
    } else {
      const searchLower = valueSearch.toLowerCase();
      const filtered = ideas.filter(
        (idea) =>
          idea.title.toLowerCase().includes(searchLower) ||
          idea.about.toLowerCase().includes(searchLower),
      );
      setFilterIdeas(filtered);
    }
  }, [valueSearch, ideas]);

  return (
    <div>
      <section className={styles.ideasPage}>
        <div className={styles.title}>
          <h2>Копилка добрых идей</h2>
          <h3>Твоя идея — чья-то добрая реальность</h3>
          <div className={styles.titleSvg}>
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
            <svg
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
        <div className={styles.ideas}>
          <h2 className={styles.IdeasTitle}>Список идей</h2>
          <div className={styles.search}>
            <div className={styles.searchBlock}>
              <input
                placeholder="Поиск идеи"
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}></input>
              <svg
                onClick={() => setValueSearch('')}
                className={styles.clear}
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 20L4 4.00003M20 4L4.00002 20"
                  stroke="#000"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                onClick={() => setSearchTerm(valueSearch)}
                viewBox="0 0 70 72"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="70.000000"
                height="72.000000"
                fill="none">
                <rect
                  id="search"
                  width="70.000000"
                  height="72.000000"
                  x="0.000000"
                  y="0.000000"
                  fill="rgb(255,255,255)"
                  fill-opacity="0"
                />
                <path
                  id="矢量 267"
                  d="M45.2083 42L42.9042 42L42.0875 41.19C44.9458 37.77 46.6667 33.33 46.6667 28.5C46.6667 17.73 38.1792 9 27.7083 9C17.2375 9 8.75 17.73 8.75 28.5C8.75 39.27 17.2375 48 27.7083 48C32.4042 48 36.7208 46.23 40.0458 43.29L40.8333 44.13L40.8333 46.5L55.4167 61.47L59.7625 57L45.2083 42ZM27.7083 42C20.4458 42 14.5833 35.97 14.5833 28.5C14.5833 21.03 20.4458 15 27.7083 15C34.9708 15 40.8333 21.03 40.8333 28.5C40.8333 35.97 34.9708 42 27.7083 42Z"
                  fill="rgb(68,68,68)"
                  fill-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          {filterIdeas.length == 0 ? (
            <div className={styles.notFoundSearch}>
              <h3>Ничего не найдено</h3>
            </div>
          ) : (
            <div>
              {filterIdeas.slice(Page * 2 - 2, Page * 2).map((idea) => (
                <div key={idea.id} className={styles.idea}>
                  <div className={styles.ideaTitle}>
                    <h2>{idea.title}</h2>
                    <h2>Голоса: {idea.vote}</h2>
                    <h6 className={styles[idea.statusColor]}>{idea.status}</h6>
                  </div>
                  <p>подробнее...</p>
                </div>
              ))}
              <Pagination
                className={styles.pagination}
                onChangePage={(number) => setPage(number)}
              />
            </div>
          )}
        </div>
        <div>
          <h2 className={styles.IdeasTitle}>Ваши идеи</h2>
          {youIdeas.length > 0 ? (
            <div>
              <div className={styles.youIdeas}>
                {youIdeas.slice(PageYou * 2 - 2, PageYou * 2).map((idea) => (
                  <div key={idea.id} className={styles.idea}>
                    <div className={styles.ideaTitle}>
                      <h2>{idea.title}</h2>
                      <h2>Голоса: {idea.vote}</h2>
                      <h6>Статус</h6>
                    </div>
                    <p>подробнее...</p>
                  </div>
                ))}
              </div>
              <Pagination
                className={styles.pagination}
                onChangePage={(number) => setPageYou(number)}
              />
            </div>
          ) : (
            <div className={styles.notFound}>
              <h2>Есть идеи?</h2>
            </div>
          )}
        </div>
        <form>
          <h2>Форма для отправки идеи </h2>
          <div className={styles.titleInput}>
            <h3>название:</h3>
            <input placeholder="Название вашей идеи" />
          </div>
          <div className={styles.description}>
            <h3>описание:</h3>
            <textarea cols={60} placeholder="Опишите подробно свою идею" />
          </div>
          <div className={styles.contacts}>
            <h3>контакты автора:</h3>
            <div className={styles.contactsInput}>
              <input placeholder="Укажите свои контакты (соц.сети, номер, почта)" />
              <button type="submit">Отправить</button>
            </div>
          </div>
        </form>
        {/* <Idea /> */}
      </section>
    </div>
  );
};

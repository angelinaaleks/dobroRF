import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';
import clubs from '../../assets/club.json';

export const Pagination = ({ onChangePage }) => {
  const pageCount = Math.ceil(clubs.length / 3);
  return (
    <ReactPaginate
      className={styles.Paginate}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  );
};

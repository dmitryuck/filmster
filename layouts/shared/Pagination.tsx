import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import styles from './Pagination.scss';


const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}


interface Props {
  currentPage: number;
  totalRecords: number;
  pageLimit: number;
  pageNeighbours: number;
  onPageChanged: Function;
}

const Pagination = (props: Props) => {
  const pageNeighbours = Math.max(0, Math.min(props.pageNeighbours, 2));
  const totalPages = Math.ceil(props.totalRecords / props.pageLimit);

  const gotoPage = (page) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    props.onPageChanged(currentPage);
  }

  const handleClick = (page) => (evt) => {
    evt.preventDefault();
    gotoPage(page);
  }

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    gotoPage(props.currentPage - (pageNeighbours * 2) - 1);
  }

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    gotoPage(props.currentPage + (pageNeighbours * 2) + 1);
  }

  const getPageNumbers = () => {
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, props.currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, props.currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }

  const renderItems = () => {
    return getPageNumbers().map((page, index) => {
      if (page === LEFT_PAGE) return (
        <li key={index} className={styles.pageItem}>
          <a className={styles.pageLink} href="#" aria-label="Previous" onClick={handleMoveLeft}>
            <span aria-hidden="true">&laquo;</span>
            <span>Previous</span>
          </a>
        </li>
      );

      if (page === RIGHT_PAGE) return (
        <li key={index} className={styles.pageItem}>
          <a className={styles.pageLink} href="#" aria-label="Next" onClick={handleMoveRight}>
            <span aria-hidden="true">&raquo;</span>
            <span>Next</span>
          </a>
        </li>
      );

      return (
        <li key={index} className={classnames(styles.pageItem, props.currentPage === page ? styles.active : '')}>
          <a className={styles.pageLink} href="#" onClick={handleClick(page)}>{page}</a>
        </li>
      );
    })
  }

  return (
    <ul className={styles.pagination}>
      {renderItems()}
    </ul>
  );
}

export default Pagination;
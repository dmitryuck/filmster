import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container } from 'react-grid-system';
import Film from '../../server/interfaces/Film';
import FilmCard from './FilmCard/FilmCard';
import Pagination from '../shared/Pagination';
import { getFilms, getLoading, getMessage, getPage, getTotal } from '../../redux/selectors/AppSelectors';
import AppActions from '../../redux/actions/AppActions';
import styles from './Home.scss';


const Home = () => {
  const dispatch = useDispatch();

  const films = useSelector(getFilms);
  const loading = useSelector(getLoading);
  const message = useSelector(getMessage);
  const page = useSelector(getPage);
  const total = useSelector(getTotal);

  const renderFilms = () => films?.map((film: Film, index: number) => <FilmCard key={index} data={film} />);

  const onPageChanged = (page: number) => {
    dispatch(AppActions.setPage(page));
  }

  return (
    <Container className={styles.gridContainer}>
      <Row>
        <Col xs={12}>
          <div className={styles.homeContainer}>
            {renderFilms()}
            {message && <span>{message}</span>}
            {loading && <span>Loading...</span>}
          </div>

          <Pagination currentPage={page} totalRecords={total} pageLimit={10} pageNeighbours={1} onPageChanged={onPageChanged} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
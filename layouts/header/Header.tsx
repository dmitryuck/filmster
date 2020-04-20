import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Row, Col, Container } from 'react-grid-system';
import { useSelector, useDispatch } from 'react-redux';
import AppActions from '../../redux/actions/AppActions';
import Input from '../shared/Input';
import ServerApi from '../../server/enums/ServerApi';
import { getRequest } from '../../client/PageUtils';
import { useDebounce } from '../../client/PageUtils';
import { getPage } from '../../redux/selectors/AppSelectors';
import ClientDb from '../../client/ClientDb';
import styles from './Header.scss';


const Header = () => {
  const dispatch = useDispatch();

  const page = useSelector(getPage);

  const [search, setSearch] = useState('');

  const clearDelayTime = 30000;

  const debSearch = useDebounce(search, 300);


  useEffect(() => {
    setTimeout(async() => {
      if (typeof window !== 'undefined') {
        await ClientDb.inst.openDb('films', 1, ['searches']);

        await ClientDb.inst.clearCollection('searches');
      }
    });
  }, []);


  useEffect(() => {
    if (search.length >= 3) {
      setTimeout(async() => {
        dispatch(AppActions.setLoading(true));

        if (typeof window !== 'undefined') {
          await ClientDb.inst.openDb('films', 1, ['searches']);

          const localSearch = await ClientDb.inst.getData('searches', search + '-' + page);

          if (localSearch) {
            dispatch(AppActions.setFilms(localSearch.data));
          } else {
            const [fetchError, fetchResult] = await getRequest(ServerApi.FETCH_FILMS, { search, page });

            if (fetchResult['Response'] === 'True') {
              dispatch(AppActions.setFilms(fetchResult['Search']));
              dispatch(AppActions.setTotal(parseInt(fetchResult['totalResults'])));
              dispatch(AppActions.setMessage(''));

              await ClientDb.inst.addData('searches', {key: search + '-' + page, data: fetchResult['Search']});
            } else {
              dispatch(AppActions.setMessage(fetchResult['Error']));
              dispatch(AppActions.setTotal(0));

              dispatch(AppActions.setFilms([]));
            }
          }

          setTimeout(async() => {
            await ClientDb.inst.deleteData('searches', search);
          }, clearDelayTime);
        }

        dispatch(AppActions.setLoading(false));
      });
    } else {
      dispatch(AppActions.setFilms([]));
      dispatch(AppActions.setTotal(0));
      dispatch(AppActions.setMessage(''));
    }
  }, [debSearch, page]);

  return (
    <Container fluid className={styles.headerGrid}>
      <Row className={styles.headerContainer}>
        <Col xs={12}>
          <Container>
            <Row>
              <Col xs={2}>
                <Link href="/">
                  <div className={styles.logoContainer}>
                    <img src="/img/logo.svg" />
                    <h1>Filmster</h1>
                  </div>
                </Link>
              </Col>

              <Col xs={10}>
                <div className={styles.searchContainer}>
                  <Input onChange={setSearch} />
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
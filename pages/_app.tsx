import React, { Fragment } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import store from '../redux/store';

import '../public/css/reset.css';
import '../public/css/main.css';


interface State {}

interface Props {
  store: Store;
  pageProps: any;
  Component: any;
  ctx: any;
}

class MyApp extends App<Props, State> {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Fragment>
          <Component {...pageProps} />
        </Fragment>
      </Provider>
    );
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
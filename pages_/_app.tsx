import React from 'react';
import { SWRConfig } from 'swr';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
// import { initGA, logPageView } from '../utils/analytics';

import fetcher from '../lib/fetcher';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default class MyApp extends App {
  componentDidMount() {
    // initGA();
    // logPageView();
    // Router.events.on('routeChangeCompolete', logPageView);
    window.onunload = () => {
      fetcher('/api/logout');
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <SWRConfig
          value={{
            // refreshInterval: 5000,
            fetcher,
            onError: (err) => {
              // eslint-disable-next-line no-console
              console.error(err);
            },
          }}
        >
          {/*  eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    );
  }
}

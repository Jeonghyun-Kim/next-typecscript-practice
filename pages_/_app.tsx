import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
// import Router from 'next/router';
// import { initGA, logPageView } from '../utils/analytics';

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
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        {/*  eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

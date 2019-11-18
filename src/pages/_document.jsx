import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return {
      ...page,
      styleTags,
    };
  }

  render() {
    return (
      <html lang="en-US">
        <Head>
          <script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js" />
          <script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-auth.js" />
          <script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-firestore.js" />
          <script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-storage.js" />

          {this.props.styleTags}
        </Head>
        <body
          style={{
            margin: 0,
          }}
        >
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

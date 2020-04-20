import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';


class NextSite extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
    };
  }

  render() {
    return (
      <Html lang="en">
        <title>Filmster</title>

        <Head>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta name="theme-color" content="#fafafa" />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default NextSite;
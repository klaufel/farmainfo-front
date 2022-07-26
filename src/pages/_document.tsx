import Document, { Html, Head, Main, NextScript } from 'next/document';

import config from '@farmainfo/config';

const { GTAG_ID } = config;

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#3bbb8c" />
          <meta name="theme-color" content="#ffffff" />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTAG_ID}');
            `,
            }}
          />
        </Head>
        <body className="bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

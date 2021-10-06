import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from 'styled-components';

import { ThemeLight } from 'styles/themeLight';
import { BASE_PATH } from 'utils/consts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src={`${BASE_PATH}/assets/simcapi-js-3.0.6.min.js`}
        strategy="beforeInteractive"
      />
      <ThemeProvider theme={ThemeLight}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

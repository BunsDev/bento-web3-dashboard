import React, { useEffect } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import { RecoilRoot } from 'recoil';

import 'react-notifications-component/dist/theme.css';
import '@/styles/tailwind.css';
import '@/styles/global.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.querySelector('body').classList.remove('preload');
  }, []);

  return (
    <RecoilRoot>
      <ReactNotifications />
      <Component {...pageProps} />
      <div id="portal" />
    </RecoilRoot>
  );
}

export default MyApp;
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { SocketProvider } from '../src/rainComputing/contextProviders/SocketProvider';
import { NotificationsProvider } from '../src/rainComputing/contextProviders/NotificationsProvider';
import { UserProvider } from '../src/rainComputing/contextProviders/UserProvider';

const root = document.getElementById('root');

const app = (
  <Provider store={store}>
    <UserProvider>
      <SocketProvider>
        <NotificationsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotificationsProvider>
      </SocketProvider>
    </UserProvider>
  </Provider>
);

const rootElement = createRoot(root);
rootElement.render(app);
serviceWorker.unregister();
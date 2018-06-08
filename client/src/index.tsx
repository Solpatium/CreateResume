import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
  registerServiceWorker();
}
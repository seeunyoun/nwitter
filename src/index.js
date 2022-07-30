import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import firebase from './Firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> Stric Mode에서 두 번씩 렌더링 됨.
    <App />
  // </React.StrictMode>
);


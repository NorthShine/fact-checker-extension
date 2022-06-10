import { useEffect, useState } from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';

const Popup = () => {
  const [url, setUrl] = useState<string>('');
  const getCurrentTabUrl = () => new Promise<string>((resolve, reject) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const [activeTab] = tabs;
      const { url: tabURL } = activeTab;
      if (typeof tabURL === 'string') {
        resolve(tabURL);
      }
      reject(new Error('Unable to get the current tab'));
    });
  });

  useEffect(() => {
    getCurrentTabUrl().then(setUrl).catch(console.error);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/pages/popup/Popup.jsx</code>
          {' '}
          and save to reload.
        </p>
        <p>
          Current tab url:
          {' '}
          {url}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
    </div>
  );
};

export default Popup;

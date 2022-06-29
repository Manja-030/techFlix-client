import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import movieApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { Container } from 'react-bootstrap';

import MainView from './components/main-view/main-view';
import Loader from './components/loader/loader';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(movieApp, devToolsEnhancer());

// Main component - will eventually use all the others
function TechFlixApplication() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <Provider store={store}>
      <>
        {loading === false ? (
          <Container>
            <MainView />
          </Container>
        ) : (
          <Loader />
        )}
      </>
    </Provider>
  );
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(TechFlixApplication), container);

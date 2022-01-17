import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component - will eventually use all the others
class TechFlixApplication extends React.Component {
  render() {
    return (
      <div className="tech-flix">
        <Container>
          <MainView />
        </Container>
      </div>
    );
  }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(TechFlixApplication), container);

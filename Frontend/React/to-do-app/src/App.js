import React from 'react';
import Container from 'react-bootstrap/Container'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HeaderContainer from './Containers/HeaderContainer'
import BodyContainer from './Containers/BodyContainer';


function App() {
  return (
    <div style={{height: '100%'}}>
      <Container fluid style={{height: '100%'}}>
        <HeaderContainer />
        <BodyContainer />
      </Container>
    </div>
  );
}

export default App;

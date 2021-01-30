import React from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Attendance from './features/homeStudent/Attendance';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
  return (
    <div className="App">
      <Navigation />
      <h1 className="text-center">Kognitívne vedy: mozog a myseľ</h1>
      <section className="App-header">  
        <Container fluid>
          <Row>
             <Col lg={4}> <Attendance />  </Col>
             <Col lg={8}> Domaca uloha 1  </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default App;

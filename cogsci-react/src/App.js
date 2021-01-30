import React, {useEffect} from 'react';
import './App.css';
import {useSelector} from 'react-redux'
import Navigation from './components/Navigation'
import Attendance from './features/homeStudent/Attendance';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {getLoading} from './features/homeStudent/homeStudentSlice'

function App() {
  const isLoading = useSelector(getLoading)

  useEffect(()=>{
    document.body.style.cursor = isLoading ? "progress" : ""
})


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

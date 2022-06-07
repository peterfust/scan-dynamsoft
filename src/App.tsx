import React from 'react';
import './App.css';
import {Scanner} from "./components/scanner/Scanner"
import {Footer} from "./components/footer/Footer";
import Container from "./components/container/Container";
import {Header} from "./components/heading/Header";

function App() {
  return (
    <div className="App">
        <Container>
            <Header title="Scan your documents"/>
            <div className="content">
                <Scanner/>
            </div>
            <Footer/>
        </Container>
    </div>
  );
}

export default App;

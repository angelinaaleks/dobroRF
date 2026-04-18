import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import './index.css';
import './App.css';
import { MainPage } from './pages/MainPage/Main';
import { Footer } from './Components/Footer';
import { About } from './pages/About';
import { Young } from './pages/Young';
import { Ideas } from './pages/Ideas';
import { Hall } from './pages/Hall';


//<Route path="/map" element={<div>Карта</div>} />
//<Route path="/contacts" element={<div>Контакты</div>} />


function App() {
    return (
        <Router>
            <Header />
            <main className='mainTop'>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/youth-life" element={<Young />} />
                    <Route path="/ideas" element={<Ideas />} />
                    <Route path="/hall-of-fame" element={<Hall />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
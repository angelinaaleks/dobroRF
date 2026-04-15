import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import './index.css';
import './App.css';
import { MainPage } from './pages/MainPage/Main';
import { Footer } from './Components/Footer';
import { About } from './pages/About';
import { Young } from './pages/Young';

function App() {
    return (
        <Router>
            <Header />
            <main className='mainTop'>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/youth-life" element={<Young />} />
                    <Route path="/map" element={<div>Карта</div>} />
                    <Route path="/ideas" element={<div>Копилка идей</div>} />
                    <Route path="/hall-of-fame" element={<div>Зал славы</div>} />
                    <Route path="/contacts" element={<div>Контакты</div>} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
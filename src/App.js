import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import './index.css';
import './App.css';
import { MainPage } from './pages/MainPage/Main';
import { Footer } from './Components/Footer';

function App() {
    return (
        <Router>
            <Header />
            <main style={{ marginTop: '80px' }}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<div>О центре</div>} />
                    <Route path="/youth-life" element={<div>Молодёжная жизнь</div>} />
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
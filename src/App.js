import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import './index.css';
import './App.css';
import { MainPage } from './pages/MainPage';
import { Footer } from './Components/Footer';
import { About } from './pages/About';
import { Young } from './pages/Young';
import { Ideas } from './pages/Ideas';
import { Hall } from './pages/Hall';
import { ContextApp } from './context';
import { Modal } from './Components/Modal';


//<Route path="/map" element={<div>Карта</div>} />
//<Route path="/contacts" element={<div>Контакты</div>} />


function App() {
    const [openSV, setOpenSV] = React.useState(false);
    return (
        <ContextApp.Provider value={{ setOpenSV, openSV }}>
            <Router>
                <div className={openSV ? "mainTopOpacity" : ""}>
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
                </div>
                {openSV && <div className='feedback'> <Modal /> </div>}
            </Router>
        </ContextApp.Provider>
    );
}

export default App;
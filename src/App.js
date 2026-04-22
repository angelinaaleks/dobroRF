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
import { Idea } from './Components/Idea';


//<Route path="/map" element={<div>Карта</div>} />
//<Route path="/contacts" element={<div>Контакты</div>} />


function App() {
    const [openSV, setOpenSV] = React.useState(false);
    const [ideas, setIdeas] = React.useState([]);
    React.useEffect(() => {
        fetch(`https://6913056e52a60f10c823b49a.mockapi.io/items`)
            .then((res) => res.json())
            .then((obj) => {
                setIdeas(obj);
            });
    }, []);

    return (
        <ContextApp.Provider value={{ setOpenSV, openSV, ideas, setIdeas }}>
            <Router>
                <div className={openSV ? "mainTopOpacity" : ""}>
                    <Header />
                    <img className='right' src="images/right.svg" />
                    <img className='left' src="images/left.svg" />
                    <div className='bottom'>
                        <img className='bottomImageLeft' src="images/bottom.svg" />
                        <img className='bottomImageRight' src="images/bottom.svg" />
                    </div>
                    <main className='mainTop'>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/youth-life" element={<Young />} />
                            <Route path="/ideas" element={<Ideas />} />
                            <Route path="/hall-of-fame" element={<Hall />} />
                            <Route path="/ideas/:id" element={<Idea />} />
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
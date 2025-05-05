import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header.jsx';

function App() {
    return (
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
}

export default App;
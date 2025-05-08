import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';



// Сторінка помилки .Виводиться коли URL не може бути знайдений . Наприклад прописати ".../erererer" - де ... це початковий екран або щось інше
function NotFoundPage() {
    return (
        <div className="NotFoundContainer">
            <h1 className="NotFoundTitle">404</h1>
            <h2 className="NotFoundSubtitle">Сторінку не знайдено</h2>
            <p className="NotFoundText">
                Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
            </p>
            <Link to="/">На Головну</Link>

        </div >
    );
};

export default NotFoundPage;
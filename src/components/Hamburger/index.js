import './index.css';
import React from 'react';

const Hamburger = ({ ham, open, handleClick }) => {
    return (
        <div>
            <div
                className={`ham-box ${open ? 'rotate' : ''} ${!ham && 'ham-hidden'}`}
                onClick={handleClick}
            >
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </div>
    );
};

export default Hamburger;

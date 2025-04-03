import React, { useState, useEffect } from 'react';
import theatersData from '../data/theaters.json';

const TheaterList = ({ onSelectTheater }) => {
    const [theaters, setTheaters] = useState([]);

    useEffect(() => {
        setTheaters(theatersData);
    }, []);

    return (
        <div className="theater-list">
            <h2>Select a Theater</h2>
            <ul>
                {theaters.map(theater => (
                    <li key={theater.id} onClick={() => onSelectTheater(theater)}>
                        <h3>{theater.name}</h3>
                        <p>{theater.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TheaterList;
import React, { useState, useEffect } from 'react';
import rawData from '../Data/Item';
import Header from '../Components/Header.jsx';
import Foundlist from '../Found/Found.jsx';

function Foundpage() {
    const [filteredData, setFilteredData] = useState([]);
    
    useEffect(() => {
        const savedData = localStorage.getItem("foundItems");
        if (savedData) {
            setFilteredData(JSON.parse(savedData));
        } else {
            const data = Array.isArray(rawData) ? rawData : [];
            setFilteredData(data);
        }
    }, []);

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <Foundlist data={filteredData} />
            </div>
        </div>
    );
}

export default Foundpage;
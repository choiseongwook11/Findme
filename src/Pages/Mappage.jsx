import React from 'react';
import { useLocation } from "react-router-dom";
import Kakaomap from '../Components/Kakaomap.jsx';
import Header from '../Components/Header.jsx';

function Mappage() {
    const { state } = useLocation();
    const { location } = state || {};
    
    return (
        <div>
            <Header />
            <div>
                <Kakaomap location={location} />
            </div>
        </div>
    );
}

export default Mappage;
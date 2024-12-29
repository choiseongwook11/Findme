import React from 'react';
import Kakaomap from '../Components/Kakaomap.jsx';
import Header from '../Components/Header.jsx';

function Mainpage() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <Kakaomap />
            </div>
        </div>
    );
}

export default Mainpage;

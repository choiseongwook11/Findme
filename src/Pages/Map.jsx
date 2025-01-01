import React from 'react';
import Allmap from '../Components/Allmap.jsx';
import Header from '../Components/Header.jsx';

function Map() {

    return (
        <div>
            <Header />
            <div>
                <Allmap /> {/* 전달된 지역 데이터 */}
            </div>
        </div>
    );
}

export default Map;
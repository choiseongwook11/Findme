import React, { useEffect, useState } from "react";
import { Map, MarkerClusterer, CustomOverlayMap } from "react-kakao-maps-sdk";

function Allmap() {
const [positions, setPositions] = useState([]);

const clusterPositionsData = {
    positions: [
    { lat: 36.2683, lng: 127.6358 },
    { lat: 36.2700, lng: 127.6380 },
    { lat: 36.2750, lng: 127.6320 },
    { lat: 36.2800, lng: 127.6400 },
    ],
};

useEffect(() => {
    setPositions(clusterPositionsData.positions);
}, [clusterPositionsData.positions]);

return (
    <Map
    center={{
        lat: 36.2683,
        lng: 127.6358,
    }}
    style={{
        width: "100%",
        height: "450px",
    }}
    level={14}
    >
    <MarkerClusterer
        averageCenter={true}
        minLevel={10}
    >
        {positions.map((pos, idx) => (
        <CustomOverlayMap
            key={`${pos.lat}-${pos.lng}`}
            position={{
            lat: pos.lat,
            lng: pos.lng,
            }}
        >
            <div
            style={{
                color: "black",
                textAlign: "center",
                background: "white",
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            {idx + 1} {/* 마커 번호 */}
            </div>
        </CustomOverlayMap>
        ))}
    </MarkerClusterer>
    </Map>
);
}

export default Allmap;
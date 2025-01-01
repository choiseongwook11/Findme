import { React, useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styles from "../Style/map.module.css";

function Kakaomap({ location }) {
    const [info, setInfo] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);

    console.log("Location received in Kakaomap:", location);

    useEffect(() => {
        if (!map || !location) return;
    
        const { kakao } = window;
        const ps = new kakao.maps.services.Places(); // 장소 검색 서비스 객체 생성
    
        ps.keywordSearch(location, (result, status) => {
            console.log("Places API result:", result, "Status:", status);
    
            if (status === kakao.maps.services.Status.OK) {
                const coords = {
                    lat: parseFloat(result[0].y),
                    lng: parseFloat(result[0].x),
                };
    
                setMarkers([{ position: coords, content: location }]);
                map.setCenter(new kakao.maps.LatLng(coords.lat, coords.lng));
            } else {
                console.error("Places API failed with status:", status);
            }
        });
    }, [map, location]);

    return (
        <div className={styles["map-container"]}>
             <div className={styles["map-title"]}>{location ? location : "위치 정보가 없습니다."}</div> {/* 전달된 위치 출력 */}
            <Map
                center={{ lat: 37.566826, lng: 126.9786567 }}
                style={{ width: "900px", height: "550px", margin: "auto", fontFamily: "Paperlogy-5Medium, sans-serif" }}
                level={3}
                onCreate={setMap}
            >
                {markers.map((marker, index) => (
                    <MapMarker
                        key={`marker-${index}`}
                        position={marker.position}
                        onClick={() => setInfo(marker)}
                    >
                        {info?.content === marker.content && (
                            <div style={{ color: "#000" }}>{marker.content}</div>
                        )}
                    </MapMarker>
                ))}
            </Map>
        </div>
    );
}

export default Kakaomap;
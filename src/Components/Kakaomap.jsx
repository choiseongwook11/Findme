import { React, useRef, useState, useEffect  } from 'react';
import { Map, MarkerClusterer, MapMarker } from "react-kakao-maps-sdk";
import styles from "../Style/map.module.css";


function Kakaomap() {
    const mapRef = useRef();
    const [positions, setPositions] = useState([]);

    const clusterPositionsData = {
        positions: [
            { lat: 36.2683, lng: 127.6358 },
            { lat: 36.2683, lng: 127.6359 },
            { lat: 36.2690, lng: 127.6360 },
            { lat: 36.2683, lng: 127.6358 },
            { lat: 36.2683, lng: 127.6359 },
            { lat: 36.2690, lng: 127.6360 },

            { lat: 35.878541640363785, lng: 128.62654414081663 },
            { lat: 35.878541640363785, lng: 128.62654414081663 },
            { lat: 35.878541640363785, lng: 128.62654414081663 },
            { lat: 35.878541640363785, lng: 128.62654414081663 },
            { lat: 35.878541640363785, lng: 128.62654414081663 },
            { lat: 35.878541640363785, lng: 128.62654414081663 },
        ],
    };

    useEffect(() => {
        setPositions(clusterPositionsData.positions);
    },[])

    const onClusterclick = (_target, cluster) => {
        const map = mapRef.current
        // 현재 지도 레벨에서 1레벨 확대한 레벨
        const level = map.getLevel() - 1;

        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
        map.setLevel(level, {anchor: cluster.getCenter()});
    };
return (
    <div className={styles['map-container']}>
        <Map // 지도를 표시할 Container
        center={{
        // 지도의 중심좌표
        lat: 36.2683,
        lng: 127.6358,
        }}
        style={{
        // 지도의 크기
        width: "1000px",
        height: "600px",
        margin: "auto",
        }}
        level={12} // 지도의 확대 레벨
        ref={mapRef}
    >
        <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={10} // 클러스터 할 최소 지도 레벨
        disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        // 마커 클러스터러에 클릭이벤트를 등록합니다
        // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
        // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
        onClusterclick={onClusterclick}
        >
        {positions.map((pos) => (
            <MapMarker
            key={`${pos.lat}-${pos.lng}`}
            position={{
                lat: pos.lat,
                lng: pos.lng,
            }}
            />
        ))}
        </MarkerClusterer>
    </Map>
    </div>
);
}

export default Kakaomap;
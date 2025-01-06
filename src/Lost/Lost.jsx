import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import styles from "../Style/lost.module.css";
import Lostlist from "./Lostlist";
import "../Style/font.css";
import { buildApiUrl } from "../Data/Apiconfig.js";

const Lost = () => {
    const [data, setData] = useState([]);
    const [searchFields, setSearchFields] = useState({
        title: "",
        startDate: "",
        endDate: "",
        location: "",
        region: "",
    });
    const [filteredData, setFilteredData] = useState([]);
    const [isSearchComplete, setIsSearchComplete] = useState(false);
    const [lastFetched, setLastFetched] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem("lostItems");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setData(parsedData);
            setFilteredData(parsedData);
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        const cacheExpirationTime = 10 * 60 * 1000; // 10 minutes
        const currentTime = new Date().getTime();

        if (!lastFetched || currentTime - lastFetched > cacheExpirationTime) {
            try {
                // 기존 API 호출
                const apiUrl1 = buildApiUrl();
                const response1 = await fetch(apiUrl1, {
                    headers: {
                        Accept: "application/json",
                    },
                });

                let data1 = [];
                if (response1.ok) {
                    const result1 = await response1.json();
                    data1 = (result1?.response?.body?.items?.item || []).map((item) => ({
                        id: item.atcId,
                        prdtClNm: item.prdtClNm,
                        title: item.fdPrdtNm,
                        date: item.fdYmd,
                        map: item.depPlace,
                        description: item.fdSbjt,
                        state: "보관중",
                        image:
                            item.fdFilePathImg &&
                            item.fdFilePathImg !== "https://www.lost112.go.kr/lostnfs/images/sub/img02_no_img.gif"
                                ? item.fdFilePathImg
                                : "https://i.ibb.co/fQvvBhH/image.png",
                    }));
                } else {
                    console.error("API 1 호출 실패");
                }

                // 추가 API 호출
                const apiUrl2 =
                    "https://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccTpNmCstdyPlace?serviceKey=zSAXdQESWaDclJzqvuNXRlLDZxUTNzNDTwieZ0OykcY4%2FtrSgpXbbwjXCy0dUv9hDANnqKYH%2B%2BiUPEXnwLZpwg%3D%3D&PRDT_NM=%EC%A7%80%EA%B0%91&pageNo=1&numOfRows=1000";
                const response2 = await fetch(apiUrl2, {
                    headers: {
                        Accept: "application/json",
                    },
                });

                let data2 = [];
                if (response2.ok) {
                    const result2 = await response2.json();
                    data2 = (result2?.response?.body?.items?.item || []).map((item) => ({
                        id: item.atcId,
                        prdtClNm: item.prdtClNm,
                        title: item.fdPrdtNm,
                        date: item.fdYmd,
                        map: item.depPlace,
                        description: item.fdSbjt,
                        state: "보관중",
                        image:
                            item.fdFilePathImg && 
                            item.fdFilePathImg !== "https://www.lost112.go.kr/lostnfs/images/sub/img02_no_img.gif"
                                ? item.fdFilePathImg
                                : "https://i.ibb.co/fQvvBhH/image.png",
                    }));
                } else {
                    console.error("API 2 호출 실패");
                }

                // 데이터 병합
                const combinedData = [...data1, ...data2];

                // 최신순으로 정렬 (내림차순)
                const sortedData = combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

                setData(sortedData);
                setFilteredData(sortedData);
                setLastFetched(currentTime);
                localStorage.setItem("lostItems", JSON.stringify(sortedData));
            } catch (error) {
                console.error("API 호출 오류:", error);
            }
        } else {
            console.log("캐시된 데이터 사용");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const { title, startDate, endDate, location, region } = searchFields;
    
        const results = data.filter((item) => {
            const matchesTitle = title ? item.title.includes(title) : true;
            const matchesLocation = location ? item.map.includes(location) : true;
            const matchesRegion = region ? item.map.includes(region) : true;
    
            const matchesDate =
                (!startDate || new Date(item.date) >= new Date(startDate)) &&
                (!endDate || new Date(item.date) <= new Date(endDate));
    
            return matchesTitle && (matchesLocation || matchesRegion) && matchesDate;
        });
    
        setFilteredData(results);
        setIsSearchComplete(true);
    };

    return (
        <div className={styles["container"]}>
            <form className={styles["searchForm"]} onSubmit={handleSearch}>
                <div className={styles["formGroup"]}>
                    <label htmlFor="title">습득물명</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={searchFields.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles["formGroup"]}>
                    <label>기간</label>
                    <input
                        type="date"
                        name="startDate"
                        value={searchFields.startDate}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={searchFields.endDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles["formGroup"]}>
                    <label htmlFor="location">보관장소</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={searchFields.location}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles["formGroup"]}>
                    <label htmlFor="region">습득지역</label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        value={searchFields.region}
                        onChange={handleInputChange}
                    />
                </div>
                <Button variant="contained" type="submit" className={styles["searchButton"]}>
                    검색
                </Button>
            </form>

            {isSearchComplete && (
                <div className={styles["resultsCount"]}>
                    {filteredData.length > 0
                        ? `${filteredData.length}건의 검색 결과가 있습니다.`
                        : "검색 결과가 없습니다."}
                </div>
            )}

            <Lostlist data={filteredData} />
        </div>
    );
};

export default Lost;
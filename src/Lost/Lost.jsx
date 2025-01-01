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
        const cacheExpirationTime = 10 * 60 * 1000;
        const currentTime = new Date().getTime();
        
        if (!lastFetched || (currentTime - lastFetched > cacheExpirationTime)) {
            try {
                const apiUrl = buildApiUrl();
                const response = await fetch(apiUrl, {
                    headers: {
                        "Accept": "application/json",
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    const items = result?.response?.body?.items?.item || [];

                    const transformedData = items.map((item) => ({
                        id: item.atcId,
                        title: item.fdPrdtNm,
                        date: item.fdYmd,
                        map: item.depPlace,
                        state: "보관중",
                        image: item.fdFilePathImg && item.fdFilePathImg !== "https://www.lost112.go.kr/lostnfs/images/sub/img02_no_img.gif" 
                            ? item.fdFilePathImg 
                            : "https://i.ibb.co/HXkG8cR/notfound.png",
                    }));

                    setData(transformedData);
                    setFilteredData(transformedData);
                    setLastFetched(currentTime);
                    localStorage.setItem("lostItems", JSON.stringify(transformedData));
                } else {
                    const text = await response.text();
                    console.error('API 호출 오류: 응답이 JSON이 아닙니다.', text);
                }
            } catch (error) {
                console.error("API 호출 오류:", error);
            }
        } else {
            console.log('캐시된 데이터 사용');
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
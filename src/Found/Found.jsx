import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import styles from "../Style/lost.module.css";
import Foundlist from "./Foundlist";
import "../Style/font.css";

const Found = () => {
    const [data, setData] = useState([]);
    const [searchFields, setSearchFields] = useState({
        title: "",
        startDate: "",
        endDate: "",
        location: "",
    });
    const [filteredData, setFilteredData] = useState([]);
    const [isSearchComplete, setIsSearchComplete] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem("foundItems");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setData(parsedData);
            setFilteredData(parsedData);
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            const apiUrl = `https://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsInfoAccToClAreaPd?serviceKey=zSAXdQESWaDclJzqvuNXRlLDZxUTNzNDTwieZ0OykcY4%2FtrSgpXbbwjXCy0dUv9hDANnqKYH%2B%2BiUPEXnwLZpwg%3D%3D&START_YMD=20240101&END_YMD=20250103&pageNo=1&numOfRows=10000`;
    
            const response = await fetch(apiUrl, {
                headers: {
                    Accept: "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log("API 응답 데이터:", result); // API 응답 로그
            const items = result?.response?.body?.items?.item || [];
            console.log("분석된 데이터:", items); // 데이터 확인
    
            const formattedData = items.map((item) => ({
                atcId: item.atcId,
                lstPrdtNm: item.lstPrdtNm,
                lstSbjt: item.lstSbjt,
                lstYmd: item.lstYmd,
                lstPlace: item.lstPlace,
                prdtClNm: item.prdtClNm,
            }));

            const sortedData = formattedData.sort(
                (a, b) => new Date(b.lstYmd) - new Date(a.lstYmd)
            );

            setData(sortedData);
        setFilteredData(sortedData);
        localStorage.setItem("foundItems", JSON.stringify(sortedData));
        } catch (error) {
            console.error("데이터 호출 실패:", error);
            setError("데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.");
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
        const { title, startDate, endDate, location } = searchFields;

        const results = data.filter((item) => {
            const matchesTitle = title ? item.lstPrdtNm.includes(title) : true;
            const matchesLocation = location ? item.lstPlace.includes(location) : true;
            const matchesDate =
                (!startDate || new Date(item.lstYmd) >= new Date(startDate)) &&
                (!endDate || new Date(item.lstYmd) <= new Date(endDate));

            return matchesTitle && matchesLocation && matchesDate;
        });

        setFilteredData(results);
        setIsSearchComplete(true);
    };

    return (
        <div className={styles["container"]}>
            {error && (
                <Typography variant="body1" color="error" align="center">
                    {error}
                </Typography>
            )}
            <form className={styles["searchForm"]} onSubmit={handleSearch}>
                <div className={styles["formGroup"]}>
                    <label htmlFor="title">분실물명</label>
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
                    <label htmlFor="location">위치</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={searchFields.location}
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

            <Foundlist data={filteredData} />
        </div>
    );
};

export default Found;
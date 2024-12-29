import React, { useState } from "react";
import { Button } from "@mui/material";
import styles from "../Style/lost.module.css";
import data from "../Data/Item";
import Lostlist from "./Lostlist";
import "../Style/font.css";

const Lost = () => {
    const [searchFields, setSearchFields] = useState({
        title: "",
        startDate: "",
        endDate: "",
        location: "",
        region: "",
    });
    const [filteredData, setFilteredData] = useState(data);
    const [isSearchComplete, setIsSearchComplete] = useState(false);

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
            const matchesTitle = item.title.includes(title);
            const matchesLocation = item.map.includes(region);
            return matchesTitle && matchesLocation;
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
                    {filteredData.length}건의 검색 결과가 있습니다.
                </div>
            )}
            <Lostlist data={filteredData} />
        </div>
    );
};

export default Lost;
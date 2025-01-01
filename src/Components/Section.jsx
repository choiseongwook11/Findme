import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../Style/section.module.css';
import '../Style/font.css';
import rawData from '../Data/Item';
import Lostlist from '../Lost/Lostlist';

function Section() {
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const savedData = localStorage.getItem("lostItems");
        if (savedData) {
            setFilteredData(JSON.parse(savedData));
        } else {
            const data = Array.isArray(rawData) ? rawData : [];
            setFilteredData(data);
        }
    }, []);

    return (
        <div className={styles['section-container']}>
            <div className={styles['search-container']}>
                <div className={styles['input-wrapper']}>
                    <input
                        className={styles['search-input']}
                        placeholder="분실물 이름, 분실장소 등을 입력하여 주세요"
                        value={search}
                        // onChange={}
                    />
                    <SearchIcon className={styles['input-icon']} />
                </div>
            </div>
            <div className={styles['lost-title-box']}>
                <div className={styles['lost-container-title']}>
                    최근 등록 분실물
                </div>
            </div>
            <Lostlist data={filteredData} />
        </div>
    );
}

export default Section;
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../Style/section.module.css';
import '../Style/font.css';
import data from '../Data/Item';
import Lostlist from '../Lost/Lostlist';

function Section() {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        const lowerCaseSearch = e.target.value.toLowerCase();
        const filtered = data.filter(
            (item) =>
                item.title.toLowerCase().includes(lowerCaseSearch) ||
                item.map.toLowerCase().includes(lowerCaseSearch)
        );
        setFilteredData(filtered);
    };

    return (
        <div className={styles['section-container']}>
            <div className={styles['search-container']}>
                <div className={styles['input-wrapper']}>
                    <input
                        className={styles['search-input']}
                        placeholder="분실물 이름, 분실장소 등을 입력하여 주세요"
                        value={search}
                        onChange={handleSearch}
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
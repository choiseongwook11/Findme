import styles from '../Style/header.module.css';
import { useNavigate } from 'react-router-dom';
import '../Style/font.css';

function Header() {
    const navigate = useNavigate();
    return (
        <div className={styles['header-container']}>
            <div className={`${styles['header-title']} PaperlogyMedium`} onClick={() => navigate("/")}>찾아줘요</div>
            <div className={`${styles['nav-links']} PaperlogyMedium`}>
                <div className={styles['nav-link']} onClick={() => navigate("/Searchpage")}>검색하기</div>
                <div className={styles['nav-link']} onClick={() => navigate("/Mappage")}>지도</div>
            </div>
        </div>
    );
}

export default Header;
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import styles from '../Style/header.module.css';
import '../Style/font.css';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('로그아웃되었습니다.');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    return (
        <div className={styles['header-container']}>
            <div
                className={`${styles['header-title']} PaperlogyMedium`}
                onClick={() => navigate("/")}
            >
                찾아줘요
            </div>
            <div className={`${styles['nav-links']} PaperlogyMedium`}>
                <div
                    className={styles['nav-link']}
                    onClick={() => navigate("/Searchpage")}
                >
                    습득물 검색하기
                </div>
                <div
                    className={styles['nav-link']}
                    onClick={() => navigate("/Foundpage")}
                >
                    분실물 검색하기
                </div>
                <div
                    className={styles['nav-link']}
                    onClick={() => navigate("/Map")}
                >
                    지도
                </div>
                {isLoggedIn ? (
                    <div
                        className={styles['nav-link']}
                        onClick={handleLogout}
                    >
                        로그아웃
                    </div>
                ) : (
                    <div
                        className={styles['nav-link']}
                        onClick={() => navigate("/login")}
                    >
                        로그인
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import styles from '../Style/login.module.css';
import Header from './Header';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('로그인 성공!');
            navigate('/');
        } catch (error) {
            setError('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
        }
    };

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className={styles['login-container']}>
                {error && <p className={styles['error-message']}>{error}</p>}
                <input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles['login-input']}
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles['login-input']}
                />
                <div className={styles['button-container']}>
                    <button onClick={handleLogin} className={styles['login-button']}>
                        로그인
                    </button>
                    <button onClick={() => navigate('/signup')} className={styles['login-button']}>
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
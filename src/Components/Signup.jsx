import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import styles from '../Style/signup.module.css';
import Header from './Header';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (password.length < 6) {
            setError('비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }
    
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
    
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('회원가입 성공!');
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
        <div>
            <Header />
        </div>
        <div className={styles['signup-container']}>
            <div className={styles['signup-form']}>
                {error && <p className={styles['error-message']}>{error}</p>}
                <input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles['signup-input']}
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles['signup-input']}
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles['signup-input']}
                />
                <button onClick={handleSignup} className={styles['signup-button']}>
                    회원가입
                </button>
            </div>
        </div>
        </div>
    );
}

export default Signup;
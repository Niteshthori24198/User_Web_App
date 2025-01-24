import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/user.service';
import styles from '../styles/AuthPages/Login.module.css';

const BaseUrl = `${import.meta.env.VITE_APP_SERVER_URL}`;


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };
        const [success, error] = await loginUser(user);
        if (success) {
            navigate('/');
        } else {
            setError(error);
        }
    };

    const handleGoogleAuth = () => {
        document.getElementById('googleauth-btn').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Continue With Google`;
        window.location.href = `${BaseUrl}/api/user/auth/google`;
    };

    return (
        <div className={styles.login}>
            <h2>Login Here</h2>
            {error && <p className={styles.error} style={{ color: 'red', fontSize: '16px' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#007bff', marginTop: '10px', fontSize: '14px', float: 'right' }}>Forgot Password</Link>
            <button onClick={handleGoogleAuth} id="googleauth-btn">
                Continue with Google
            </button>
        </div>
    );
};

export default LoginPage;

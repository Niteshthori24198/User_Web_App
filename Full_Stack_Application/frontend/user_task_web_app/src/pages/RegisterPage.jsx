import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMyReducer from '../hooks/useMyReducer';
import { initialRegisterUserState, registerFormReducer } from "../utils/reducers";
import { registerUser } from '../services/user.service';
import styles from '../styles/AuthPages/Register.module.css';

const RegisterPage = () => {
    const [state, dispatch] = useMyReducer(registerFormReducer, initialRegisterUserState);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const [success, msg, error] = await registerUser(state);
        if (success) {
            alert(msg);
            navigate("/login");
        } else {
            setError(error);
        }
    };

    return (
        <div className={styles.register}>
            <h2>Register here</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={state.name} onChange={(e) => dispatch({ type: "name", payload: e.target.value })} required />
                <input type="email" placeholder="Email" value={state.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value })} required />
                <input type="password" placeholder="Password" value={state.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value })} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;

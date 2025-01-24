import React, { useState } from "react";
import styles from "../styles/AuthPages/ForgotPassword.module.css"
import { forgotUserPassword } from "../services/user.service";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const [success, msg] = await forgotUserPassword(email);
        if (success) {
            setMessage(msg);
        } else {
            setMessage(msg);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles["form-wrapper"]}>
                <h1>Forgot Password</h1>
                <form onSubmit={handleForgotPassword}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
};


export default ForgotPassword;

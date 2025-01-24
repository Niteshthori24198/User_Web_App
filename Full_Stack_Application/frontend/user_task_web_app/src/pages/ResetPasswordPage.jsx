import React, { useState } from "react";
import styles from "../styles/AuthPages/ResetPassword.module.css"
import { resetUserPassword } from "../services/user.service";

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    let params = new URLSearchParams(window.location.search);
    let token = params.get("token");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password and Confirm password do not match");
            return;
        }

        const [success, msg] = await resetUserPassword(token, password);
        if (success) {
            setMessage(msg);
        } else {
            setMessage(msg);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles["form-wrapper"]}>
                <h1>Reset Password</h1>
                <form onSubmit={handleResetPassword}>
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Reset Password</button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;

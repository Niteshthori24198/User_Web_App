import React from 'react';
import styles from "../styles/HomePage/Home.module.css";

const HomePage = () => {
    return (
        <div className={styles.home}>
            <h1>Welcome to Task Manager Web App</h1>
            <img src="https://monday.com/blog/wp-content/uploads/2020/12/Your-complete-guide-to-project-management-2.jpg" alt="Welcome" />
        </div>
    );
};

export default HomePage;

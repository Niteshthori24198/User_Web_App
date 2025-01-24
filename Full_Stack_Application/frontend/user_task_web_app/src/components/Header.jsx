import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, storeData } from "../utils/handlestorage";
import styles from "../styles/Header/Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getData("userInfo"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getData("userInfo"));
    };

    window.addEventListener("storage", handleStorageChange);

    let params = new URLSearchParams(window.location.search);
    let token = params.get("token");
    let name = params.get("name");

    if (token && name) {
      const userInfo = { token, name };
      storeData("userInfo", userInfo);
      setUser(userInfo);

      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/feed">Feed</Link>
              </li>
              <li>Hello, {user.name}</li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

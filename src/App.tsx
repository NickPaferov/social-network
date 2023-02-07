import React from "react";
import "./App.css";
import { Profile } from "./components/Profile/Profile";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.profile}>
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default App;

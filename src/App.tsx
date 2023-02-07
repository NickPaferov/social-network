import React from "react";
import "./App.css";
import { Content } from "./Content";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;

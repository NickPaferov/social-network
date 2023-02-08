import React from "react";
import "./App.css";
import { Profile } from "./components/Profile/Profile";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import styles from "./App.module.css";
import { Dialogs } from "./components/Dialogs/Dialogs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { News } from "./components/News/News";
import { Music } from "./components/Music/Music";
import { Settings } from "./components/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.layout}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.body}>
          <div className={styles.navbar}>
            <Navbar />
          </div>
          <div className={styles.content}>
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/dialogs/" element={<Dialogs />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

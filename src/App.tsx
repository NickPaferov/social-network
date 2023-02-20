import React, { useEffect } from "react";
import "./App.css";
import { Profile } from "./components/Profile/Profile";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import styles from "./App.module.css";
import { Dialogs } from "./components/Dialogs/Dialogs";
import { Navigate, Route, Routes } from "react-router-dom";
import { News } from "./components/News/News";
import { Music } from "./components/Music/Music";
import { Settings } from "./components/Settings/Settings";
import { Users } from "./components/Users/Users";
import { useAppDispatch, useAppSelector } from "./bll/store";
import { Login } from "./components/Login/Login";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { Preloader } from "./components/common/Preloader/Preloader";
import { initializeAppTC } from "./bll/app-reducer";

function App() {
  const dispatch = useAppDispatch();

  const isAppInitialized = useAppSelector((state) => state.app.isInitialized);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!isAppInitialized) {
    return (
      <div className={`${styles.layout} ${styles.initialization}`}>
        <Preloader />
      </div>
    );
  }

  return (
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
            <Route element={<ProtectedRoutes userIsAuth={true} redirectTo="/login" />}>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/social-network" element={<Navigate to="/profile" />} />
              <Route path="/profile/:userId?" element={<Profile />} />
              <Route path="/dialogs/*" element={<Dialogs />} />
            </Route>
            <Route element={<ProtectedRoutes userIsAuth={false} redirectTo="/profile" />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/users" element={<Users />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
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
import { Users } from "./components/Users/Users";
import { useAppDispatch } from "./bll/store";
import { authAPI } from "./api/auth-api";
import { setAuthedUserProfileAC, setAuthUserDataAC } from "./bll/auth-reducer";
import { setIsRequestProcessingStatusAC } from "./bll/app-reducer";
import { profileAPI } from "./api/profile-api";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsRequestProcessingStatusAC(true));
    authAPI.authMe().then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(response.data.data));
        profileAPI.getUserProfile(response.data.data.id).then((response) => {
          dispatch(setAuthedUserProfileAC(response.data));
          dispatch(setIsRequestProcessingStatusAC(false));
        });
      }
    });
  }, [dispatch]);

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
              <Route path="/profile/:userId?" element={<Profile />} />
              <Route path="/users" element={<Users />} />
              <Route path="/dialogs/*" element={<Dialogs />} />
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

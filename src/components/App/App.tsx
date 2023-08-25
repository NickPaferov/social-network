import React, { useEffect } from "react";
import { Profile } from "../Profile/Profile";
import { Header } from "../Header/Header";
import { Navbar } from "../Navbar/Navbar";
import styles from "./App.module.css";
import { Dialogs } from "../Dialogs/Dialogs";
import { Navigate, Route, Routes } from "react-router-dom";
import { Users } from "../Users/Users";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { Login } from "../Login/Login";
import { ProtectedRoutes } from "../../utils/ProtectedRoutes";
import { Preloader } from "../common/Preloader/Preloader";
import { initializeAppTC } from "../../bll/app-reducer";
import { selectAppInitStatus } from "../../utils/selectors";

function App() {
  const dispatch = useAppDispatch();

  const isAppInitialized = useAppSelector(selectAppInitStatus);

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
            <Route
              element={
                <ProtectedRoutes userIsAuth={true} redirectTo="/login" />
              }
            >
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route
                path="/social-network"
                element={<Navigate to="/profile" />}
              />
              <Route path="/profile/:userId?" element={<Profile />} />
              <Route path="/dialogs/*" element={<Dialogs />} />
            </Route>
            <Route
              element={
                <ProtectedRoutes userIsAuth={false} redirectTo="/profile" />
              }
            >
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

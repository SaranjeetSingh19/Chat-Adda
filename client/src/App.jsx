import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
// To make our app optimized we used "LAZY" from react

const user = false;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          {" "}
          {/* This normal route will protect all routes that will get wrapped inside it */}
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
        </Route>

        <Route
          path="/login"
          element={
            <ProtectedRoute user={!user} redirect="/">
              <Login />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

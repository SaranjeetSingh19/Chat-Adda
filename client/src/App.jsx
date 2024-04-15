import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Loader from "./components/layout/Loader";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userNotExits } from "./redux/reducers/auth";
import {Toaster} from "react-hot-toast"

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
// To make our app optimized we used "LAZY" from react

const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));

const ChatManagement = lazy(() => import("./pages/Admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/Admin/MessageManagement"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));

// const user = true;

const App = () => {
  const {user, loader} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(server);
    axios
      .get(`${server}/api/v1/user/me`)
      .then((res) => console.log(res))
      .catch((err) => dispatch(userNotExits()));
  }, [dispatch]);

  return loader ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
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

          <Route path="/adminPanel2590" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;

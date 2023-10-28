import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import DetailMovie from "./pages/DetailMovie/DetailMovie";
import Home from "./pages/Home/Home";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout/Checkout";
import Spinner from "./components/Spinner/Spinner";
import PrivateRoute from "./templates/PrivateRoute/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <HomeTemplate>
                  <Home />
                </HomeTemplate>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <HomeTemplate>
                  <DetailMovie />
                </HomeTemplate>
              }
            />
            <Route
              path="/login"
              element={
                <PrivateRoute>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PrivateRoute>
                  <Register />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout/:id"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            ></Route>
            {/* If none of the above routes match, redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;

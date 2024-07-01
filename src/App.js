import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

// Import your components
import BlogPosts from "./pages/posts";
import LoginForm from "./components/auth/auth";
import SearchedBlogs from "./pages/SearchedBlogs";

// Import user data
import { users } from "./data/user/data";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Function to authenticate user
  const authenticateUser = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    return user ? true : false;
  };

  // Function to handle form submission
  const onSubmit = (data) => {
    if (authenticateUser(data.email, data.password)) {
      setIsLoggedIn(true);
      console.log("correct");
    } else {
      setLoginError("Incorrect email or password");
      setIsLoggedIn(false);
    }
  };

  return (
    <>
      <div className="App">
        <Routes>
          {!isLoggedIn && (
            <Route
              path="/"
              element={
                <LoginForm onSubmit={onSubmit} errorMessage={loginError} />
              }
            />
          )}
          <Route path="/" element={<BlogPosts />} />
          <Route path="/searchedBlogs" element={<SearchedBlogs />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

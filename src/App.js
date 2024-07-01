import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Correct import statement

// Import your components
import BlogPosts from "./pages/posts";
import LoginForm from "./components/auth/auth"; // Assuming this is your login form component
import SearchedBlogs from "./pages/SearchedBlogs";

// Assuming your user data
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
    } else {
      setLoginError("Incorrect email or password");
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="App">
      {/* Routes */}
      <Routes>
        {!isLoggedIn && (
          <Route
            path="/"
            element={
              <LoginForm onSubmit={onSubmit} errorMessage={loginError} />
            }
          />
        )}
        {isLoggedIn && <Route path="/" element={<BlogPosts />} />}
        <Route path="/searchedBlogs" element={<SearchedBlogs />} />
      </Routes>
    </div>
  );
}

export default App;
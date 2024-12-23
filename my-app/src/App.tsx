import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router
import Navbar from "./components/Navbar";
import Posts from "./components/Posts"; // Import Posts component

const App: React.FC = () => {
  return (
    <Router> {/* Wrap your routes inside Router */}
      <Navbar />
      <Routes> {/* Define your Routes inside Routes */}
        <Route path="/posts" element={<Posts />} /> {/* Posts route */}
        <Route path="/" element={<Posts />} /> {/* Default route to Posts */}
      </Routes>
    </Router>
  );
};

export default App;

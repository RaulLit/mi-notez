import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTS AND PAGES
import Auth from "./pages/auth";
import Navbar from "./components/nav";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

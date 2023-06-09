import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Create } from "./pages/Create";
import { Account } from "./pages/Account";
import { Layout } from "./components/Layout";
import { ThemeProvider, createTheme } from "@mui/material";
import { createContext } from "react";
import { useToggle } from "./hooks/useToggle";
import { auth } from "./config/firebase";

const theme = createTheme({
  typography: {
    fontFamily: "Comfortaa",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export const isOpenContext = createContext();

function App() {
  const [open, toggleOpen] = useToggle(auth.currentUser ? true : false);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <isOpenContext.Provider value={{ open, toggleOpen }}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/create" element={<Create />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </Layout>
          </isOpenContext.Provider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;

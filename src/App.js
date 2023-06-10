import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Create } from "./pages/Create";
import { Account } from "./pages/Account";
import { Layout } from "./components/Layout";
import { ThemeProvider, createTheme } from "@mui/material";
import { useToggle } from "./hooks/useToggle";
import { auth } from "./config/firebase";
import { PrivateRoute } from "./PrivateRoute";
import { AuthContext } from "./contexts/AuthContext";
import { OpenStateContext } from "./contexts/OpenStateContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  typography: {
    fontFamily: "Comfortaa",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  const [open, toggleOpen] = useToggle(user ? true : false);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ user }}>
          <Router>
            <OpenStateContext.Provider value={{ open, toggleOpen }}>
              <Layout>
                <Routes>
                  <Route
                    path="/"
                    exact
                    element={
                      <PrivateRoute>
                        <QueryClientProvider client={client}>
                          <Home />
                        </QueryClientProvider>
                      </PrivateRoute>
                    }
                  />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/account" element={<Account />} />
                </Routes>
              </Layout>
            </OpenStateContext.Provider>
          </Router>
        </AuthContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;

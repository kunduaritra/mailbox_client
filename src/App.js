import { useSelector } from "react-redux";
import Authentication from "./components/Pages/Authentication";
import Welcome from "./components/Pages/Welcome";
import RootLayout from "./components/layout/RootLayout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Viewmail from "./components/Pages/Viewmail";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route
            path="/"
            element={
              <>
                {!isAuthenticated && <Authentication />}
                {isAuthenticated && <Navigate to="welcomemailboxclient" />}
              </>
            }
          />
          <Route
            path="/welcomemailboxclient"
            element={
              <>
                {isAuthenticated && <Welcome />}
                {!isAuthenticated && <Navigate to="/" />}
              </>
            }
          />
          <Route
            path="welcomemailboxclient/:id/:subject/:content"
            element={<Viewmail />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import Authentication from "./components/Pages/Authentication";
import RootLayout from "./components/layout/RootLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Authentication />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

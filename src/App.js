import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/Login/PrivateRoute";
import Login from "./components/Login/Login";
import System from "./components/System/System";
import AddNewSpecies from "./components/System/RareSpecies/AddNewSpecies";
import EditSpecies from "./components/System/RareSpecies/EditSpecies";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="" element={<PrivateRoute />}>
              <Route exact path="/" element={<System />} />
              <Route path="/them-moi" element={<AddNewSpecies />} />
              <Route path="/cap-nhat" element={<EditSpecies />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

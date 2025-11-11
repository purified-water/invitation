import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminScreen, InvitationScreen } from "./screens";
import "./App.css";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          color: "#213547",
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/invitation/:id" element={<InvitationScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

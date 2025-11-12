import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AdminScreen,
  InvitationScreen,
  CreateInvitationScreen,
  EditInvitationScreen,
  HomeScreen,
} from "./screens";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundColor: "#f9fafb",
          minHeight: "100vh",
          color: "#374151",
        }}
      >
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/admin/create" element={<CreateInvitationScreen />} />
          <Route path="/admin/edit/:id" element={<EditInvitationScreen />} />
          <Route path="/invitation/:id" element={<InvitationScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

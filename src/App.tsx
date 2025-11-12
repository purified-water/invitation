import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  AdminScreen,
  InvitationScreen,
  CreateInvitationScreen,
  EditInvitationScreen,
  HomeScreen,
} from "./screens";
import { AdminProtection } from "./components/AdminProtection";

// Component to conditionally wrap admin routes with protection
const ConditionalAdminProtection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <AdminProtection>{children}</AdminProtection>;
  }

  return <>{children}</>;
};

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
        <ConditionalAdminProtection>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/admin" element={<AdminScreen />} />
            <Route path="/admin/create" element={<CreateInvitationScreen />} />
            <Route path="/admin/edit/:id" element={<EditInvitationScreen />} />
            <Route path="/invitation/:id" element={<InvitationScreen />} />
          </Routes>
        </ConditionalAdminProtection>
      </div>
    </Router>
  );
}

export default App;

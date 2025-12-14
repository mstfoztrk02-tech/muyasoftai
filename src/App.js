import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import CRMLayout from "./pages/crm/CRMLayout";
import Dashboard from "./pages/crm/Dashboard";
import Trunks from "./pages/crm/Trunks";
import Calls from "./pages/crm/Calls";
import Campaigns from "./pages/crm/Campaigns";
import Spam from "./pages/crm/Spam";
import Credits from "./pages/crm/Credits";
import ApiKeys from "./pages/crm/ApiKeys";
import Settings from "./pages/crm/Settings";
import { Toaster } from "./components/ui/sonner";
import AccessCodeGate from "./components/AccessCodeGate";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Main Website */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                  <Toaster />
                </>
              }
            />

            {/* CRM Panel - Access Code Gate */}
            <Route
              path="/crm"
              element={
                <AccessCodeGate>
                  <CRMLayout />
                </AccessCodeGate>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="trunks" element={<Trunks />} />
              <Route path="calls" element={<Calls />} />
              <Route path="campaigns" element={<Campaigns />} />
              <Route path="spam" element={<Spam />} />
              <Route path="credits" element={<Credits />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

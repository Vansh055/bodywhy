import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeartDepartmentScreen from "./screens/HeartDepartmentScreen";
import { AuthProvider } from "./auth/AuthContext";
import AnatomyOnboardingScreen from "./screens/AnatomyOnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BodyHomeScreen from "./screens/BodyHomeScreen";
import { NodeScreen } from "./screens/NodeScreen";
import { MechanismPlayer } from "./screens/MechanismPlayer";
import "./anatomy/modelMappings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/today" element={<BodyHomeScreen />} />
          <Route path="/heart" element={<HeartDepartmentScreen />} />
          <Route path="/node/:id" element={<NodeScreen />} />
          <Route path="/mechanism/:id" element={<MechanismPlayer />} />
          <Route path="/onboarding/anatomy" element={<AnatomyOnboardingScreen />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

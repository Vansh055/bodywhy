import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BodyHomeScreen from "./screens/BodyHomeScreen";
import { NodeScreen } from "./screens/NodeScreen";
import { MechanismPlayer } from "./screens/MechanismPlayer";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/today" element={<BodyHomeScreen />} />
          <Route path="/node/:id" element={<NodeScreen />} />
          <Route path="/mechanism/:id" element={<MechanismPlayer />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

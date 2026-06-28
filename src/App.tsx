import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Next up: <Route path="/login" element={<Login />} /> from src/auth */}
          {/* Next up: <Route path="/signup" element={<Signup />} /> from src/auth */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

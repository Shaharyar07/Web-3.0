import { Navbar, Home, Transactions, Services, Footer } from "./components";
import { Routes, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>

      <Services />
      <Footer />
    </div>
  );
};

export default App;

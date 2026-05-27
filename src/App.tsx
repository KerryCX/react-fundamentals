import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HooksDemo from "./pages/HooksDemo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hooks' element={<HooksDemo />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

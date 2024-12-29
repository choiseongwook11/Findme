import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from './Pages/Mainpage.jsx'
import Searchpage from './Pages/Searchpage.jsx'
import Mappage from './Pages/Mappage.jsx'
import Lost from './Lost/Lost.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/Searchpage" element={<Searchpage />} />
        <Route path="/search" element={<Lost />} />
        <Route path="/Mappage" element={<Mappage />} />
      </Routes>
    </Router>
  );
}

export default App;
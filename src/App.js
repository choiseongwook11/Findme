import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from './Pages/Mainpage.jsx'
import Searchpage from './Pages/Searchpage.jsx'
import LoginPage from './Components/Login.jsx';
import SignupPage from './Components/Signup';
import Mappage from './Pages/Mappage.jsx'
import Foundpage from './Pages/Foundpage.jsx'
import Found from "./Found/Found.jsx";
import Lost from './Lost/Lost.jsx';
import Map from "./Pages/Map.jsx";
import FoundItem from "./Found/FoundItem.jsx";
import Detail from "./Components/Detail.jsx";
import Founddetail from "./Components/Founddetail.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/Searchpage" element={<Searchpage />} />
        <Route path="/Found" element={<Found />} />
        <Route path="/Postfound" element={<FoundItem />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/founddetail/:atcId" element={<Founddetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/foundpage" element={<Foundpage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<Lost />} />
        <Route path="/Mappage" element={<Mappage />} />
        <Route path="/Map" element={<Map />} />
        
      </Routes>
    </Router>
  );
}

export default App; 
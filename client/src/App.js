import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/home';
import Auth from './pages/auth';
import Create from './pages/create';
import Saved from './pages/saved';
import {Navbar} from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<Create />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CookiePage } from './pages/Cookie';
import { Link } from 'react-router-dom';
import { EditUsers } from './pages/EditUsers';

function Hello() {
  return (
    <div>
      <Link to="/cookie">Click me to start</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/cookie" element={<CookiePage />} />
        <Route path="/edit-users" element={<EditUsers />} />
      </Routes>
    </Router>
  );
}

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🎯 Event Management</h2>

      <div>
        <Link to="/">📊 Dashboard</Link>
        <Link to="/events">📅 Events</Link>
        <Link to="/participants">👥 Participants</Link>
      </div>
    </nav>
  );
}

export default Navbar;

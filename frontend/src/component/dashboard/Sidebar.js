import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS
const Sidebar = () => {
  return (
    <div className="sidebar bg-dark">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active text-light" href="#">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Profile</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
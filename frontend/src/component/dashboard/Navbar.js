import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>Dashboard</h1>
      <div className='navbar-links'>
        <a href='/'>Home</a>
        <a href='/'>About</a>
        <a href='/'>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
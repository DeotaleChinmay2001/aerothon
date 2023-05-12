import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap'; 

const Logout = () => {

  useEffect(() => {
    localStorage.clear();
  });

  return (
    <>
      {!localStorage.getItem('token') ? (<Redirect to="/login"></Redirect>) : (
        <Redirect to="/login"></Redirect>
      )}
    </>
  );
};

export default Logout;
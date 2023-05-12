import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

const LoginCheck = (props) => {
  const Cmp = props.cmp;

  return <>{localStorage.getItem('token') ?  <Cmp /> : <Redirect to="/login"></Redirect>}</>;
};

export default LoginCheck;

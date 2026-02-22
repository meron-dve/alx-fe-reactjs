const Login = () => {
  localStorage.setItem("isAuthenticated", "true");

  return <h2>You are now logged in (simulated)</h2>;
};

export default Login;
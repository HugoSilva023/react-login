import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import axios from "axios";
import "./loginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setUser, error, setError} = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setUser(response.data);
      return navigate("/home");

    } catch (error) {
      if (!error?.response) {
        return setError("Erro ao acessar o servidor");

      } else if (error.response.status == 401) {
        return setError("Usuário ou senha inválidos");

      }
    }
  };

  return (
    <div className="login-form-wrap">
      <h2>Login</h2>
      <form className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn-login"
          onClick={(e) => handleLogin(e)}
        >
          Login
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default LoginForm;

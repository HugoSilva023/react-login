import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useValidation } from "../../hook/useValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataContext } from "../../context/DataContext";
import axios from "axios";


const LoginForm = () => {
  const schema = useValidation();
  const { register, handleSubmit, formState: {errors} } = useForm({resolver: yupResolver(schema)});


  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const { setUser, error, setError } = useContext(DataContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        JSON.stringify({ name, email, password, confirmPassword }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setUser(response.data);
      return navigate("/home");
    } catch (error) {
      console.log("erro:" + error.response);
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
          {...register("email", {required: true})}
          placeholder="Digite um email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.name && <p> The email field is mandatory </p>}
        <input
          type="name"
          name="name"
          {...register("name", {required: true})}
          placeholder="Digite seu nome"
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p> The name field is mandatory </p>}
        <input
          type="password"
          name="password"
          {...register("password", {required: true})}
          placeholder="Digite uma senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.name && <p> The password field is mandatory </p>}
        <input
          type="password"
          name="confirmPassword"
          {... register("confirmPassword", {required: true})}
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.name && <p> The confirm password field is mandatory </p>}
        <button
          type="submit"
          className="btn-login"
          onClick={(e) => handleSubmit(handleRegister(e))}
        >
          Create user
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default LoginForm;

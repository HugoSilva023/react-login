import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser, setError } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    setUser(null);
    setError("");
    return navigate("/");
  };

  return (
    <div className="wrap-home">
      <div className="reception">Olá, {user} </div>
      <button
        type="button"
        className="btn-logout"
        onClick={(e) => handleLogout(e)}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;

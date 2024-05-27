const express = require("express");

const routes = express.Router();
const users = [
  {
    id: 1,
    name: "Master Acess",
    email: "test@email.com",
    password: "123456",
  },
];

routes.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return res.status(200).json(user.name);
  } else {
    return res.status(401).json({ message: "Credenciais Inválidas" });
  }
});

routes.post("/register", (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  const user = users.push({
      id: users.length + 1,
      name: name,
      email: email,
      password: password,
  })
  


  if (user) {
    return res.status(200).json(user.name);
  } else {
    return res.status(401).json({ message: "Credenciais Inválidas" });
  }
});

console.log(users)

module.exports = routes;

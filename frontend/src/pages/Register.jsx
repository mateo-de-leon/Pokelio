import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); 

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setFadeOut(true);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    Agregar error label
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName, password }),
      });

      if (!res.ok) throw new Error("Error al registrar");

      const data = await res.json();
      localStorage.setItem('token', data.token)
      
      handleNavigate("/dashboard")
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className={`register-form ${fadeIn ? "fade-in" : ""} ${fadeOut ? "fade-out" : ""}`} onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Crear cuenta</button>
        <p
          className="go-to-register"
          onClick={() => handleNavigate("/auth/login")}
        >
          ¿Ya tienes una cuenta?
        </p>
      </form>
    </div>
  );
}

export default Register;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // Estado para el mensaje de error
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
    setErrorMsg(""); // Limpiar errores previos

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (data.invalidPasswordOrUser) {
        setErrorMsg("Usuario y contraseña incorrecta");
        return;
      }

      if (!res.ok) {
        setErrorMsg("Ocurrió un error. Inténtalo nuevamente");
        return;
      }

      if (rememberMe) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      navigate("/dashboard");
    } catch (error) {
      setErrorMsg("Ocurrió un error. Inténtalo nuevamente");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form
        className={`login-form ${fadeIn ? "fade-in" : ""} ${fadeOut ? "fade-out" : ""}`}
        onSubmit={handleSubmit}
      >
        <h2>Iniciar Sesión</h2>

        {errorMsg && <label className="error-label">{errorMsg}</label>}

        <input
          type="email"
          placeholder="Email"
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
        <button type="submit">Ingresar</button>

        <div className="register-remember-container">
          <p className="go-to-register" onClick={() => handleNavigate("/auth/register")}>
            ¿No tenés cuenta?
          </p>

          <label className="remember-me-lbl">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="remember-me-input"
            />
            Recuérdame
          </label>
        </div>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ setUserdata }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Prisijungimas sėkmingas! Peradresuojama...");
        setErrorMessage("");

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          navigate("/adminusers");
        }, 1000);
      } else {
        setErrorMessage(data.message || "Neteisingi prisijungimo duomenys");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Klaida prisijungiant. Bandykite dar kartą.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="page-section" id="login">
      <div className="container">
        <h2 className="page-section-heading text-center text-uppercase text-primary mb-0">
          Prisijungti
        </h2>
        <div className="divider-custom">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-icon">
            <i className="fas fa-key"></i>
          </div>
          <div className="divider-custom-line"></div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <div className="card shadow">
              <div className="card-body">
                {errorMessage && (
                  <div className="alert alert-danger text-center" role="alert">
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div className="alert alert-success text-center" role="alert">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Vartotojo vardas"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="username">Vartotojo vardas</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Slaptažodis"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password">Slaptažodis</label>
                  </div>

                  <button
                    className="btn btn-primary btn-xl w-100"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Jungiamasi..." : "Prisijungti"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = {
  setUserdata: PropTypes.func.isRequired,
};

export default Login;

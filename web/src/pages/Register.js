import React, { useState } from "react";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        roles_id: "1", // Default role ID
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        // Check if all fields are filled
        if (!formData.username || !formData.email || !formData.password) {
            setErrorMessage("Visi laukai privalomi");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage("Registracija sėkminga!");
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    roles_id: "1",
                });
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "Registracija nepavyko");
            }
        } catch (error) {
            setErrorMessage("Įvyko klaida. Bandykite dar kartą.");
        }
    };

    return (
        <section className="page-section" id="register">
            <div className="container">
                <h2 className="page-section-heading text-center text-uppercase text-primary mb-0">
                    Registruotis
                </h2>
                <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon">
                        <i className="fas fa-star"></i>
                    </div>
                    <div className="divider-custom-line"></div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username..."
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="username">Vartotojo vardas</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email..."
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">El. paštas</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password..."
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="password">Slaptažodis</label>
                            </div>

                            {errorMessage && (
                                <div className="text-center text-danger mb-3">
                                    {errorMessage}
                                </div>
                            )}
                            {successMessage && (
                                <div className="text-center text-success mb-3">
                                    {successMessage}
                                </div>
                            )}

                            <button
                                className="btn btn-primary btn-xl"
                                id="submitButton"
                                type="submit"
                            >
                                Registruotis
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationForm;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (data.message == "Login Successfully") {

                alert(data.message);

                localStorage.setItem("userName", data.name);
                localStorage.setItem("userId", data.userid);

                navigate("/dashboard");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);
            alert("Something went wrong!");

        }
    };

    return (
        <div className="login-page">

            <div className="container">

                <div className="finance-text">

                    <h1>PERSONAL FINANCE</h1>

                    <h2>EXPENSE INTELLIGENCE</h2>

                    <p>Take control of your finances</p>

                </div>


                <div className="form-box">

                    <h1>Welcome Back</h1>

                    <p className="subtitle">
                        Login to your account
                    </p>


                    <form id="loginForm" onSubmit={handleLogin}>

                        <div className="input-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>


                        <div className="input-group">

                            <label htmlFor="password">
                                Password
                            </label>


                            <div className="password-box">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>


                        <div className="options">

                            <label>

                                <input type="checkbox" />

                                Remember me

                            </label>


                            <a href="#">
                                Forgot Password?
                            </a>

                        </div>


                        <button type="submit" className="btn">
                            Login
                        </button>

                    </form>


                    <p className="account-text">

                        Don't have an account?

                        <Link to="/signup">
                            Create Account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;
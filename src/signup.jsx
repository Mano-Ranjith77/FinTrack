import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async (event) => {

        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {

            const response = await fetch("http://localhost:8081/register", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.text();

            alert(data);
            console.log(data)

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

                <h1>Create Account</h1>

                <p className="subtitle">
                    Join us and get started
                </p>


                <form id="signupForm" onSubmit={handleSignup}>

                    <div className="input-group">

                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                    </div>


                    <div className="input-group">

                        <label htmlFor="signupEmail">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="signupEmail"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>


                    <div className="input-group">

                        <label htmlFor="signupPassword">
                            Password
                        </label>

                        <input
                            type="password"
                            id="signupPassword"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>


                    <div className="input-group">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                    </div>


                    <label className="terms">

                        <input
                            type="checkbox"
                            required
                        />

                        I agree to the Terms & Conditions

                    </label>


                    <button type="submit" className="btn">
                        Create Account
                    </button>

                </form>


                <p className="account-text">

                    Already have an account?

                    <Link to="/login">
    Login
</Link>

                </p>

            </div>

        </div>
        </div>
    );
}

export default Signup;
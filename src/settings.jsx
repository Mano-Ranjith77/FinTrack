import "./settings.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Settings() {

    const navigate = useNavigate();

    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    const [newName, setNewName] = useState(userName || "");
    const [newEmail , setNewEmail] = useState("");
    const [currentPassword , setCurrentPassword] = useState("");
    const [newPassword , setNewPassword] = useState("");
    const handleLogout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        navigate("/");
    };
    const handleSave = async () => {

    if (
        newName.trim() === "" &&
        newEmail.trim() === ""
    ) {
        alert("Enter a name or email");
        return;
    }

    try {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/update-profile/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newName,
                    email: newEmail
                })
            }
        );

        const data = await response.text();

        alert(data);

        if (response.ok) {

            if (newName.trim() !== "") {
                localStorage.setItem("userName", newName);
            }

            setNewName("");
            setNewEmail("");
        }

    } catch (error) {

        console.error("Profile update error:", error);
        alert("Something went wrong");

    }
};
    const handlePasswordUpdate = async () => {

    if (currentPassword.trim() === "" || newPassword.trim() === "") {
        alert("Please fill both password fields");
        return;
    }

    try {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/update-password/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword
                })
            }
        );

        const data = await response.text();

        alert(data);

        if (response.ok && data === "Password Updated Successfully") {
            setCurrentPassword("");
            setNewPassword("");
        }

    } catch (error) {

        console.error("Password update error:", error);
        alert("Something went wrong");

    }
};

    if (!userName) {
        navigate("/");
        return null;
    }

    return (
        <>
            {/* SIDEBAR */}

            <aside className="sidebar">

                <div className="logo">
                    <h2>FinTrack</h2>
                </div>

                <nav>

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/income">
                        Income
                    </Link>

                    <Link to="/expenses">
                        Expenses
                    </Link>

                    <Link to="/analytics">
                        Analytics
                    </Link>

                    <Link to="/settings" className="active">
                        Settings
                    </Link>

                </nav>

            </aside>


            <main className="main-content">

                <header className="topbar">

                    <div>

                        <h1>Settings</h1>

                        <p>
                            Manage your account and preferences.
                        </p>

                    </div>

                    <div className="profile">

                        <div className="profile-circle">
                            {userName
                                ? userName.charAt(0).toUpperCase()
                                : "U"}
                        </div>

                        <span>{userName || "User"}</span>

                    </div>

                </header>


                <section className="settings-panel">

                    <div className="panel-title">

                        <h2>Profile Information</h2>

                        <p>
                            Update your personal information.
                        </p>

                    </div>


                    <div className="profile-section">

                        <div className="large-profile">
                            {userName
                                ? userName.charAt(0).toUpperCase()
                                : "M"}
                        </div>

                        <div>

                            <h3>{userName}</h3>

                            <p>
                                Manage your FinTrack account.
                            </p>

                        </div>

                    </div>


                    <div className="form-grid">

                        <div className="form-group">

                            <label htmlFor="name">
                                Full Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={newEmail}
                                onChange={(e)=> setNewEmail(e.target.value)}
                            />

                        </div>

                    </div>


                    <button
                        className="save-btn"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>

                </section>


                <section className="settings-panel">

                    <div className="panel-title">

                        <h2>Security</h2>

                        <p>
                            Keep your account secure.
                        </p>

                    </div>


                    <div className="form-grid">

                        <div className="form-group">

                            <label htmlFor="currentPassword">
                                Current Password
                            </label>

                            <input
                                type="password"
                                id="currentPassword"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e)=> setCurrentPassword(e.target.value)}
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="newPassword">
                                New Password
                            </label>

                            <input
                                type="password"
                                id="newPassword"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e)=>setNewPassword(e.target.value)}
                            />

                        </div>

                    </div>


                    <button className="save-btn" onClick={handlePasswordUpdate}>
                        Update Password
                    </button>

                </section>


                {/* PREFERENCES */}

                <section className="settings-panel">

                    <div className="panel-title">

                        <h2>Preferences</h2>

                        <p>
                            Customize your FinTrack experience.
                        </p>

                    </div>


                    <div className="preference-item">

                        <div>

                            <h3>Currency</h3>

                            <p>
                                Select your preferred currency.
                            </p>

                        </div>

                        <select>

                            <option>₹ INR</option>
                            <option>$ USD</option>
                            <option>€ EUR</option>

                        </select>

                    </div>


                    <div className="preference-item">

                        <div>

                            <h3>Notifications</h3>

                            <p>
                                Receive updates about your finances.
                            </p>

                        </div>

                        <label className="switch">

                            <input type="checkbox" />

                            <span className="slider"></span>

                        </label>

                    </div>

                </section>


                {/* DANGER ZONE */}

                <section className="settings-panel danger-panel">

                    <div>

                        <h2>Account</h2>

                        <p>
                            Log out of your FinTrack account.
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        Logout
                    </button>

                </section>

            </main>
        </>
    );
}

export default Settings;
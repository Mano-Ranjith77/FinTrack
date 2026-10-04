import "./income.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Income() {
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [incomes, setIncomes] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const userId = localStorage.getItem("userId");

        const incomeData = {
            source: source,
            amount: amount,
            date: date,
            description: description,
            userId: userId
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/income`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(incomeData)
            });

            const data = await response.text();

            console.log(data);
            alert(data);

        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };
    if (!userName) {
        navigate("/");
        return null;
    }
    useEffect(() => {
        const userId = localStorage.getItem("userId");

        fetch(`${import.meta.env.VITE_API_URL}/income?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                setIncomes(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    return (
        <>
            <aside className="sidebar">

                <div className="logo">
                    <h2>FinTrack</h2>
                </div>

                <nav>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/income" className="active">Income</Link>
                    <Link to="/expenses">Expenses</Link>
                    <Link to="/analytics">Analytics</Link>
                    <Link to="/settings">Settings</Link>
                </nav>



            </aside>


            <main className="main-content">

                <header className="topbar">

                    <div>
                        <h1>Income</h1>
                        <p>Track and manage your income.</p>
                    </div>

                    <div className="profile">
                        <div className="profile-circle">{userName ? userName.charAt(0).toUpperCase() : "U"}</div>
                        <span>{userName || "User"}</span>
                    </div>

                </header>


                <section className="income-cards">

                    <div className="card">
                        <p>Total Income</p>
                        <h2>₹{totalIncome}</h2>
                        <span>This month</span>
                    </div>

                    

                   

                </section>


                <section className="content-grid">

                    <div className="panel add-income">

                        <h2>Add Income</h2>

                        <p className="subtitle">
                            Record a new source of income.
                        </p>

                        <form>

                            <div className="form-group">

                                <label htmlFor="source">
                                    Income Source
                                </label>

                                <select id="source" value={source} onChange={(e) => setSource(e.target.value)}
                                    required>
                                    <option value="">
                                        Select source
                                    </option>

                                    <option value="salary">
                                        Salary
                                    </option>

                                    <option value="freelance">
                                        Freelance
                                    </option>

                                    <option value="business">
                                        Business
                                    </option>

                                    <option value="investment">
                                        Investment
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label htmlFor="amount">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label htmlFor="date">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label htmlFor="description">
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    placeholder="Optional description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>

                            </div>


                            <button type="submit" onClick={handleSubmit}>
                                + Add Income
                            </button>

                        </form>

                    </div>


                    {/* INCOME HISTORY */}

                    <div className="panel income-history">

                        <div className="panel-header">

                            <div>

                                <h2>Income History</h2>

                                <p className="subtitle">
                                    Your recent income
                                </p>

                            </div>


                            <select>

                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>This Year</option>

                            </select>

                        </div>
                        <div className="income-list">
                        {incomes.map((income) => (
                            <div className="income-item" key={income.id}>

                                <div className="income-info">

                                    <div>
                                        <h4>{income.source.toUpperCase()}</h4>
                                        <p>{income.date}</p>
                                    </div>

                                </div>

                                <strong>+ ₹{income.amount}</strong>

                            </div>
                        
                        ))}

                    </div>
                    </div>

                </section>

            </main>
        </>
    );
}

export default Income;
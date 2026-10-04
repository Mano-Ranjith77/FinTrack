import "./analytics.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Analytics() {
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");
    const [incomes, setIncomes] = useState([]);
    const [expense, setExpense] = useState([]);
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
    useEffect(() => {
        const userId = localStorage.getItem("userId");

        fetch(`${import.meta.env.VITE_API_URL}/expense?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                setExpense(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const totalExpense = expense.reduce((total, expense) => total + expense.amount, 0);
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

                    <Link to="/analytics" className="active">
                        Analytics
                    </Link>

                    <Link to="/settings">
                        Settings
                    </Link>

                </nav>



            </aside>


            {/* MAIN CONTENT */}

            <main className="main-content">

                {/* TOPBAR */}

                <header className="topbar">

                    <div>

                        <h1>Analytics</h1>

                        <p>
                            Understand your income and spending.
                        </p>

                    </div>

                    <div className="profile">

                        <div className="profile-circle">
                            {userName ? userName.charAt(0).toUpperCase() : "U"}
                        </div>

                        <span>{userName || "User"}</span>

                    </div>

                </header>


                {/* SUMMARY CARDS */}

                <section className="analytics-cards">

                    <div className="card income-card">

                        <p>Total Income</p>

                        <h2>₹{totalIncome}</h2>

                        <span>All income</span>

                    </div>


                    <div className="card expense-card">

                        <p>Total Expenses</p>

                        <h2>₹{totalExpense}</h2>

                        <span>All expenses</span>

                    </div>


                    <div className="card balance-card">

                        <p>Net Balance</p>

                        <h2>₹{totalIncome - totalExpense}</h2>

                        <span>Income - Expenses</span>

                    </div>

                </section>


                {/* INCOME + EXPENSE LIST */}

                <section className="analytics-grid">


                    {/* INCOME LIST */}

                    <div className="panel">

                        <div className="panel-header">

                            <div>

                                <h2>Income</h2>

                                <p className="subtitle">
                                    Complete income overview
                                </p>

                            </div>



                        </div>
                        {incomes.map((income) => (
                            <div className="analytics-item" key={income.id}>

                                <div className="item-info">

                                    <div>
                                        <h4>{income.source.toUpperCase()}</h4>
                                        <p>{income.date}</p>
                                    </div>

                                </div>

                                <strong className="positive">
                                    + ₹{income.amount}
                                </strong>

                            </div>
                        ))}
                    </div>


                    {/* EXPENSE LIST */}

                    <div className="panel">

                        <div className="panel-header">

                            <div>

                                <h2>Expenses</h2>

                                <p className="subtitle">
                                    Complete expense overview
                                </p>

                            </div>


                        </div>
                        {expense.map((item) => (
                            <div className="analytics-item" key={item.id}>

                                <div className="item-info">

                                    <div>
                                        <h4>{item.category.toUpperCase()}</h4>
                                        <p>{item.date}</p>
                                    </div>

                                </div>

                                <strong className="negative">
                                    - ₹{item.amount}
                                </strong>

                            </div>
                        ))}
                    </div>

                </section>

            </main>
        </>
    );
}

export default Analytics;
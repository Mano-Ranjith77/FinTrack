import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { useState, useEffect } from "react";

function Dashboard() {

    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    const [incomes, setIncomes] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [expense, setExpense] = useState([]);

    useEffect(() => {

        if (!userName) {
            navigate("/");
        }

    }, [userName, navigate]);


    useEffect(() => {

        if (!userId) {
            return;
        }

        fetch(`http://localhost:8081/recent-transactions?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                setTransactions(data);
            })
            .catch(error => {
                console.error("Recent transaction error:", error);
            });

    }, [userId]);


    useEffect(() => {

        if (!userId) {
            return;
        }

        fetch(`http://localhost:8081/income?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                setIncomes(data);
            })
            .catch(error => {
                console.error("Error fetching income:", error);
            });

    }, [userId]);


    useEffect(() => {

        if (!userId) {
            return;
        }

        fetch(`http://localhost:8081/expense?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                setExpense(data);
            })
            .catch(error => {
                console.error("Error fetching expense:", error);
            });

    }, [userId]);


    const totalIncome = incomes.reduce(
        (total, income) => total + income.amount,
        0
    );

    const totalExpense = expense.reduce(
        (total, expense) => total + expense.amount,
        0
    );


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

                    <Link to="/settings">
                        Settings
                    </Link>

                </nav>

            </aside>


            {/* MAIN CONTENT */}

            <main className="main-content">

                {/* TOP BAR */}

                <header className="topbar">

                    <div>

                        <h1>Dashboard</h1>

                        <p>
                            Welcome back! Here's your financial overview.
                        </p>

                    </div>


                    <div className="profile">

                        <div className="profile-circle">

                            {userName
                                ? userName.charAt(0).toUpperCase()
                                : "U"}

                        </div>

                        <span>
                            {userName || "User"}
                        </span>

                    </div>

                </header>



                <section className="cards">

                    


                    <div className="card income">

                        <p>Total Income</p>

                        <h2>
                            ₹{totalIncome}
                        </h2>

                        <span>
                            This month
                        </span>

                    </div>


                    <div className="card expense">

                        <p>Total Expenses</p>

                        <h2>
                            ₹{totalExpense}
                        </h2>

                        <span>
                            This month
                        </span>

                    </div>


                    <div className="card savings">

                        <p>Savings</p>

                        <h2>₹{totalIncome - totalExpense}</h2>

                        <span>
                            This month
                        </span>

                    </div>

                </section>


                {/* DASHBOARD GRID */}

                <section className="dashboard-grid">

                    {/* RECENT TRANSACTIONS */}

                    <div className="panel transactions">

                        <div className="panel-header">

                            <h2>
                                Recent Transactions
                            </h2>

                            <a href="#">
                                View All
                            </a>

                        </div>


                        {transactions.map((transaction, index) => (

                            <div
                                className="transaction"
                                key={index}
                            >

                                <div>

                                    <h4>
                                        {transaction.source}
                                    </h4>

                                    <p>
                                        {transaction.date}
                                    </p>

                                </div>


                                <span
                                    className={
                                        transaction.type === "INCOME"
                                            ? "income-amount"
                                            : "expense-amount"
                                    }
                                >

                                    {transaction.type === "INCOME"
                                        ? "+"
                                        : "-"}₹{transaction.amount}

                                </span>

                            </div>

                        ))}

                    </div>


                    {/* SPENDING OVERVIEW */}

                    <div className="panel spending">

                        <div className="panel-header">

                            <h2>
                                Spending Overview
                            </h2>

                            <select>

                                <option>
                                    This Month
                                </option>

                                <option>
                                    Last Month
                                </option>

                            </select>

                        </div>


                        <div className="chart-placeholder">

                            <div className="bar bar1"></div>
                            <div className="bar bar2"></div>
                            <div className="bar bar3"></div>
                            <div className="bar bar4"></div>
                            <div className="bar bar5"></div>
                            <div className="bar bar6"></div>
                            <div className="bar bar7"></div>

                        </div>


                        <div className="chart-labels">

                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>

                        </div>

                    </div>

                </section>

            </main>
        </>
    );
}

export default Dashboard;
import "./expenses.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Expenses() {
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");

    const [menuOpen, setMenuOpen] = useState(false);

    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [paymethod, setPayMethod] = useState("");
    const [expense, setExpense] = useState([]);
    const [description, setDescription] = useState("");

    if (!userName) {
        navigate("/");
        return null;
    }

    const expSubmit = async (event) => {
        event.preventDefault();

        const userId = localStorage.getItem("userId");

        const expenseData = {
            category: category,
            amount: amount,
            date: date,
            paymethod: paymethod,
            description: description,
            userId: userId
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/expense`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(expenseData)
            });

            const data = await response.text();

            console.log(data);
            alert(data);

        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

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

    const totalExpense = expense.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    return (
        <>
            {/* HAMBURGER BUTTON */}

            <button
                className="menu-button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
            >
                ☰
            </button>

            {/* SIDEBAR OVERLAY */}

            {menuOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            {/* SIDEBAR */}

            <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>

                <div className="logo">
                    <h2>FinTrack</h2>
                </div>

                <nav>

                    <Link
                        to="/dashboard"
                        onClick={() => setMenuOpen(false)}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/income"
                        onClick={() => setMenuOpen(false)}
                    >
                        Income
                    </Link>

                    <Link
                        to="/expenses"
                        className="active"
                        onClick={() => setMenuOpen(false)}
                    >
                        Expenses
                    </Link>

                    <Link
                        to="/analytics"
                        onClick={() => setMenuOpen(false)}
                    >
                        Analytics
                    </Link>

                    <Link
                        to="/settings"
                        onClick={() => setMenuOpen(false)}
                    >
                        Settings
                    </Link>

                </nav>

            </aside>

            <main className="main-content">

                <header className="topbar">

                    <div>
                        <h1>Expenses</h1>
                        <p>Track and manage your expenses.</p>
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

                {/* EXPENSE CARDS */}

                <section className="expense-cards">

                    <div className="card">

                        <p>Total Expenses</p>

                        <h2>₹{totalExpense}</h2>

                        <span>This month</span>

                    </div>

                </section>

                {/* CONTENT GRID */}

                <section className="content-grid">

                    <div className="panel add-expense">

                        <h2>Add Expense</h2>

                        <p className="subtitle">
                            Record a new expense.
                        </p>

                        <form>

                            {/* CATEGORY */}

                            <div className="form-group">

                                <label htmlFor="category">
                                    Expense Category
                                </label>

                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="food">
                                        Food
                                    </option>

                                    <option value="shopping">
                                        Shopping
                                    </option>

                                    <option value="transport">
                                        Transport
                                    </option>

                                    <option value="bills">
                                        Bills & Utilities
                                    </option>

                                    <option value="entertainment">
                                        Entertainment
                                    </option>

                                    <option value="health">
                                        Health
                                    </option>

                                    <option value="education">
                                        Education
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                            </div>

                            {/* AMOUNT */}

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

                            {/* DATE */}

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

                            {/* PAYMENT METHOD */}

                            <div className="form-group">

                                <label htmlFor="payment">
                                    Payment Method
                                </label>

                                <select
                                    id="payment"
                                    required
                                    value={paymethod}
                                    onChange={(e) => setPayMethod(e.target.value)}
                                >

                                    <option value="">
                                        Select payment method
                                    </option>

                                    <option value="cash">
                                        Cash
                                    </option>

                                    <option value="upi">
                                        UPI
                                    </option>

                                    <option value="card">
                                        Debit / Credit Card
                                    </option>

                                    <option value="bank">
                                        Bank Transfer
                                    </option>

                                </select>

                            </div>

                            {/* DESCRIPTION */}

                            <div className="form-group">

                                <label htmlFor="description">
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Optional description"
                                ></textarea>

                            </div>

                            <button type="submit" onClick={expSubmit}>
                                + Add Expense
                            </button>

                        </form>

                    </div>

                    {/* EXPENSE HISTORY */}

                    <div className="panel expense-history">

                        <div className="panel-header">

                            <div>

                                <h2>Expense History</h2>

                                <p className="subtitle">
                                    Your recent expenses
                                </p>

                            </div>

                            <select>

                                <option>This Month</option>

                                <option>Last Month</option>

                                <option>This Year</option>

                            </select>

                        </div>

                        {expense.map((item) => (

                            <div
                                className="expense-item"
                                key={item.id}
                            >

                                <div className="expense-info">

                                    <div>

                                        <h4>
                                            {item.category.toUpperCase()}
                                        </h4>

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

export default Expenses;
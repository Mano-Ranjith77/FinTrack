import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./login";
import Signup from "./signup";
import Dashboard from "./dashboard";
import Income from "./income";
import Expenses from "./expenses";
import Analytics from "./analytics";
import Settings from "./settings";
function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="income" element={<Income/>}/>
                <Route path= "expenses" element={<Expenses/>}/>
                <Route path="analytics" element={<Analytics/>}/>
                <Route path="settings" element={<Settings/>}/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;
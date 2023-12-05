import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import Success from "./components/Success";

// For making a multipage app --> routes are being used

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Form1} />
                <Route path="/next/:id" Component={Form2} />
                <Route path="/success/:id" Component={Success} />
            </Routes>
        </BrowserRouter>
    );
}
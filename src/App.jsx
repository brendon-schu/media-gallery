import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import Login from "./pages/Login";
import EditItem from "./pages/EditItem";
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => (
        <div className="min-h-screen">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/artwork/:id" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add" element={ <ProtectedRoute><AddItem /></ProtectedRoute> } />
                <Route path="/edit/:id" element={ <ProtectedRoute><EditItem /></ProtectedRoute> } />
            </Routes>
        </div>
);

export default App;


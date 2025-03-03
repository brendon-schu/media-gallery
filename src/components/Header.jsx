import {Link} from "react-router-dom";

const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();  // crude, but works for this case
};

const isLoggedIn = !!localStorage.getItem('authToken');

const Header = () => (

    <div className="flex bg-gray-700 text-white p-4">
        <div className="flex-1"><Link to="/">Gallery</Link></div>
        <div className="flex-1 space-x-8 text-right">
            <Link to="/">Home</Link>
            {!isLoggedIn && (<Link to="/login">Login</Link>)}
            {isLoggedIn && (<Link to="/add">Add Item</Link>)}
            {isLoggedIn && (<button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>)}
        </div>
    </div>

);

export default Header;

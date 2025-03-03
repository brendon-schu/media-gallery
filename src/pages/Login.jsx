import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
const apiURL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
const uploadsURL = import.meta.env.VITE_UPLOADS_URL.replace(/\/$/, '');
const homeURL = import.meta.env.VITE_HOME_URL.replace(/\/$/, '');

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`${apiURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            const { token } = await res.json();
            localStorage.setItem('authToken', token);
            alert('Login successful!');
            window.location.href= homeURL;
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <>
            <Header />
            <div className="p-4 max-w-md mx-auto mt-10 bg-gray-200 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        className="border p-2 w-full bg-white" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        className="border p-2 w-full bg-white" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;


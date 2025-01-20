import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Importa el archivo CSS

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            alert(response.data.message);
            setUsername('');
            setPassword('');
            setIsSignUp(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignUp = () => {
        setIsSignUp(true);
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {isSignUp ? (
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Register</button>
                    <button type="button" onClick={() => setIsSignUp(false)}>Login</button>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                    <button type="button" onClick={handleSignUp}>Sign Up</button>
                </form>
            )}
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;

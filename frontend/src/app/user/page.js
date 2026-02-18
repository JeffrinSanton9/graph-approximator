import Navigator from "@/app/components/Navigator.js";
import { useState, useEffect } from "react";

export default function UserLogin() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            setLoading(true);
            setError("");
            try {
                const res = await fetch("http://127.0.0.1:8000/user");
                if (!res.ok) throw new Error("Could not fetch users");
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        // Implement login logic here
        setMessage("Login attempted (implement logic)");
    };

    return (
        <>
            <Navigator />
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            {message && <div>{message}</div>}
            {loading && <div>Loading users...</div>}
            {error && <div style={{color: 'red'}}>{error}</div>}
            <h3>Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.user_id}>{user.username} ({user.email})</li>
                ))}
            </ul>
        </>
    );
}

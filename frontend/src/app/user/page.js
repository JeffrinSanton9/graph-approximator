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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center">
            <Navigator />
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 mt-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">User Login</h2>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                    <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="border border-blue-200 rounded px-3 py-2 font-mono" />
                    <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border border-purple-200 rounded px-3 py-2 font-mono" />
                    <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-bold hover:bg-blue-800 transition">Login</button>
                </form>
                {message && <div className="text-green-700 mt-2">{message}</div>}
                {loading && <div className="text-gray-500 mt-2">Loading users...</div>}
                {error && <div className="text-red-700 mt-2">{error}</div>}
                <h3 className="text-lg font-mono text-purple-700 mt-6 mb-2">Users</h3>
                <ul className="w-full grid grid-cols-2 gap-2">
                    {users.map(user => (
                        <li key={user.user_id} className="bg-blue-50 rounded px-2 py-1 font-mono text-xs">{user.username} ({user.email})</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

"use client"
import Navigator from "@/app/components/Navigator.js";
import { useState } from "react";

export default function CreateUser(){
    const [formData, setFormData] = useState({username : "", email : ""});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("http://127.0.0.1:8000/user", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setMessage(`User created: ${data.username}/n User ID: ${data.user_id}`);
            setFormData({username : "", email : ""});
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }
    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center">
            <Navigator/>
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 mt-8 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Create User</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Enter your name" 
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="border border-blue-200 rounded px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Enter your email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border border-purple-200 rounded px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white rounded px-4 py-2 font-bold hover:bg-blue-800 transition">
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
                {message && <h1 className="text-green-700 mt-4 text-center font-mono">{message}</h1>}
            </div>
        </div>
    );
}

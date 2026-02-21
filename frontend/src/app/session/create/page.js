"use client"
import Navigator from "@/app/components/Navigator.js";
import { useState } from "react";

export default function CreateSession(){
    const [formData, setFormData] = useState({ user_id : "", session_name : "", description : "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            // Replace with actual API endpoint and fields
            const res = await fetch("http://127.0.0.1:8000/session", {
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
            setMessage(`Session created: ${data.name}`);
            setFormData({ name: "" });
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center">
            <Navigator/>
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 mt-8 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Create Session</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                    <input 
                        type="text" 
                        name="user_id"
                        placeholder="User ID" 
                        value={formData.user_id}
                        onChange={handleChange}
                        required
                        className="border border-blue-200 rounded px-3 py-2 font-mono"
                    /> 
                    <input 
                        type="text" 
                        name="session_name"
                        placeholder="Session Name" 
                        value={formData.session_name}
                        onChange={handleChange}
                        required
                        className="border border-blue-200 rounded px-3 py-2 font-mono"
                    /> 
                    <input 
                        type="text" 
                        name="description"
                        placeholder="Description" 
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="border border-blue-200 rounded px-3 py-2 font-mono"
                    /> 
                    <button type="submit" disabled={loading} className="bg-purple-600 text-white rounded px-4 py-2 font-bold hover:bg-purple-800 transition">
                        {loading ? "Creating..." : "Create"}
                    </button>
                </form>
                {message && <h1 className="text-green-700 mt-2">{message}</h1>}
            </div>
        </div>
    );
}

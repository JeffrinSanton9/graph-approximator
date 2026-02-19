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
        <>
            <Navigator/>
            <h1>Create Session</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="user_id"
                    placeholder="User ID" 
                    value={formData.user_id}
                    onChange={handleChange}
                    required
                /> 
                <input 
                    type="text" 
                    name="session_name"
                    placeholder="Session Name" 
                    value={formData.session_name}
                    onChange={handleChange}
                    required
                /> 
                <input 
                    type="text" 
                    name="description"
                    placeholder="Description" 
                    value={formData.description}
                    onChange={handleChange}
                    required
                /> 
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>
            {message && <h1>{message}</h1>}
        </>
    );
}

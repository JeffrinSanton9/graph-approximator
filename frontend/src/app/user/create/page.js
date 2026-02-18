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
        <>
            <Navigator/>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username"
                    placeholder="Enter your name" 
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <br/>
                <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br/>
                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
            {message && <h1>{message}</h1>}
        </>
    );
}

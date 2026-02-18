"use client"
import Navigator from "@/app/components/Navigator.js";
import { useState } from "react";

export default function Session(){
    const [formData, setFormData] = useState({ session_id: "" });
    const [session, setSession] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSession(null);
        try {
            const res = await fetch(`http://127.0.0.1:8000/session/${formData.session_id}`);
            if (!res.ok) throw new Error("Session not found");
            const data = await res.json();
            setSession(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navigator/>
            <h1>Session Login</h1>
            <form onSubmit={handleSubmit}>
                <input name="session_id" placeholder="Session ID" value={formData.session_id} onChange={handleChange} />
                <button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
            </form>
            {error && <div style={{color: 'red'}}>{error}</div>}
            {session && (
                <div>
                    <h3>Session Details</h3>
                    <div>Name: {session.session_name}</div>
                    <div>Description: {session.description}</div>
                    <div>Created: {session.created_at}</div>
                    <div>Updated: {session.updated_at}</div>
                </div>
            )}
        </>
    );
}

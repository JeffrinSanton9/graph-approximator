"use client"
import Navigator from "@/app/components/Navigator.js";
import AddDatapoint from "@/app/components/AddDatapoint.js";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Session(){
	const router = useRouter();
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
			else router.push(`/session/${formData.session_id}`);
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
        </>
    );
}

"use client"
import Navigator from "@/app/components/Navigator.js";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Session(){
    const [formData, setFormData] = useState({ session_id: "" });
    const [session, setSession] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
            // Redirect to session/[id] page
            router.push(`/session/${formData.session_id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center">
            <Navigator/>
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 mt-8 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Session Login</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                    <input name="session_id" placeholder="Session ID" value={formData.session_id} onChange={handleChange} className="border border-blue-200 rounded px-3 py-2 font-mono" />
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white rounded px-4 py-2 font-bold hover:bg-blue-800 transition">{loading ? "Loading..." : "Login"}</button>
                </form>
                {error && <div className="text-red-700 mt-2">{error}</div>}
            </div>
        </div>
    );
}

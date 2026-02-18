import Navigator from "@/app/components/Navigator.js";
import { useState } from "react";

export default function CreateSession(){
    const [formData, setFormData] = useState({ name: "" });
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
                    name="name"
                    placeholder="Session Name" 
                    value={formData.name}
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

"use client"
import Navigator from "@/app/components/Navigator.js";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function User(){
    
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({user_id : ""})
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e){
        e.preventDefault();
        router.push(`/user/${formData.user_id}`);
    }
    return (
        <>
            <Navigator/>
            <Link href="/user/create">Create User</Link>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="user_id"
                    placeholder="Enter your id"
                    value={formData.user_id}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

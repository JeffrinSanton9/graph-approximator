"use client"
import Navigator from "@/app/components/Navigator.js";
import Link from 'next/link';
import { useState } from "react";

export default function User(){
    
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
            console.log(await data);
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
            <Link href="/user/create">Create User</Link>
        </>
    );
}

"use client"
import Navigator from "@/app/components/Navigator.js";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function User({ params }) {
    const { id } = params;
    const [user, setUser] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUserAndSessions() {
            setLoading(true);
            setError("");
            try {
                const userRes = await fetch(`http://127.0.0.1:8000/user/${id}`);
                if (!userRes.ok) throw new Error("User not found");
                const userData = await userRes.json();
                setUser(userData);
                const sessionsRes = await fetch(`http://127.0.0.1:8000/session/user/${id}`);
                if (!sessionsRes.ok) throw new Error("Could not fetch sessions");
                const sessionsData = await sessionsRes.json();
                setSessions(sessionsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUserAndSessions();
    }, [id]);

    return (
        <>
            <Navigator/>
            <h1>User Dashboard</h1>
            <h2>User id: {id}</h2>
            {loading && <div>Loading...</div>}
            {error && <div style={{color: 'red'}}>{error}</div>}
            {user && (
                <div>
                    <h3>User's Details</h3>
                    <div>Username: {user.username}</div>
                    <div>Email: {user.email}</div>
                </div>
            )}
            <div>
                <h3>User's Sessions</h3>
                <ul>
                    {sessions.map(session => (
                        <li key={session.session_id}>
                            <Link href={`/session/${session.session_id}`}>{session.session_name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Link href={`/session/create`}>Create Session</Link>
            </div>
        </>
    );
}

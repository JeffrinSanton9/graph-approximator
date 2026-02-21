"use client"
import Navigator from "@/app/components/Navigator.js";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function User() {
	const params = useParams();
	const id = params.id;
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center">
            <Navigator/>
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 mt-8 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-blue-700 mb-2">User Dashboard</h1>
                <h2 className="text-lg font-mono text-purple-700 mb-4">User id: {id}</h2>
                {loading && <div className="text-gray-500">Loading...</div>}
                {error && <div className="text-red-700">{error}</div>}
                {user && (
                    <div className="mb-4">
                        <h3 className="text-md font-mono text-blue-700 mb-1">User's Details</h3>
                        <div className="font-mono">Username: {user.username}</div>
                        <div className="font-mono">Email: {user.email}</div>
                    </div>
                )}
                <div className="mb-4 w-full">
                    <h3 className="text-md font-mono text-purple-700 mb-1">User's Sessions</h3>
                    <ul className="grid grid-cols-1 gap-2">
                        {sessions.map(session => (
                            <li key={session.session_id} className="bg-blue-50 rounded px-2 py-1 font-mono text-xs">
                                <Link href={`/session/${session.session_id}`} className="text-blue-700 hover:text-blue-900">{session.session_name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <Link href={`/session/create`} className="bg-purple-600 text-white rounded px-4 py-2 font-bold hover:bg-purple-800 transition">Create Session</Link>
                </div>
            </div>
        </div>
    );
}

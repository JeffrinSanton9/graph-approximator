"use client"
import Navigator from "@/app/components/Navigator.js";
import PlotCanvas from "@/app/components/PlotCanvas.js";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Session() {
    const params = useParams();
    const id = params.id;
    const [session, setSession] = useState(null);
    const [datapoints, setDatapoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchSessionAndDatapoints() {
            setLoading(true);
            setError("");
            try {
                const sessionRes = await fetch(`http://127.0.0.1:8000/session/${id}`);
                if (!sessionRes.ok) throw new Error("Session not found");
                const sessionData = await sessionRes.json();
                setSession(sessionData);
                const datapointsRes = await fetch(`http://127.0.0.1:8000/datapoint/session/${id}`);
                if (!datapointsRes.ok) throw new Error("Could not fetch datapoints");
                const datapointsData = await datapointsRes.json();
                setDatapoints(datapointsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSessionAndDatapoints();
    }, [id]);

    return (
        <>
            <h1>ID : {id}</h1>
            <Navigator/>
            <h1>Session Dashboard</h1>
            <h2>Session id: {id}</h2>
            {loading && <div>Loading...</div>}
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
            <div>
                <h3>Data Points</h3>
                <ul>
                    {datapoints.map(dp => (
                        <li key={dp.point_id}>x: {dp.x_value}, y: {dp.y_value}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Plotter</h3>
                <PlotCanvas expression={"x^2"} />
            </div>
        </>
    );
}

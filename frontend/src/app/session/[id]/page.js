"use client"
import Navigator from "@/app/components/Navigator.js";
import PlotCanvas from "@/app/components/PlotCanvas.js";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const APPROX_METHODS = [
    { label: "Linear Regression", value: "linear" },
    { label: "Polynomial Regression", value: "polynomial" },
    { label: "Taylor Series", value: "series" },
];

export default function Session() {
    const params = useParams();
    const id = params.id;
    const [session, setSession] = useState(null);
    const [datapoints, setDatapoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [approxMethod, setApproxMethod] = useState("linear");
    const [approxResult, setApproxResult] = useState("");
    const [approxLoading, setApproxLoading] = useState(false);
    const [degree, setDegree] = useState(2);
    const [taylorTerms, setTaylorTerms] = useState(10); // for taylor

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

    async function handleApproximate() {
        setApproxLoading(true);
        setApproxResult("");
        setError("");
        try {
            let url = "";
            let options = {};
            if (approxMethod === "linear") {
                url = `http://127.0.0.1:8000/approximate/linear/${id}`;
                options = { method: "GET" };
            } else if (approxMethod === "polynomial") {
                url = `http://127.0.0.1:8000/approximate/polynomial/${id}?degree=${degree}`;
                options = { method: "GET" };
            } else if (approxMethod === "series") {
                url = `http://127.0.0.1:8000/approximate/series/${id}`;
                options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ point_of_approximation: [0,0], no_of_terms: taylorTerms })
                };
            }
            const res = await fetch(url, options);
            if (!res.ok) throw new Error("Approximation failed");
            const data = await res.json();
            setApproxResult(data.result);
        } catch (err) {
            setError(err.message);
        } finally {
            setApproxLoading(false);
        }
    }

    return (
        <>
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
                <h3>Approximation</h3>
                <select value={approxMethod} onChange={e => setApproxMethod(e.target.value)}>
                    {APPROX_METHODS.map(m => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>
                {approxMethod === "polynomial" && (
                    <input type="number" min={1} max={10} value={degree} onChange={e => setDegree(e.target.value)} placeholder="Degree" />
                )}
                {approxMethod === "series" && (
                    <input type="number" min={1} max={50} value={taylorTerms} onChange={e => setTaylorTerms(e.target.value)} placeholder="No. of Terms" />
                )}
                <button onClick={handleApproximate} disabled={approxLoading}>
                    {approxLoading ? "Approximating..." : "Approximate"}
                </button>
                {approxResult && (
                    <div><b>Approximated Function:</b> {approxResult}</div>
                )}
            </div>
            <div>
                <h3>Plotter</h3>
                <PlotCanvas expression={approxResult} dp={datapoints}/>
            </div>
        </>
    );
}

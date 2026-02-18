export default function AddDatapoint({ sessionId, onAdd }) {
    const [show, setShow] = useState(false);
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch("http://127.0.0.1:8000/datapoint", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_id: Number(sessionId), x_value: Number(x), y_value: Number(y) })
            });
            if (!res.ok) throw new Error("Failed to add data point");
            setSuccess("Data point added!");
            setX("");
            setY("");
            setShow(false);
            if (onAdd) onAdd();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={() => setShow(!show)}>{show ? "Cancel" : "Add Data Point"}</button>
            {show && (
                <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
                    <input type="number" step="any" value={x} onChange={e => setX(e.target.value)} placeholder="x value" required />
                    <input type="number" step="any" value={y} onChange={e => setY(e.target.value)} placeholder="y value" required />
                    <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add"}</button>
                </form>
            )}
            {error && <div style={{color: 'red'}}>{error}</div>}
            {success && <div style={{color: 'green'}}>{success}</div>}
        </div>
    );
}
const { useState, useEffect } = React;

function ConferenceSignup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [conferenceId, setConferenceId] = useState("");
    const [participationType, setParticipationType] = useState("");
    const [notes, setNotes] = useState("");

    const [conferences, setConferences] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3030/conferences")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load conferences.");
                }
                return response.json();
            })
            .then((data) => {
                setConferences(Array.isArray(data) ? data : []);
            })
            .catch(() => {
                setError("Could not load conferences.");
            });
    }, []);

    function validateEmail(value) {
        return /\S+@\S+\.\S+/.test(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!fullName.trim() || !email.trim() || !conferenceId || !participationType) {
            setError("Please fill in all required fields.");
            return;
        }

        if (!validateEmail(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        const payload = {
            fullName: fullName.trim(),
            email: email.trim(),
            conferenceId: conferenceId,
            participationType: participationType,
            notes: notes.trim()
        };

        setLoading(true);

        fetch("http://localhost:3030/conference-signups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to submit registration.");
                }
                return response.json();
            })
            .then(() => {
                setSuccess("Registration submitted successfully!");
                setFullName("");
                setEmail("");
                setConferenceId("");
                setParticipationType("");
                setNotes("");
            })
            .catch(() => {
                setError("Something went wrong. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <form onSubmit={handleSubmit} className="card shadow-sm p-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="mb-3">
                <label className="form-label">Full Name *</label>
                <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Conference *</label>
                <select
                    className="form-select"
                    value={conferenceId}
                    onChange={(e) => setConferenceId(e.target.value)}
                >
                    <option value="">Select Conference</option>
                    {conferences.map((conference) => (
                        <option key={conference.id} value={conference.id}>
                            {conference.title || conference.name || `Conference ${conference.id}`}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label d-block">Participation Type *</label>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="participationType"
                        id="in-person"
                        value="in-person"
                        checked={participationType === "in-person"}
                        onChange={(e) => setParticipationType(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="in-person">
                        In-person
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="participationType"
                        id="virtual"
                        value="virtual"
                        checked={participationType === "virtual"}
                        onChange={(e) => setParticipationType(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="virtual">
                        Virtual
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="participationType"
                        id="vip"
                        value="vip"
                        checked={participationType === "vip"}
                        onChange={(e) => setParticipationType(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="vip">
                        VIP
                    </label>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Notes / Special Requests</label>
                <textarea
                    className="form-control"
                    rows="4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Submitting..." : "Submit Registration"}
            </button>
        </form>
    );
}

ReactDOM.createRoot(document.getElementById("react-signup-root")).render(<ConferenceSignup />);

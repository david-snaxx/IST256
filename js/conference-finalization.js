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

    useEffect(() => {
        getAllConferences().then(data => setConferences(data));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!fullName || !email || !conferenceId || !participationType) {
            setError("Please fill in all required fields.");
            return;
        }

        const payload = {
            fullName,
            email,
            conferenceId,
            participationType,
            notes
        };

        createSignup(payload)
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
            });
    }

    return (
        <form onSubmit={handleSubmit} className="card p-4">

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="mb-3">
                <label className="form-label">Full Name *</label>
                <input className="form-control"
                       value={fullName}
                       onChange={e => setFullName(e.target.value)} />
            </div>

            <div className="mb-3">
                <label className="form-label">Email *</label>
                <input className="form-control"
                       value={email}
                       onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="mb-3">
                <label className="form-label">Conference *</label>
                <select className="form-select"
                        value={conferenceId}
                        onChange={e => setConferenceId(e.target.value)}>
                    <option value="">Select Conference</option>
                    {conferences.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Participation Type *</label><br/>
                <input type="radio" value="in-person"
                       checked={participationType === "in-person"}
                       onChange={e => setParticipationType(e.target.value)} /> In-person
                <br/>
                <input type="radio" value="virtual"
                       checked={participationType === "virtual"}
                       onChange={e => setParticipationType(e.target.value)} /> Virtual
                <br/>
                <input type="radio" value="vip"
                       checked={participationType === "vip"}
                       onChange={e => setParticipationType(e.target.value)} /> VIP
            </div>

            <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea className="form-control"
                          value={notes}
                          onChange={e => setNotes(e.target.value)} />
            </div>

            <button className="btn btn-primary">Submit Registration</button>

        </form>
    );
}

ReactDOM.createRoot(document.getElementById("react-signup-root"))
    .render(<ConferenceSignup />);

const { useState, useEffect } = React;

function ConferenceApproval() {
    const [conferences, setConferences] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(true);
    const [approvingId, setApprovingId] = useState(null);

    useEffect(() => {
        if (window.Service) {
            fetchPendingConferences();
        } else { // wait for the service-event ready if needed
            window.addEventListener('service-ready',
                fetchPendingConferences, { once: true });
        }
    }, []);

    function fetchPendingConferences() {
        setLoading(true);
        const service = window.Service;

        service.getConferencesByApproval(false)
            .then((data) => {
                setConferences(Array.isArray(data) ? data : []);
            })
            .catch(() => {
                setError("Could not load pending conferences.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleApprove(id) {
        setError("");
        setSuccess("");
        setApprovingId(id);
        const service = window.Service;

        service.updateConference(id, { approved: true })
            .then((updated) => {
                setSuccess(`"${updated.title}" has been approved!`);
                setConferences((prev) => prev.filter((c) => c.id !== id));
            })
            .catch(() => {
                setError("Something went wrong. Please try again.");
            })
            .finally(() => {
                setApprovingId(null);
            });
    }

    if (loading) {
        return <p className="text-muted">Loading pending conferences...</p>;
    }

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {conferences.length === 0 ? (
                <div className="alert alert-info">No conferences pending approval.</div>
            ) : (
                <div className="row g-3">
                    {conferences.map((conf) => (
                        <div key={conf.id} className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5 className="card-title mb-1">{conf.title}</h5>
                                            <p className="card-text text-muted mb-2">{conf.description}</p>
                                            <div className="d-flex flex-wrap gap-2 mb-2">
                                                <span className="badge bg-secondary">{conf.category}</span>
                                                <span className="badge bg-info text-dark">{conf.format}</span>
                                                <span className="badge bg-success">${conf.entryPrice != null ? Number(conf.entryPrice).toFixed(2) : "0.00"}</span>
                                            </div>
                                            {conf.additionalInfo && (
                                                <p className="card-text small text-muted mb-0">
                                                    <strong>Additional Info:</strong> {conf.additionalInfo}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            className="btn btn-primary btn-sm ms-3"
                                            disabled={approvingId === conf.id}
                                            onClick={() => handleApprove(conf.id)}
                                        >
                                            {approvingId === conf.id ? "Approving..." : "Approve"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("react-approval-root")).render(<ConferenceApproval />);

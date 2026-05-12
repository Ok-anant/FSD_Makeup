import { useState } from "react";

function Participants({
  participants,
  setParticipants,
  events,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    event: "",
  });

  const [search, setSearch] = useState("");

  const addParticipant = () => {
    if (!form.name || !form.email || !form.event) {
      alert("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    const newParticipant = {
      id: Date.now(),
      ...form,
    };

    setParticipants([...participants, newParticipant]);

    setForm({
      name: "",
      email: "",
      event: "",
    });
  };

  const deleteParticipant = (id) => {
    if (window.confirm("Are you sure you want to remove this participant?")) {
      setParticipants(
        participants.filter((p) => p.id !== id)
      );
    }
  };

  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.event.toLowerCase().includes(search.toLowerCase())
  );

  const getEventParticipantCount = (eventName) => {
    return participants.filter((p) => p.event === eventName).length;
  };

  return (
    <div className="container">
      <h1>👥 Participants Management</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Participant Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <select
          value={form.event}
          onChange={(e) => setForm({ ...form, event: e.target.value })}
        >
          <option value="">Select Event</option>

          {events.map((event) => (
            <option key={event.id} value={event.name}>
              {event.name} ({getEventParticipantCount(event.name)} participants)
            </option>
          ))}
        </select>

        <button onClick={addParticipant}>
          ➕ Add Participant
        </button>
      </div>

      <div className="form" style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Search participants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>

      {filteredParticipants.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>📅 Event</th>
              <th>⚙️ Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredParticipants.map((p, index) => (
              <tr
                key={p.id}
                style={{
                  animation: `slideUp 0.4s ease-out ${index * 0.05}s backwards`,
                }}
              >
                <td style={{ fontWeight: "600", color: "#1f2937" }}>{p.name}</td>
                <td>
                  <a
                    href={`mailto:${p.email}`}
                    style={{
                      color: "#6366f1",
                      textDecoration: "none",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                  >
                    {p.email}
                  </a>
                </td>
                <td>
                  <span
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontWeight: "500",
                      color: "#4f46e5",
                      fontSize: "13px",
                    }}
                  >
                    {p.event}
                  </span>
                </td>

                <td>
                  <button
                    className="delete"
                    onClick={() => deleteParticipant(p.id)}
                    style={{
                      marginLeft: 0,
                      padding: "10px 16px",
                      fontSize: "12px",
                    }}
                  >
                    🗑️ Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          className="card"
          style={{
            marginTop: "30px",
            textAlign: "center",
            padding: "60px 30px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
          <h3 style={{ color: "#9ca3af", marginBottom: "10px", fontSize: "18px" }}>
            No participants found
          </h3>
          <p style={{ color: "#d1d5db" }}>
            {search ? "Try adjusting your search or add a new participant" : "Add your first participant!"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Participants;

import { useState } from "react";

function Events({ events, setEvents }) {
  const [form, setForm] = useState({
    name: "",
    date: "",
    venue: "",
    organizer: "",
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const addEvent = () => {
    if (!form.name || !form.date || !form.venue || !form.organizer) {
      alert("Please fill in all fields");
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...form,
      status: "Upcoming",
    };

    setEvents([...events, newEvent]);

    setForm({
      name: "",
      date: "",
      venue: "",
      organizer: "",
    });
  };

  const deleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const completeEvent = (id) => {
    setEvents(
      events.map((e) =>
        e.id === id
          ? { ...e, status: "Completed" }
          : e
      )
    );
  };

  const filteredEvents = events.filter((event) => {
    const matchSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || event.status === filter;
    return matchSearch && matchFilter;
  });

  const getEventGradient = (index) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="container">
      <h1>📅 Events Management</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Event Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="text"
          placeholder="Venue"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
        />

        <input
          type="text"
          placeholder="Organizer"
          value={form.organizer}
          onChange={(e) =>
            setForm({
              ...form,
              organizer: e.target.value,
            })
          }
        />

        <button onClick={addEvent}>✨ Add Event</button>
      </div>

      <div className="form" style={{ marginTop: "20px", gap: "16px" }}>
        <input
          type="text"
          placeholder="🔍 Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Events</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="cards">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div
              className="card"
              key={event.id}
              style={{
                borderLeft: "5px solid transparent",
                borderImage: getEventGradient(index) + " 1",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "20px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#1f2937",
                    marginBottom: "8px",
                  }}>
                    {event.name}
                  </h3>
                </div>
                <span
                  className={
                    event.status === "Upcoming"
                      ? "status-badge status-upcoming"
                      : "status-badge status-completed"
                  }
                >
                  {event.status === "Upcoming" ? "🔔 Upcoming" : "✅ Completed"}
                </span>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <p style={{
                  color: "#6b7280",
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}>
                  📅 <strong>Date:</strong> {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p style={{
                  color: "#6b7280",
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}>
                  📍 <strong>Venue:</strong> {event.venue}
                </p>
                <p style={{
                  color: "#6b7280",
                  marginBottom: "0",
                  fontSize: "14px",
                  fontWeight: "500",
                }}>
                  👤 <strong>Organizer:</strong> {event.organizer}
                </p>
              </div>

              <div style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(229, 231, 235, 0.3)",
              }}>
                {event.status === "Upcoming" && (
                  <button
                    onClick={() => completeEvent(event.id)}
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)",
                      flex: 1,
                    }}
                  >
                    ✓ Complete
                  </button>
                )}
                <button
                  className="delete"
                  onClick={() => deleteEvent(event.id)}
                  style={{ marginLeft: 0, flex: 1 }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            className="card"
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px 40px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
            <h3 style={{ color: "#9ca3af", marginBottom: "10px", fontSize: "18px" }}>
              No events found
            </h3>
            <p style={{ color: "#d1d5db" }}>
              {search ? "Try adjusting your search or create a new event" : "Create your first event to get started!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;

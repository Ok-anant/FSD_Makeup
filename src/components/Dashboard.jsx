function Dashboard({ events, participants }) {
  const totalEvents = events.length;
  const upcoming = events.filter((e) => e.status === "Upcoming").length;
  const completed = events.filter((e) => e.status === "Completed").length;
  const totalParticipants = participants.length;

  const getMetricColor = (index) => {
    const colors = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    ];
    return colors[index % colors.length];
  };

  const metrics = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: "📅",
      color: getMetricColor(0),
      description: "All events created",
    },
    {
      title: "Upcoming Events",
      value: upcoming,
      icon: "🔔",
      color: getMetricColor(1),
      description: "Events to happen",
    },
    {
      title: "Completed Events",
      value: completed,
      icon: "✅",
      color: getMetricColor(2),
      description: "Events completed",
    },
    {
      title: "Total Participants",
      value: totalParticipants,
      icon: "👥",
      color: getMetricColor(3),
      description: "Registered participants",
    },
  ];

  return (
    <div className="container">
      <h1>📊 Dashboard Overview</h1>

      <div className="cards">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="card"
            style={{
              position: "relative",
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
                <h3
                  style={{
                    color: "#6b7280",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: "700",
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  {metric.title}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#9ca3af",
                    margin: 0,
                  }}
                >
                  {metric.description}
                </p>
              </div>
              <div
                style={{
                  fontSize: "36px",
                  lineHeight: 1,
                  opacity: 0.8,
                }}
              >
                {metric.icon}
              </div>
            </div>
            <p
              style={{
                fontSize: "44px",
                fontWeight: "800",
                color: "transparent",
                backgroundImage: metric.color,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                margin: "24px 0 0 0",
                letterSpacing: "-2px",
              }}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {totalEvents > 0 && (
        <div
          style={{
            marginTop: "45px",
            padding: "32px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
              fontSize: "20px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📈 Quick Stats
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            <div
              style={{
                padding: "20px",
                background: "rgba(99, 102, 241, 0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(99, 102, 241, 0.1)",
              }}
            >
              <p
                style={{
                  color: "#6b7280",
                  marginBottom: "12px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Event Completion Rate
              </p>
              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background: "rgba(229, 231, 235, 0.3)",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(completed / totalEvents) * 100}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                    transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </div>
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "#4f46e5",
                  fontWeight: "700",
                }}
              >
                {totalEvents > 0
                  ? `${Math.round((completed / totalEvents) * 100)}% Completed`
                  : "No events yet"}
              </p>
            </div>

            <div
              style={{
                padding: "20px",
                background: "rgba(236, 72, 153, 0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(236, 72, 153, 0.1)",
              }}
            >
              <p
                style={{
                  color: "#6b7280",
                  marginBottom: "12px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Average Participants per Event
              </p>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "transparent",
                  backgroundImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  marginTop: "12px",
                }}
              >
                {totalEvents > 0 ? (totalParticipants / totalEvents).toFixed(1) : 0}
              </p>
            </div>

            <div
              style={{
                padding: "20px",
                background: "rgba(74, 222, 128, 0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(74, 222, 128, 0.1)",
              }}
            >
              <p
                style={{
                  color: "#6b7280",
                  marginBottom: "12px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Upcoming vs Completed
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "12px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "rgba(59, 130, 246, 0.1)",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "#2563eb", fontWeight: "700", margin: "0 0 4px 0" }}>
                    {upcoming}
                  </p>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                    Upcoming
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "rgba(16, 185, 129, 0.1)",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "#059669", fontWeight: "700", margin: "0 0 4px 0" }}>
                    {completed}
                  </p>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

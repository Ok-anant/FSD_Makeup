import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import Participants from "./components/Participants";
import { useState } from "react";

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Conference",
      date: "2026-05-20",
      venue: "Delhi",
      organizer: "Anant",
      status: "Upcoming",
    },
  ]);

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "Rahul",
      email: "rahul@gmail.com",
      event: "Tech Conference",
    },
  ]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Dashboard events={events} participants={participants} />}
        />

        <Route
          path="/events"
          element={<Events events={events} setEvents={setEvents} />}
        />

        <Route
          path="/participants"
          element={
            <Participants
              participants={participants}
              setParticipants={setParticipants}
              events={events}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

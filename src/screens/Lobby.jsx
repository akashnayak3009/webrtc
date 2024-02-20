import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();

  const navigate = useNavigate();

  const handlesubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        LobbyScreen
      </h1>
      <form
        onSubmit={handlesubmitForm}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label
          htmlFor="email"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            marginBottom: "10px",
          }}
        >
          Email Id
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            width: "300px",
          }}
        />
        <label
          htmlFor="room"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            marginBottom: "10px",
          }}
        >
          Room Number
        </label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            width: "300px",
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default LobbyScreen;

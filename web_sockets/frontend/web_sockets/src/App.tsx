import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function sendMessages() {
    if (!socket) return;
    if (!inputRef.current) return;

    const message = inputRef.current.value;
    socket.send(message);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("Connected to server");
      setSocket(ws);
    }

    ws.onmessage = (ev) => {
      alert(ev.data);
    };

    return () => {
      ws.close();
    }
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="enter ping to get pong" />
      <button onClick={sendMessages}>Send</button>
    </div>
  );
}

export default App;

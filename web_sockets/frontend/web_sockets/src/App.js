import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
    const [socket, setSockets] = useState();
    function sendMessages() {
        // @ts-ignore
        if (!socket) {
            return;
        }
        socket.send("ping");
    }
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSockets(ws);
        ws.onmessage = (e) => {
            alert(e.data);
        };
    }, []);
    return (_jsxs("div", { children: [_jsx("input", { type: "text", placeholder: "enter ping to get pong" }), _jsx("button", { onClick: sendMessages, children: "Send" })] }));
}
export default App;
//# sourceMappingURL=App.js.map
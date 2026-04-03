"use client";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";

export default function () {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div>chat room</div>
      <div>
        <TextInput
          placeHolder="chat here"
          size="big"
          onChange={(e: any) => {
            setMessage(e.target.value);
          }}
          value={message}
        ></TextInput>
        <button
          onClick={() => {
            if (!message) return;
            setMessages((prev) => [...prev, message]);
            setMessage("");
          }}
        >
          Send messages
        </button>
      </div>
    </div>
  );
}

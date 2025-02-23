import { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat history
    setMessages([...messages, { role: "user", content: userInput }]);

    try {
      const response = await axios.post("http://localhost:5000/chat", { user_input: userInput });
      const botResponse = response.data.response;

      // Add bot response to chat history
      setMessages([...messages, { role: "user", content: userInput }, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }

    setUserInput(""); // Clear input field
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.role === "user" ? "user-msg" : "bot-msg"}>
            {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask a medical question..."
      />
      <button onClick={handleSend}>Send</button>

      <style jsx>{`
        .chat-container {
          width: 50%;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .chat-box {
          height: 300px;
          overflow-y: scroll;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        .user-msg {
          text-align: right;
          color: blue;
        }
        .bot-msg {
          text-align: left;
          color: green;
        }
      `}</style>
    </div>
  );
}

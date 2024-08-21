import React, { useState } from "react";
import ChatMessage from "./ChatMessage"; // Ensure this is the correct path
import ChatInput from "./ChatInput"; // Ensure this is the correct path

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", type: "incoming" }
  ]);

  const API_KEY = "AIzaSyBCEfDopShi3OExpYkk2qJEI_DC6rQWLcI"; 
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

  const addMessage = async (message) => {
    setMessages([...messages, message]);

    if (message.type === "outgoing") {
      const thinkingMessage = { text: "...", type: "incoming" };
      setMessages((prevMessages) => [...prevMessages, thinkingMessage]);

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ 
              role: "user", 
              parts: [{ text: message.text }] 
            }]
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        const botResponse = {
          text: data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1'),
          type: "incoming",
        };
        setMessages((prevMessages) => [...prevMessages.slice(0, -1), botResponse]);
      } catch (error) {
        const errorMessage = { text: `Error: ${error.message}`, type: "incoming" };
        setMessages((prevMessages) => [...prevMessages.slice(0, -1), errorMessage]);
      }
    }
  };

  return (
    <div className="fixed right-8 bottom-24 w-96 bg-white rounded-xl shadow-lg transform transition-all scale-100 origin-bottom-right opacity-100">
      <header className="bg-purple-600 text-white text-center py-4 shadow rounded-t-xl">
        <h2 className="text-lg font-semibold">Chatbot</h2>
      </header>
      <ul className="chatbox overflow-y-auto h-80 p-5">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} type={msg.type} />
        ))}
      </ul>
      <ChatInput onSendMessage={addMessage} />
    </div>
  );
}

export default Chatbot;

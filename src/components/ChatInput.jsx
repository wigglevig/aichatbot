import React, { useState } from "react";
import PropTypes from "prop-types";

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage({ text: message, type: "outgoing" });
      setMessage("");
    }
  };

  return (
    <div className="flex items-center p-3 border-t">
      <textarea
        className="flex-1 resize-none p-2 border rounded-lg focus:outline-none"
        rows="1"
        placeholder="Enter a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
      ></textarea>
      <button
        className="ml-2 text-purple-600 hover:text-purple-800 focus:outline-none send-button"
        onClick={handleSendMessage}
      >
        <span className="material-symbols-rounded">send</span>
      </button>
    </div>
  );
}

ChatInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default ChatInput;

import React from "react";
import PropTypes from "prop-types";

function ChatMessage({ message, type }) {
  return (
    <li className={`flex ${type === "outgoing" ? "justify-end" : "justify-start"} mb-4`}>
      {type === "incoming" && (
        <span className="material-symbols-outlined text-white bg-purple-600 p-2 rounded-full mr-2 chat-icon">smart_toy</span>
      )}
      <p className={`max-w-xs px-4 py-2 rounded-lg ${type === "outgoing" ? "bg-purple-600 text-white" : "bg-gray-200 text-black"}`}>
        {message}
      </p>
    </li>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["incoming", "outgoing"]).isRequired,
};

export default ChatMessage;

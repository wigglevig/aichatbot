import React, { useState } from "react";
import "./index.css"; 
import Chatbot from "./components/Chatbot"; 

function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className={showChatbot ? "show-chatbot" : ""}>
      <button
        className="fixed bottom-8 right-8 flex items-center justify-center w-12 h-12 bg-purple-600 hover:bg-sky-800 text-white rounded-full transition-transform transform hover:scale-110 focus:outline-none "
        onClick={() => setShowChatbot(!showChatbot)}
      >
        <span className={`material-symbols-rounded ${showChatbot ? "hidden" : "block"}`}>
          mode_comment
        </span>
        <span className={`material-symbols-outlined ${showChatbot ? "block" : "hidden"}`}>
          close
        </span>
      </button>
      {showChatbot && <Chatbot />}
    </div>
  );
}

export default App;

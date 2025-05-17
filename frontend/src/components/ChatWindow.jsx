import { useState } from "react";
import Message from "./Message";
import AnimationPlayer from "./AnimationPlayer";
import axios from "axios";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [animationUrl, setAnimationUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {role: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/generate", { prompt: input });

      const { video_url } = res.data;
      
      const fullVideoUrl = `http://127.0.0.1:8000${video_url}`;
      
      const botMsg = { role: "bot", text: "Here's your animation:", video: fullVideoUrl };
      setMessages(prev => [...prev, botMsg]);
      setAnimationUrl(fullVideoUrl);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "bot", text: "Failed to generate animation." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <Message key={idx} role={msg.role} text={msg.text} video={msg.video} />
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-grow px-4 py-2 rounded bg-gray-700 focus:outline-none"
          type="text"
          placeholder="Describe your animation..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Rendering..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

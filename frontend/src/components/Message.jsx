import AnimationPlayer from "./AnimationPlayer";

const Message = ({ role, text, video }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`px-4 py-2 rounded-lg ${isUser ? "bg-blue-600" : "bg-gray-600"} max-w-[80%]`}>
        <div>{text}</div>
        {video && <AnimationPlayer videoUrl={video} />}
      </div>
    </div>
  );
};

export default Message;

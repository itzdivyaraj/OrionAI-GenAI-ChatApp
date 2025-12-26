import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ role, text }) {
  if (role === "user") {
    return (
      <div className="w-full flex justify-end px-4 ">
        <div className="max-w-[60%] bg-gray-700 px-4 py-4 mb-3 rounded-2xl">
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-4 py-4 mt-2">
      <div className="max-w-[680px] w-full leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;

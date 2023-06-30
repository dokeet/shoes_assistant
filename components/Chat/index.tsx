import AnswerComponent from "@/components/Answer/Answer";
import endent from "endent";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";

interface ChatProps {
  setHistory: (e: any) => void;
  history: any;
  setLoading: (a: boolean) => void;
  loading: boolean;
}

const Chat: React.FC<ChatProps> = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [recomendations, setRecomendations] = useState<any>();

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const getRecomendations = async () => {
    const lastMessage = messages.filter((item) => item.role === "user").pop();
    const query = lastMessage ? lastMessage.content : "";
    const searchResponse = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, matches: 12 }),
    });

    if (!searchResponse.ok) {
      setLoading(false);
      throw new Error(searchResponse.statusText);
    }
    const results = await searchResponse.json();
    setRecomendations(results);
    console.log("messages with results", messages.push(results));
    return results;
  };

  useEffect(() => {
    console.log(messages);
    getRecomendations();
  }, []);

  return (
    // <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
    <div className="bg-gray-100 flex flex-col justify-between p-4 w-1/3 overflow-y-auto">
      <div className="p-2 flex flex-col">
        {messages.length > 0 ? (
          messages.map((item: any, i: number) => {
            if (item.role === "user") {
              return (
                <div key={i + item.role} className="flex flex-col">
                  <div className="bg-white shadow-md p-4 rounded-tr-2xl rounded-l-2xl self-end max-w-[240px] w-auto mt-4 text-end">
                    {item.content}
                  </div>
                </div>
              );
            }
            if (item.role === "assistant") {
              return (
                <div
                  key={i + recomendations.id}
                  className="flex flex-col pr-16">
                  <AnswerComponent
                    images={recomendations}
                    answer={item.content}
                  />
                </div>
              );
            }
          })
        ) : (
          <div className="p-4">
            <div className="shadow-md bg-gray-600 p-4 rounded-tl-2xl rounded-r-2xl font text-sm text-white">
              <h5>Would you like to check this?</h5>
            </div>
            <AnswerComponent images={recomendations} answer={""} />
          </div>
        )}
      </div>
      <div className="relative" ref={chatContainerRef}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            className="p-4 rounded-2xl h-12 mt-4 shadow-md"
            placeholder="Want some Stan Smith?"
            value={input}
            onChange={handleInputChange}
            onKeyDown={() => handleSubmit}
          />
          <Button
            onClick={() => handleSubmit}
            className="text-xs lg:text-sm absolute bottom-1 right-0 bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 stroke-gray-400">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Button>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default Chat;

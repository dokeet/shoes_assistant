import AnswerComponent from "@/components/Answer/Answer";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Message, CreateMessage } from "ai/react";

interface ChatProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  append: (message: Message | CreateMessage) => Promise<string | undefined>;
  isProductHome: boolean;
  setIsProductHome: (a: boolean) => void;
}

const Chat: React.FC<ChatProps> = ({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  append,
  isProductHome,
  setIsProductHome,
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages
    .filter((item) => item.role === "user")
    .slice(-1)
    .pop();

  const getRecomendations = async () => {
    const searchResponse = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: isProductHome ? lastMessage?.content : input,
        matches: 10,
      }),
    });
    if (!searchResponse.ok) {
      throw new Error(searchResponse.statusText);
    }
    const results = await searchResponse.json();
    return results;
  };

  const { isLoading, data: recomendations } = useQuery({
    queryKey: ["getRecomendations"],
    queryFn: getRecomendations,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-100 flex flex-col justify-between p-4 w-1/3 overflow-y-auto">
      <div className="p-2 flex flex-col">
        {messages.length > 0 ? (
          messages.map((item: any) => {
            if (item.role === "user") {
              return (
                <div key={item.id} className="flex flex-col">
                  <div className="bg-white shadow-md p-4 rounded-tr-2xl rounded-l-2xl self-end max-w-[240px] w-auto mt-4 text-end">
                    {item.content}
                  </div>
                </div>
              );
            }
            if (item.role === "assistant") {
              return (
                <div key={item.id} className="flex flex-col pr-16">
                  {!isLoading ? (
                    <AnswerComponent
                      images={recomendations}
                      answer={item.content}
                    />
                  ) : (
                    <div className="animate-pulse mt-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                    </div>
                  )}
                </div>
              );
            }
          })
        ) : (
          <div className="p-4">
            {!isLoading ? (
              <AnswerComponent
                images={recomendations}
                answer="Hi there! I am your Adidas assistant, how can I help you?"
              />
            ) : (
              <div className="animate-pulse mt-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="relative" ref={chatContainerRef}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            className="pl-4 pr-10 py-4 rounded-2xl h-12 mt-4 shadow-md"
            value={input}
            placeholder="I would like to know about Ultraboost"
            onChange={() => {
              setIsProductHome(false);
              return handleInputChange;
            }}
            onKeyDown={() => handleSubmit}
          />
          <Button
            onClick={() => handleSubmit}
            className="text-xs lg:text-sm absolute bottom-1 right-0 bg-transparent hover:bg-transparent">
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
  );
};

export default Chat;
